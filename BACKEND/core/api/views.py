from decimal import Decimal

from django.db.models import Sum, Avg, F, Count
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response

from core.api.serializers import ProductoSerializer, ProductoStatsSerializer
from core.models import Producto

STOCK_BAJO_UMBRAL = 5


class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Estadisticas agregadas de inventario para el dashboard."""
        queryset = self.get_queryset()

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
