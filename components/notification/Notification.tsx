import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import { Animated, Easing, Pressable, Text, View } from "react-native";
import Error from '@/lotties/error.json'
import Success from '@/lotties/sucess.json'
import { styles } from "./NotificationStyles";

type NotificationProps = {
  message: string;
  type: "success" | "error" | "warning";
  duration?: number;
};

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  duration = 2000,
}) => {
  const translateY = new Animated.Value(-100);

  const hiddeNotification = () => {
    Animated.timing(translateY, {
      toValue: -150,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start()

  }

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 55,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start((e) => e.finished && setTimeout(hiddeNotification, duration));


  }, [translateY, duration]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <LottieView
          autoPlay
          loop={false}
          style={styles.lottie}
          source={Success}
          duration={duration / 2}
        />
      case "error":
        return <LottieView
          autoPlay
          loop={false}
          style={styles.lottie}
          source={Error}
          duration={duration / 2}
        />
      default:
        return "gray";
    }
  };

  return (
    <Pressable onPress={hiddeNotification} style={styles.container}>
      <Animated.View
        style={[
          styles.animatedNotification,
          type === 'error' ? styles.errorBorder : styles.sucessBorder,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        {getIcon()}
        <View style={{ flex: 1 }}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};



export default Notification;
