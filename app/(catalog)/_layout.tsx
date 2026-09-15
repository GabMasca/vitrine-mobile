import { Redirect, Stack } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../src/store';

export default function CatalogLayout() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  if (!isLoggedIn) return <Redirect href="/" />;
  return <Stack screenOptions={{ headerShown: false }} />;
}
