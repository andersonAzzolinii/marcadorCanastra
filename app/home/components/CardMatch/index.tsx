import { Swipeable } from 'react-native-gesture-handler';
import { MatchInfo } from "@/types/match"
import { View, Text, Image } from "react-native"
import { cardStyles } from "./CardMatchStyles"
import PlayerIcon from '@/assets/icons/profile.png';
import DateIcon from '@/assets/icons/TimeCircle.png';
import { formatDate } from "@/util/DateUtil";
import { Colors } from '@/constants/Colors';
import { useRef, useState, Dispatch } from 'react';
import PopupExclusion from '../PopupExclusion';
import { MatchService } from '@/services/match';
import { Link } from 'expo-router';

interface CardMatchProps {
  item: Partial<MatchInfo>;
  setListMatches: Dispatch<React.SetStateAction<Partial<MatchInfo>[]>>;

}

const CardMatch: React.FC<CardMatchProps> = ({ item, setListMatches }) => {
  const [popUpExclusionOpen, setPopupExclusionOpen] = useState(false)
  const swipeableRef = useRef<Swipeable>(null);
  const serviceMatch = new MatchService()

  const handleCancel = () => {
    setPopupExclusionOpen(false)
    !swipeableRef.current?.close()
  }

  const deleteMatch = async () => {
    const idPlayers: number[] = item.players?.map(player => player.id) || [];
    const excluded = item.id && await serviceMatch.delete(item.id, idPlayers)
    if (excluded) {
      setListMatches((prev) => prev.filter(e => e.id !== item.id))
    }
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
      onSwipeableOpen={() => setPopupExclusionOpen(true)}
      renderRightActions={renderRightActions}>
      <Link
        style={cardStyles.container}
        href={{
          pathname: '/match/[id]',
          params: { id: item.id }
        }}
      >
        <>
          <View >
            <Text style={cardStyles.title}>{item.name}</Text>
            <View style={cardStyles.vInfoWithPlayers}>
              <View style={cardStyles.vDate}>
                <Image source={DateIcon} />
                <Text style={cardStyles.defalutText}>{item.created_at && formatDate(new Date(item?.created_at), 'dd/MM/yyyy')}</Text>
              </View>
              {item.players?.map(player => (
                <View key={player.id} style={cardStyles.vPlayers}>
                  <Image source={PlayerIcon} style={cardStyles.iconPlayer} />
                  <Text style={cardStyles.defalutText} >{player.name}</Text>
                </View>
              ))}
            </View>
          </View >
          <PopupExclusion
            onCancel={handleCancel}
            onConfirmDelete={deleteMatch}
            visible={popUpExclusionOpen}
          />
        </>
      </Link>
    </Swipeable >
  )
}

export default CardMatch