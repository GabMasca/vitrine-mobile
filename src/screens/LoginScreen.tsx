import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { login } from '../store/slices/authSlice';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  function handleLogin() {
    if (!email.trim() || !password.trim()) {
      setError('Preencha o e-mail e a senha para entrar.');
      return;
    }
    dispatch(login({ email: email.trim() }));
    setPassword('');
    router.replace('/products');
  }

  if (isLoggedIn) return <Redirect href="/products" />;
  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.safe} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.blueBackground} />
          <Text style={styles.title}>Bem-vindo de volta!</Text>
          <Text style={styles.subtitle}>Insira seus dados para entrar na sua conta.</Text>
          <View style={styles.form}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput style={[styles.input, error && !email.trim() ? styles.invalidInput : null]} placeholder="voce@exemplo.com" accessibilityLabel="E-mail" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} value={email} onChangeText={setEmail} />
            <Text style={styles.label}>Senha</Text>
            <TextInput style={[styles.input, error && !password.trim() ? styles.invalidInput : null]} placeholder="Digite sua senha" accessibilityLabel="Senha" secureTextEntry value={password} onChangeText={setPassword} onSubmitEditing={handleLogin} />
            {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
            <Pressable accessibilityRole="button" style={styles.button} onPress={handleLogin}><Text style={styles.buttonText}>Entrar</Text></Pressable>
          </View>
          <Text style={styles.note}>Login demonstrativo: use qualquer e-mail e senha preenchidos.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { flexGrow: 1, paddingHorizontal: 30, paddingTop: 200, maxWidth: 500, width: '100%', alignSelf: 'center' },
  blueBackground: { position: 'absolute', top: 0, left: 0, right: 0, height: 350, backgroundColor: '#2864E8' },
  title: { fontSize: 28, fontWeight: '700', color: '#FFFFFF', textAlign: 'center', marginBottom: 12 },
  subtitle: { fontSize: 13, color: '#FFFFFF', textAlign: 'center', marginBottom: 30 },
  form: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 24, borderWidth: 1, borderColor: '#D8D8D8' },
  label: { fontSize: 14, color: '#111111', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#DDDDDD', borderRadius: 2, padding: 12, fontSize: 16, marginBottom: 18, color: '#111111' },
  invalidInput: { borderColor: '#BA2424' },
  button: { backgroundColor: '#2864E8', padding: 14, borderRadius: 3, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#FFFFFF', fontSize: 16 },
  error: { color: '#BA2424', marginBottom: 10, fontSize: 13 },
  note: { fontSize: 12, color: '#777777', textAlign: 'center', marginTop: 24, lineHeight: 20, marginBottom: 30 },
});
