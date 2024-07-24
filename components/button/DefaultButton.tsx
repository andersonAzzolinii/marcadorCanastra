import React from "react";
import { TouchableOpacity, TouchableOpacityProps, Text, View } from "react-native";
import { defaultButtonStyles } from "./DefaultButtonStyles";

interface CustomTouchableOpacityProps extends TouchableOpacityProps {
  text: string;
}

const DefaultButton: React.FC<CustomTouchableOpacityProps> = ({ style, text, ...rest }) => {
  return (
    <View>
      <TouchableOpacity
        style={[defaultButtonStyles.button, style]}
        {...rest}
      >
        <Text style={defaultButtonStyles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DefaultButton;
