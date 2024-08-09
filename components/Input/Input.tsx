import { Text, View, TextInput, TextInputProps } from "react-native"
import { inputStyles } from "./inputStyle"
import { Colors } from "@/constants/Colors";

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: any
}

const DefaultTextInput: React.FC<CustomTextInputProps> = ({ style, error, label, ...rest }) => {

  return (
    <>
      {label && < Text style={inputStyles.label} >{label}</Text >}
      <TextInput
        style={error ? [inputStyles.input, inputStyles.inputError] : [inputStyles.input, style]}
        placeholderTextColor={Colors.light.lightText}
        {...rest} />
    </>
  )

}

export default DefaultTextInput