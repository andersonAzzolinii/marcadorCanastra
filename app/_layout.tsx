import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="formMatch/index" />
      <Stack.Screen name="index" />
    </Stack>
  );
}
