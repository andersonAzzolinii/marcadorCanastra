import React from "react"
import { FlatList, Image, ListRenderItem, Modal, Pressable, Text, TouchableOpacity } from "react-native"
import { View } from "react-native"
import { style } from "./bottomSheetStyles"
import LottieView from "lottie-react-native"

interface BottomSheetProps {
  showList: boolean,
  setShowList: React.Dispatch<React.SetStateAction<boolean>>
  data: ItemList[]
}

interface ItemList {
  icon: string; // JSON para o LottieView
  onClick: () => void; // Função de clique
  optionName: string; // Nome da opção
}
const BottomSheet: React.FC<BottomSheetProps> = ({ showList, setShowList, data }) => {

  const renderList: ListRenderItem<ItemList> = ({ item },) => (
    <TouchableOpacity onPress={item.onClick} >
      <View style={style.containerItem} >
        <View >
          <LottieView
            style={style.icon}
            autoPlay
            source={JSON.parse(item.icon)}
          />
        </View>
        <Text style={style.textOption}>{item.optionName}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <Modal
      transparent
      animationType="slide"
      visible={showList}
      onRequestClose={() => setShowList(false)}
    >
      <Pressable onPress={() => setShowList(false)} style={style.container}>
        <View style={style.contentContainer}>
          <FlatList
            data={data}
            keyExtractor={(_, index) => String(index)}
            renderItem={renderList}
          />
        </View>
      </Pressable>
    </Modal>
  )
}

export default BottomSheet