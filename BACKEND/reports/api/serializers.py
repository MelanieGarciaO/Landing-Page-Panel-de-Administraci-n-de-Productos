from rest_framework import serializers
from core.api.serializers import ProductoSerializer


class ProductoStatsSerializer(serializers.Serializer):
    """Estadisticas agregadas para el dashboard de inventario."""
    total_productos = serializers.IntegerField()
    valor_inventario = serializers.DecimalField(max_digits=14, decimal_places=2)
    stock_total = serializers.IntegerField()
    stock_bajo = serializers.IntegerField()
    precio_promedio = serializers.DecimalField(max_digits=10, decimal_places=2)
    stock_por_categoria = serializers.ListField()
    productos_recientes = ProductoSerializer(many=True)
