import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="listMatches" >
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
