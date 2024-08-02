import { Swipeable } from 'react-native-gesture-handler';
import { MatchInfo } from "@/types/match"
import { View, Text, Image } from "react-native"
import { cardStyles } from "./CardMatchStyles"
import PlayerIcon from '@/assets/icons/profile.png';
import DateIcon from '@/assets/icons/TimeCircle.png';
import { formatDate } from "@/util/DateUtil";
import { Colors } from '@/constants/Colors';
import { useRef, useState } from 'react';
import PopupExclusion from '../PopupExclusion';

interface CardMatchProps {
  item: Partial<MatchInfo>
}

const CardMatch: React.FC<CardMatchProps> = ({ item }) => {

  const [idToExclude, setIdToExclude] = useState<null | number>(null)
  const [popUpExclusionOpen, setPopupExclusionOpen] = useState(false)
  const swipeableRef = useRef<Swipeable>(null);

  const handleOpenExclusionPopup = (idMatch: number) => {
    setIdToExclude(idMatch)
    setPopupExclusionOpen(true)
  }

  const handleCancel = () => {
    setPopupExclusionOpen(false)
    !swipeableRef.current?.close()
  }

  const renderRightActions = () => {

    return (
      <View style={{ justifyContent: 'center', alignItems: 'flex-end', borderRadius: 15, flex: 1, backgroundColor: Colors.light.lightText, padding: 0 }} >
        <Text>
          Excluír
        </Text>
      </View>
    );
  };

  return (
    <Swipeable
      ref={swipeableRef}
      rightThreshold={40}
      onSwipeableOpen={() => item.id && handleOpenExclusionPopup(item.id)}
      renderRightActions={renderRightActions}>
      <>
        <View style={cardStyles.container}>
          <Text style={cardStyles.title}>{item.name}</Text>
          <View style={cardStyles.vInfoWithPlayers}>
            <View style={cardStyles.vDate}>
              <Image source={DateIcon} />
              <Text style={cardStyles.defalutText}>{item.created_at && formatDate(new Date(item?.created_at), 'dd/MM/yyyy')}</Text>
            </View>
            {item.players?.map((player, index) => (
              <View key={player.id} style={cardStyles.vPlayers}>
                <Image source={PlayerIcon} style={cardStyles.iconPlayer} />
                <Text style={cardStyles.defalutText} >{player.name}</Text>
              </View>
            ))}
          </View>
        </View >
        <PopupExclusion
          onCancel={handleCancel}
          onConfirmDelete={() => console.log(idToExclude)}
          visible={popUpExclusionOpen}
        />
      </>

    </Swipeable >
  )
}

export default CardMatch