"""
config_product.py

Define las variantes del producto y qué características (feature flags)
tiene activadas cada una. settings.py lee este archivo y arma la
configuración final según la variante seleccionada (PRODUCT_VARIANT).

Variante A: sistema básico, sin funcionalidades extra.
Variante B: sistema completo, con reportes y notificaciones.
"""

PRODUCT_A = {
    'ENABLE_REPORTS': False,
    'ENABLE_NOTIFICATIONS': False,
}

PRODUCT_B = {
    'ENABLE_REPORTS': True,
    'ENABLE_NOTIFICATIONS': True,
}

PRODUCT_VARIANTS = {
    'A': PRODUCT_A,
    'B': PRODUCT_B,
}