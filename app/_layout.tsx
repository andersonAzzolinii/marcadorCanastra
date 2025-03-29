import { NotificationProvider } from "@/contexts/Notification";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <NotificationProvider>
      <Stack screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="index" options={{ headerShown: true }} />
        <Stack.Screen name="formMatch/index" />
      </Stack>
    </NotificationProvider>
  );
}
