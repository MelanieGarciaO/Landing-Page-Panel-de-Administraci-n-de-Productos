from django.contrib import admin
from core.models import Producto


class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'categoria', 'precio', 'stock', 'created_at', 'updated_at')
    list_filter = ('categoria', 'created_at', 'updated_at')
    search_fields = ('nombre', 'descripcion')
    ordering = ('nombre',)


admin.site.register(Producto, ProductoAdmin)
