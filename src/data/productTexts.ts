import { Product } from '../types/product';

const texts: Record<string, { name: string; description: string }> = {
  'mens-shirts': {
    name: 'Camisa masculina',
    description: 'Camisa confortável para usar em diferentes ocasiões.',
  },
  'mens-shoes': {
    name: 'Calçado masculino',
    description: 'Calçado masculino confortável para o dia a dia.',
  },
  'mens-watches': {
    name: 'Relógio masculino',
    description: 'Relógio masculino com visual moderno e elegante.',
  },
  'womens-bags': {
    name: 'Bolsa feminina',
    description: 'Bolsa feminina prática para guardar itens pessoais.',
  },
  'womens-dresses': {
    name: 'Vestido feminino',
    description: 'Vestido feminino leve para diferentes ocasiões.',
  },
  'womens-jewellery': {
    name: 'Joia feminina',
    description: 'Acessório feminino delicado para completar o visual.',
  },
  'womens-shoes': {
    name: 'Calçado feminino',
    description: 'Calçado feminino confortável e fácil de combinar.',
  },
  'womens-watches': {
    name: 'Relógio feminino',
    description: 'Relógio feminino com visual simples e elegante.',
  },
};

export function getProductName(product: Product) {
  const text = texts[product.category];
  return text ? `${text.name} - modelo ${product.id}` : `Produto ${product.id}`;
}

export function getProductDescription(product: Product) {
  return texts[product.category]?.description || 'Produto disponível em nosso catálogo.';
}
