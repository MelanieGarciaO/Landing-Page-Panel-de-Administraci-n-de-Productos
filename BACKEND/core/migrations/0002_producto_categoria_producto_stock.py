from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='categoria',
            field=models.CharField(
                choices=[
                    ('cafe', 'Café'),
                    ('postres', 'Postres'),
                    ('bebidas_frias', 'Bebidas Frías'),
                    ('panaderia', 'Panadería'),
                    ('otros', 'Otros'),
                ],
                default='otros',
                max_length=20,
                verbose_name='Categoría',
            ),
        ),
        migrations.AddField(
            model_name='producto',
            name='stock',
            field=models.PositiveIntegerField(default=0, verbose_name='Stock disponible'),
        ),
    ]
