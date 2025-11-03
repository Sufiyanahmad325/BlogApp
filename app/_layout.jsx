import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Provider } from 'react-redux';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { store } from '../ReduxToolkit/store';
import { CookiesProvider } from 'react-cookie';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <CookiesProvider >
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="screen/myblogsScreen" options={{ headerShown: false }} />
          <Stack.Screen name="screen/blogDetailsScreen" options={{ headerShown: false }} />
          <Stack.Screen name="screen/loginForm" options={{ headerShown: false }} />
          <Stack.Screen name="screen/editProfile" options={{ headerShown: false }} />
          <Stack.Screen name="screen/editBlog" options={{ headerShown: false }} />
          <Stack.Screen name="screen/signUp" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
    </CookiesProvider>
  );
}
