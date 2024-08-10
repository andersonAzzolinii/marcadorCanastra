import React from "react";
import { TouchableOpacity, TouchableOpacityProps, Text, View, TextStyle } from "react-native";
import { defaultButtonStyles } from "./DefaultButtonStyles";

interface CustomTouchableOpacityProps extends TouchableOpacityProps {
  text: string;
  textStyle?: TextStyle
}

const DefaultButton: React.FC<CustomTouchableOpacityProps> = ({ style, text, children, textStyle, ...rest }) => {
  return (
    <View>
      <TouchableOpacity
        style={[defaultButtonStyles.button, style]}
        {...rest}
      >
        {children ?
          <View style={defaultButtonStyles.vWithChildren}>
            <Text style={[defaultButtonStyles.text, textStyle]}>{text}</Text>
            {children}
          </View>
          :
          <Text style={[defaultButtonStyles.text, textStyle]}>{text}</Text>
        }
      </TouchableOpacity>
    </View>
  );
};

export default DefaultButton;
