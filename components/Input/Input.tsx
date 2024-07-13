import { Text, View, TextInput, TextInputProps } from "react-native"
import { inputStyles } from "./inputStyle"
import { Colors } from "@/constants/Colors";

interface CustomTextInputProps extends TextInputProps {
  label?: string;
}

const DefaultTextInput: React.FC<CustomTextInputProps> = ({ label, ...rest }) => {

  return (
    <View >
      {label && < Text style={inputStyles.label} >{label}</Text >}
      <TextInput
        style={inputStyles.input}
        placeholderTextColor={Colors.light.lightText}
        {...rest} />
    </View >
  )

}

export default DefaultTextInput