import { Swipeable } from 'react-native-gesture-handler';
import { MatchInfo } from "@/types/match"
import { View, Text, Image } from "react-native"
import { cardStyles } from "./CardMatchStyles"
import PlayerIcon from '@/assets/icons/profile.png';
import DateIcon from '@/assets/icons/TimeCircle.png';
import { formatDate } from "@/util/DateUtil";
import { useRef, useState, Dispatch } from 'react';
import PopupExclusion from '../PopupExclusion';
import { MatchService } from '@/services/match';
import { Link } from 'expo-router';
import BottomSheet from '@/components/bottomSheet';
import EditIcon from '@/lotties/edit.json'
import Trash from '@/lotties/trash.json'

interface CardMatchProps {
  item: Partial<MatchInfo>;
  setListMatches: Dispatch<React.SetStateAction<Partial<MatchInfo>[]>>;
}

const CardMatch: React.FC<CardMatchProps> = ({ item, setListMatches }) => {
  const [popUpExclusionOpen, setPopupExclusionOpen] = useState(false)
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false)
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

  const bottomSheetOptions = [
    {
      icon: JSON.stringify(EditIcon),
      onClick: () => { },
      optionName: 'Editar'
    },
    {
      icon: JSON.stringify(Trash),
      onClick: () => {
        setBottomSheetOpen(false)
        setPopupExclusionOpen(true)
      },
      optionName: 'Excluír partida'
    },
  ]

  return (
    <>

      <Link
        onLongPress={() => setBottomSheetOpen(true)}
        href={{
          pathname: '/match/[id]',
          params: { id: item.id }
        }}
      >
        <View style={cardStyles.container} >
          <Text style={cardStyles.title}>{item.name}</Text>
          <View style={{
            flex: 1,
            flexDirection: 'row'
          }}>
            <View style={cardStyles.vInfoWithPlayers}>
              <View style={cardStyles.vDate}>
                <Image source={DateIcon} />
                <Text style={cardStyles.defalutText}>
                  {item.created_at && formatDate(new Date(item?.created_at), 'dd/MM/yyyy')}
                </Text>
              </View>
              {item.players?.map(player => (
                <View key={player.id} style={cardStyles.vPlayers}>
                  <Image source={PlayerIcon} style={cardStyles.iconPlayer} />
                  <Text style={cardStyles.defalutText} >{player.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Link>

      <BottomSheet
        showList={bottomSheetOpen}
        setShowList={setBottomSheetOpen}
        data={bottomSheetOptions}
      />
      <PopupExclusion
        onCancel={handleCancel}
        onConfirmDelete={deleteMatch}
        visible={popUpExclusionOpen}
      />
    </>
  )
}

export default CardMatch