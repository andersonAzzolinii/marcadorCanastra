import { Swipeable } from 'react-native-gesture-handler';
import { MatchInfo } from "@/types/match"
import { View, Text, Image } from "react-native"
import { cardStyles } from "./CardMatchStyles"
import PlayerIcon from '@/assets/icons/profile.png';
import DateIcon from '@/assets/icons/TimeCircle.png';
import { formatDate } from "@/util/DateUtil";
import { Colors } from '@/constants/Colors';

interface CardMatchProps {
  item: Partial<MatchInfo>

} const renderRightActions = () => {

  return (
    <View style={{ justifyContent: 'center', alignItems: 'flex-end', borderRadius: 15, flex: 1, backgroundColor: Colors.light.lightText, padding: 0 }} >
      <Text>
        Excluír
      </Text>
    </View>
  );
};

const CardMatch: React.FC<CardMatchProps> = ({ item }) => {
  return (
    <Swipeable
    rightThreshold={40}
    renderRightActions={renderRightActions}>
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
    </Swipeable >
  )
}

export default CardMatch