import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import { api } from '../services/api';
import { Product, ProductsResponse } from '../types/product';
import ProductCard from '../components/ProductCard';

const categories = {
  Masculino: ['mens-shirts', 'mens-shoes', 'mens-watches'],
  Feminino: ['womens-bags', 'womens-dresses', 'womens-jewellery', 'womens-shoes', 'womens-watches'],
};

export default function ProductsScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const [tab, setTab] = useState<'Masculino' | 'Feminino'>('Masculino');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;
    async function loadProducts() {
      setLoading(true);
      setError('');
      setProducts([]);
      try {
        const responses = await Promise.all(categories[tab].map((category) =>
          api.get<ProductsResponse>(`/products/category/${category}?limit=0`)
        ));
        if (active) setProducts(responses.flatMap((response) => response.data.products));
      } catch {
        if (active) setError('Não foi possível carregar os produtos. Confira sua conexão.');
      } finally {
        if (active) setLoading(false);
      }
    }
    loadProducts();
    return () => { active = false; };
  }, [tab, retry]);

  function handleLogout() {
    dispatch(logout());
    router.replace('/');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <Text style={styles.brand}>VITRINE MOBILE</Text>
          <Pressable accessibilityRole="button" onPress={handleLogout} style={styles.logout}><Text style={styles.logoutText}>Sair</Text></Pressable>
        </View>
        <Text style={styles.user}>Olá, {user?.email}</Text>
        <Text style={styles.title}>Explore o catálogo</Text>
        <Text style={styles.subtitle}>Encontre algo que combina com você.</Text>
      </View>
      <View accessibilityRole="tablist" style={styles.tabs}>
        {(['Masculino', 'Feminino'] as const).map((name) => (
          <Pressable key={name} accessibilityRole="tab" accessibilityState={{ selected: tab === name }} style={[styles.tab, tab === name && styles.selectedTab]} onPress={() => setTab(name)}>
            <Text style={[styles.tabText, tab === name && styles.selectedText]}>{name}</Text>
          </Pressable>
        ))}
      </View>
      {loading ? <View style={styles.state}><ActivityIndicator size="large" color="#315B46" /><Text style={styles.message}>Carregando produtos...</Text></View> : error ?
        <View style={styles.state}><Text accessibilityRole="alert" style={styles.message}>{error}</Text><Pressable accessibilityRole="button" style={styles.retry} onPress={() => setRetry(retry + 1)}><Text style={styles.retryText}>Tentar novamente</Text></Pressable></View> :
        <FlatList numColumns={2} data={products} keyExtractor={(item) => String(item.id)} contentContainerStyle={styles.list} renderItem={({ item }) => <ProductCard product={item} onPress={() => router.push({ pathname: '/product/[id]', params: { id: item.id } })} />} ListEmptyComponent={<Text style={styles.message}>Nenhum produto encontrado nesta categoria.</Text>} />}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { padding: 24, paddingBottom: 18 },
  brand: { fontSize: 12, letterSpacing: 2, fontWeight: '700', color: '#2864E8', marginBottom: 18 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logout: { paddingHorizontal: 14, paddingVertical: 10, marginBottom: 8 },
  logoutText: { color: '#2864E8', fontWeight: '700' },
  user: { color: '#657068', marginBottom: 12 },
  title: { fontSize: 28, fontWeight: '700', color: '#202C25' },
  subtitle: { color: '#657068', marginTop: 8, fontSize: 14 },
  tabs: { flexDirection: 'row', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#EEEEEE' },
  tab: { flex: 1, padding: 13, alignItems: 'center', borderRadius: 9 },
  selectedTab: { borderBottomWidth: 2, borderBottomColor: '#2864E8' },
  tabText: { color: '#526157', fontWeight: '600' },
  selectedText: { color: '#2864E8' },
  list: { padding: 10, paddingTop: 8, maxWidth: 700, width: '100%', alignSelf: 'center', flexGrow: 1 },
  state: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  message: { color: '#657068', textAlign: 'center', marginTop: 16, lineHeight: 22 },
  retry: { backgroundColor: '#2864E8', borderRadius: 10, padding: 14, marginTop: 18 },
  retryText: { color: '#FFFFFF', fontWeight: '600' },
});
