import os
import django
from django.core.management.base import BaseCommand
from decimal import Decimal

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

# Importar modelo
from core.models import Producto


class Command(BaseCommand):
    help = 'Poblar la base de datos con productos de ejemplo de una cafeteria.'

    def handle(self, *args, **options):
        self.stdout.write('Creando datos de ejemplo para Productos...')

        productos_data = [
            {
                'nombre': 'Espresso',
                'descripcion': 'Shot intenso de café 100% arábica, tostado en casa.',
                'precio': Decimal('1.80'),
                'categoria': Producto.Categoria.CAFE,
                'stock': 50,
            },
            {
                'nombre': 'Cappuccino',
                'descripcion': 'Espresso con leche vaporizada y espuma cremosa.',
                'precio': Decimal('2.80'),
                'categoria': Producto.Categoria.CAFE,
                'stock': 40,
            },
            {
                'nombre': 'Latte Vainilla',
                'descripcion': 'Café con leche y un toque de jarabe de vainilla.',
                'precio': Decimal('3.20'),
                'categoria': Producto.Categoria.CAFE,
                'stock': 35,
            },
            {
                'nombre': 'Café Americano',
                'descripcion': 'Espresso diluido en agua caliente, sabor suave.',
                'precio': Decimal('2.00'),
                'categoria': Producto.Categoria.CAFE,
                'stock': 4,
            },
            {
                'nombre': 'Frappé de Caramelo',
                'descripcion': 'Café helado batido con caramelo y crema chantillí.',
                'precio': Decimal('3.80'),
                'categoria': Producto.Categoria.BEBIDAS_FRIAS,
                'stock': 25,
            },
            {
                'nombre': 'Té Helado de Durazno',
                'descripcion': 'Té negro infusionado en frío con durazno natural.',
                'precio': Decimal('2.90'),
                'categoria': Producto.Categoria.BEBIDAS_FRIAS,
                'stock': 3,
            },
            {
                'nombre': 'Limonada de Coco',
                'descripcion': 'Limonada refrescante con un toque cremoso de coco.',
                'precio': Decimal('3.00'),
                'categoria': Producto.Categoria.BEBIDAS_FRIAS,
                'stock': 18,
            },
            {
                'nombre': 'Cheesecake de Fresa',
                'descripcion': 'Cheesecake artesanal con cobertura de fresas frescas.',
                'precio': Decimal('4.50'),
                'categoria': Producto.Categoria.POSTRES,
                'stock': 12,
            },
            {
                'nombre': 'Brownie con Nueces',
                'descripcion': 'Brownie de chocolate intenso con nueces tostadas.',
                'precio': Decimal('2.75'),
                'categoria': Producto.Categoria.POSTRES,
                'stock': 20,
            },
            {
                'nombre': 'Tiramisú Clásico',
                'descripcion': 'Postre italiano con café, mascarpone y cacao.',
                'precio': Decimal('4.20'),
                'categoria': Producto.Categoria.POSTRES,
                'stock': 2,
            },
            {
                'nombre': 'Croissant de Mantequilla',
                'descripcion': 'Croissant horneado diariamente, hojaldrado y dorado.',
                'precio': Decimal('2.20'),
                'categoria': Producto.Categoria.PANADERIA,
                'stock': 30,
            },
            {
                'nombre': 'Pan de Chocolate',
                'descripcion': 'Pan hojaldrado relleno de chocolate belga.',
                'precio': Decimal('2.50'),
                'categoria': Producto.Categoria.PANADERIA,
                'stock': 22,
            },
            {
                'nombre': 'Muffin de Arándanos',
                'descripcion': 'Muffin esponjoso con arándanos frescos.',
                'precio': Decimal('2.60'),
                'categoria': Producto.Categoria.PANADERIA,
                'stock': 5,
            },
            {
                'nombre': 'Taza Souvenir',
                'descripcion': 'Taza de cerámica con el logo de la cafetería.',
                'precio': Decimal('8.00'),
                'categoria': Producto.Categoria.OTROS,
                'stock': 15,
            },
        ]

        for prod_data in productos_data:
            producto, created = Producto.objects.get_or_create(
                nombre=prod_data['nombre'],
                defaults={
                    'descripcion': prod_data['descripcion'],
                    'precio': prod_data['precio'],
                    'categoria': prod_data['categoria'],
                    'stock': prod_data['stock'],
                }
            )
            if not created:
                self.stdout.write(f'Producto ya existe: {prod_data["nombre"]}. Saltando.')
            else:
                self.stdout.write(f'Producto creado: {prod_data["nombre"]}')

        # Resumen de datos creados
        self.stdout.write(self.style.SUCCESS('\n' + '=' * 50))
        self.stdout.write(self.style.SUCCESS('RESUMEN DE DATOS CREADOS:'))
        self.stdout.write(self.style.SUCCESS('=' * 50))
        self.stdout.write(f'Productos: {Producto.objects.count()}')
        self.stdout.write(self.style.SUCCESS('=' * 50))
        self.stdout.write(self.style.SUCCESS('Datos de Producto creados exitosamente!'))


# Si ejecutas el script directamente (no como comando de Django)
if __name__ == '__main__':
    command = Command()
    command.handle()
