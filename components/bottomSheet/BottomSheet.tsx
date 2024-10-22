
import React, { useEffect, useRef, useState } from "react";
import { Animated, FlatList, Modal, Pressable, Text, TouchableOpacity, Easing, ListRenderItem } from "react-native";
import { View } from "react-native";
import { style } from "./bottomSheetStyles";
import LottieView from "lottie-react-native";

interface BottomSheetProps {
  showList: boolean;
  setShowList: React.Dispatch<React.SetStateAction<boolean>>;
  data: ItemList[];
}

interface ItemList {
  icon: string;
  onClick: () => void;
  optionName: string;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ showList, setShowList, data }) => {
  const translateY = useRef(new Animated.Value(300)).current;
  const backgroundOpacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    if (showList) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(backgroundOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showList]);

  const close = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 300,
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(backgroundOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setShowList(false));
  }

  const renderList: ListRenderItem<ItemList> = ({ item }) => (
    <TouchableOpacity onPress={item.onClick}>
      <View style={style.containerItem}>
        <View>
          <LottieView
            style={style.icon}
            autoPlay
            source={JSON.parse(item.icon)}
          />
        </View>
        <Text style={style.textOption}>{item.optionName}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal transparent visible={showList} animationType="none" onRequestClose={close}>
      <Pressable style={style.overlay} onPress={close} />

      <Animated.View style={[style.contentContainer, { transform: [{ translateY }] }]}>
        <FlatList data={data} keyExtractor={(_, index) => String(index)} renderItem={renderList} />
      </Animated.View>
    </Modal>
  );
};

export default BottomSheet;
