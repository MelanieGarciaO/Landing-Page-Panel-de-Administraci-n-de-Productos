from rest_framework import serializers
from core.models import Producto


class ProductoSerializer(serializers.ModelSerializer):
    imagen = serializers.ImageField(write_only=True, required=False, allow_null=True)
    image_url = serializers.SerializerMethodField()  # Campo para la URL de la imagen
    categoria_display = serializers.CharField(source='get_categoria_display', read_only=True)

    class Meta:
        model = Producto
        fields = [
            'id', 'nombre', 'descripcion', 'precio', 'categoria', 'categoria_display',
            'stock', 'imagen', 'image_url', 'created_at', 'updated_at',
        ]
        read_only_fields = ('created_at', 'updated_at')
        extra_kwargs = {
            'imagen': {'write_only': True}
        }

    def get_image_url(self, obj):
        return obj.get_image_url()  # Llama al método del modelo
