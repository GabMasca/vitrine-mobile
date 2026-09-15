import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Product } from '../types/product';
import { getProductDescription, getProductName } from '../data/productTexts';

type Props = { product: Product; onPress: () => void };
export default function ProductCard({ product, onPress }: Props) {
  const name = getProductName(product);

  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`Ver detalhes de ${name}`} onPress={onPress} style={styles.card}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} resizeMode="contain" accessibilityLabel={name} />
      <View style={styles.info}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description} numberOfLines={3}>{getProductDescription(product)}</Text>
        <Text style={styles.price}>R$ {product.price.toFixed(2).replace('.', ',')}</Text>
        {product.discountPercentage > 0 ? <Text style={styles.discount}>{product.discountPercentage.toFixed(1)}% de desconto</Text> : null}
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 5, margin: 5, borderWidth: 1, borderColor: '#D8D8D8', overflow: 'hidden' },
  image: { width: '100%', height: 140, backgroundColor: '#F8F8F8' },
  info: { padding: 9 },
  title: { fontSize: 14, color: '#111111', fontWeight: '600', marginBottom: 6 },
  description: { fontSize: 11, lineHeight: 15, color: '#777777', marginBottom: 10 },
  price: { fontSize: 15, color: '#111111', fontWeight: '700' },
  discount: { color: '#BA2424', fontSize: 12, marginTop: 6 },
});
