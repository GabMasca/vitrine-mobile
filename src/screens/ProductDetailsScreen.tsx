import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { api } from '../services/api';
import { Product } from '../types/product';
import { getProductDescription, getProductName } from '../data/productTexts';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;
    async function loadProduct() {
      setLoading(true);
      setError('');
      setProduct(null);
      try {
        if (!id || !/^\d+$/.test(id)) throw new Error('ID inválido');
        const response = await api.get<Product>(`/products/${id}`);
        if (active) setProduct(response.data);
      } catch {
        if (active) setError('Não foi possível encontrar ou carregar este produto.');
      } finally {
        if (active) setLoading(false);
      }
    }
    loadProduct();
    return () => { active = false; };
  }, [id, retry]);

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/products');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <Pressable accessibilityRole="button" onPress={goBack} style={styles.back}><Text style={styles.backText}>← Voltar ao catálogo</Text></Pressable>
      {loading ? <View style={styles.state}><ActivityIndicator size="large" color="#315B46" /><Text style={styles.message}>Carregando detalhes...</Text></View> : error ?
        <View style={styles.state}><Text accessibilityRole="alert" style={styles.message}>{error}</Text><Pressable accessibilityRole="button" onPress={() => setRetry(retry + 1)} style={styles.retry}><Text style={styles.retryText}>Tentar novamente</Text></Pressable></View> : product ?
        <ScrollView contentContainerStyle={styles.content}>
          <Image source={{ uri: product.images?.[0] || product.thumbnail }} style={styles.image} resizeMode="contain" accessibilityLabel={getProductName(product)} />
          
          <Text style={styles.title}>{getProductName(product)}</Text>
          <Text style={styles.price}>R$ {product.price.toFixed(2).replace('.', ',')}</Text>
          {product.discountPercentage > 0 ? <Text style={styles.discount}>{product.discountPercentage.toFixed(1)}% de desconto</Text> : <Text style={styles.message}>Sem desconto disponível.</Text>}
          
          <Text style={styles.description}>{getProductDescription(product)}</Text>
        </ScrollView> : <Text style={styles.message}>Produto não encontrado.</Text>}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  back: { padding: 20 },
  backText: { color: '#2864E8', fontSize: 15, fontWeight: '600' },
  content: { padding: 20, maxWidth: 700, width: '100%', alignSelf: 'center' },
  image: { width: '100%', height: 300, backgroundColor: '#F8F8F8', marginBottom: 20 },
  label: { color: '#657068', fontSize: 11, letterSpacing: 2, marginBottom: 12 },
  title: { fontSize: 27, fontWeight: '700', color: '#111111', marginBottom: 16 },
  price: { fontSize: 24, fontWeight: '700', color: '#BA2424' },
  discount: { color: '#2864E8', marginTop: 10, fontWeight: '600' },
  descriptionTitle: { fontSize: 18, fontWeight: '600', color: '#111111', marginTop: 30, marginBottom: 12 },
  description: { color: '#777777', fontSize: 15, lineHeight: 23, marginTop: 18 },
  state: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  message: { color: '#657068', textAlign: 'center', marginTop: 16 },
  retry: { padding: 14, backgroundColor: '#2864E8', borderRadius: 10, marginTop: 18 },
  retryText: { color: '#FFFFFF', fontWeight: '600' },
});
