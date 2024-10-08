import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useColorScheme } from "@/hooks/useColorScheme";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import { View } from "react-native";
import useStore from "@/store/store";
import { Colors } from "@/constants/Colors";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    StraitRegular: require("../assets/fonts/Strait-Regular.ttf"),
    PlayWrite: require("../assets/fonts/Playwrite.ttf"),
    comfortaa: require("../assets/fonts/Comfortaa.ttf"),
  });
  const loadSheets = useStore((state) => state.loadSheets);
  const loadFavorites = useStore((state) => state.loadFavorites);

  useEffect(() => {
    loadSheets();
  }, []);
  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="newSheet"
            options={{
              headerTitle: "New sheet",
              headerBackTitle: "Back",
              headerTintColor: "white",
              headerStyle: { backgroundColor: "#2A9D8F" },
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>

        {/* <BannerAd
          unitId={TestIds.BANNER}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        /> */}
      </View>
    </ThemeProvider>
  );
}
