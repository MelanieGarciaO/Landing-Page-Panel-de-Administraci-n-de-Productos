from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from core.api.serializers import ProductoSerializer
from core.models import Producto


class ProductoViewSet(viewsets.ModelViewSet):
    """CRUD de productos. Las estadísticas y exportaciones viven en la
    app 'reports' (ver reports/api/views.py), controlada por la bandera
    settings.ENABLE_REPORTS."""
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]