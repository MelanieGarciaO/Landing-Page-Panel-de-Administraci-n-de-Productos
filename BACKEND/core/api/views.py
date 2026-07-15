from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from core.api.serializers import ProductoSerializer
from core.models import Producto


class ProductoViewSet(viewsets.ModelViewSet):
    """CRUD de productos. Las estadísticas y exportaciones viven en la
    app 'reports', y las alertas de stock en 'notifications' — ambas
    controladas por config_product.py (ver config/settings.py)."""
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]