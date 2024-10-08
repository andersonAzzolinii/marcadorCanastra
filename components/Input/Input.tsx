import React, { forwardRef } from "react";
import { Text, View, TextInput, TextInputProps } from "react-native";
import { inputStyles } from "./inputStyle";
import { Colors } from "@/constants/Colors";

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: any;
}

const DefaultTextInput = forwardRef<TextInput, CustomTextInputProps>(
  ({ style, error, label, ...rest }, ref) => {
    return (
      <>
        {label && <Text style={inputStyles.label}>{label}</Text>}
        <TextInput
          ref={ref}
          style={error ? [inputStyles.input, inputStyles.inputError, style] : [inputStyles.input, style]}
          placeholderTextColor={Colors.light.lightText}
          {...rest}
        />
      </>
    );
  }
);

export default DefaultTextInput;
