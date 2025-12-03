import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Provider, useSelector } from 'react-redux';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { store } from '../ReduxToolkit/store';
import { CookiesProvider } from 'react-cookie';
import { ActivityIndicator, View } from 'react-native';

export const unstable_settings = {
  anchor: '(tabs)',
};


function GlobalLoaderWrapper({ children }) {
  const isLoading = useSelector(state => state.blogSlice.isLoading);

  return (
    <>
      {children}

      {isLoading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <CookiesProvider >
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <GlobalLoaderWrapper>
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
        </GlobalLoaderWrapper>
        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
    </CookiesProvider>
  );
}
