from django.db import models
from decimal import Decimal
from config.utils import get_image
from django.db.models import CheckConstraint, Q

class Producto(models.Model):
    class Categoria(models.TextChoices):
        CAFE = 'cafe', 'Café'
        POSTRES = 'postres', 'Postres'
        BEBIDAS_FRIAS = 'bebidas_frias', 'Bebidas Frías'
        PANADERIA = 'panaderia', 'Panadería'
        OTROS = 'otros', 'Otros'

    nombre = models.CharField(max_length=100, verbose_name='Nombre del Producto', unique=True)
    descripcion = models.TextField(verbose_name='Descripción del Producto')
    precio = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Precio del Producto', default=Decimal('0.00'))
    categoria = models.CharField(max_length=20, choices=Categoria.choices, default=Categoria.OTROS, verbose_name='Categoría')
    stock = models.PositiveIntegerField(default=0, verbose_name='Stock disponible')
    imagen = models.ImageField(verbose_name='Imagen del Producto', upload_to='productos', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Fecha de Actualización')
    
    def __str__(self):
        return f'Producto: {self.nombre}'
    
    def get_image_url(self):
        return get_image(self.imagen) 

    class Meta:
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'
        ordering = ['nombre']
        indexes = [
            models.Index(fields=['nombre'], name='idx_nombre_producto'),
            models.Index(fields=['precio'], name='idx_precio_producto'),
        ]
        constraints = [
            CheckConstraint(
                check=Q(precio__gte=0),
                name='check_precio_no_negativo'
            )
        ]
