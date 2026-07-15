from django.conf import settings
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from core.models import Producto

STOCK_BAJO_UMBRAL = 5


@api_view(['GET'])
def alerts(request):
    """Alertas de stock bajo. Funcionalidad opcional de la variante B."""
    if not settings.ENABLE_NOTIFICATIONS:
        return Response(
            {'detail': 'Las notificaciones están desactivadas.'},
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )

    productos_bajo_stock = Producto.objects.filter(stock__lte=STOCK_BAJO_UMBRAL)
    data = [
        {
            'id': p.id,
            'nombre': p.nombre,
            'stock': p.stock,
            'mensaje': f'Quedan solo {p.stock} unidades de "{p.nombre}".',
        }
        for p in productos_bajo_stock
    ]
    return Response({'count': len(data), 'alerts': data})
