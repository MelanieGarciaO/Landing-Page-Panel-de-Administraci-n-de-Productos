import csv
from decimal import Decimal

from django.conf import settings
from django.db.models import Sum, Avg, F, Count
from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from core.models import Producto
from reports.api.serializers import ProductoStatsSerializer

STOCK_BAJO_UMBRAL = 5


def _reports_disabled_response():
    """Respuesta estándar cuando la funcionalidad de reportes está apagada."""
    return Response(
        {'detail': 'La funcionalidad de reportes está desactivada.'},
        status=status.HTTP_503_SERVICE_UNAVAILABLE,
    )


@api_view(['GET'])
def stats(request):
    """Estadisticas agregadas de inventario para el dashboard."""
    # Bandera de configuración: activa/desactiva la app de reportes.
    if not settings.ENABLE_REPORTS:
        return _reports_disabled_response()

    queryset = Producto.objects.all()

    total_productos = queryset.count()
    valor_inventario = queryset.aggregate(
        total=Sum(F('precio') * F('stock'))
    )['total'] or Decimal('0.00')
    stock_total = queryset.aggregate(total=Sum('stock'))['total'] or 0
    stock_bajo = queryset.filter(stock__lte=STOCK_BAJO_UMBRAL).count()
    precio_promedio = queryset.aggregate(promedio=Avg('precio'))['promedio'] or Decimal('0.00')

    stock_por_categoria_qs = (
        queryset.values('categoria')
        .annotate(total_stock=Sum('stock'), total_productos=Count('id'))
        .order_by('-total_stock')
    )
    categoria_labels = dict(Producto.Categoria.choices)
    stock_por_categoria = [
        {
            'categoria': item['categoria'],
            'categoria_display': categoria_labels.get(item['categoria'], item['categoria']),
            'total_stock': item['total_stock'] or 0,
            'total_productos': item['total_productos'],
        }
        for item in stock_por_categoria_qs
    ]

    productos_recientes = queryset.order_by('-created_at')[:5]

    data = {
        'total_productos': total_productos,
        'valor_inventario': valor_inventario,
        'stock_total': stock_total,
        'stock_bajo': stock_bajo,
        'precio_promedio': precio_promedio,
        'stock_por_categoria': stock_por_categoria,
        'productos_recientes': productos_recientes,
    }
    serializer = ProductoStatsSerializer(data, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
def export_productos_csv(request):
    """Exporta el inventario de productos en formato CSV."""
    # Misma bandera: si los reportes están desactivados, no se permite exportar.
    if not settings.ENABLE_REPORTS:
        return _reports_disabled_response()

    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="reporte_productos.csv"'

    writer = csv.writer(response)
    writer.writerow(['Nombre', 'Categoría', 'Precio', 'Stock', 'Creado'])

    for producto in Producto.objects.all():
        writer.writerow([
            producto.nombre,
            producto.get_categoria_display(),
            producto.precio,
            producto.stock,
            producto.created_at.strftime('%Y-%m-%d %H:%M'),
        ])

    return response
