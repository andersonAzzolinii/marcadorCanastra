import { MatchInfo } from "@/types/match"
import { View, Text, TouchableOpacity } from "react-native"
import { cardStyles } from "./CardMatchStyles"
import EditIcon from '@/lotties/edit.json'
import Trash from '@/lotties/trash.json'
import { formatDate } from "@/util/DateUtil";
import { useState, Dispatch } from 'react';
import PopupExclusion from '../PopupExclusion';
import { MatchService } from '@/services/match';
import { useRouter } from 'expo-router';
import BottomSheet from '@/components/bottomSheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { MyFormValues } from "@/app/interfaces"
import { useNotification } from "@/contexts/Notification"

interface CardMatchProps {
  item: Partial<MatchInfo>;
  setListMatches: Dispatch<React.SetStateAction<Partial<MatchInfo>[]>>;
}

const CardMatch: React.FC<CardMatchProps> = ({ item, setListMatches }) => {
  const [popUpExclusionOpen, setPopupExclusionOpen] = useState(false)
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false)
  const [matchSelected, setMatchSelected] = useState<MyFormValues>()
  const serviceMatch = new MatchService()
  const router = useRouter();
  const { notify } = useNotification()

  const handleCancel = () => {
    setPopupExclusionOpen(false)
  }

  const deleteMatch = async () => {
    const idPlayers: number[] = item.players?.map(player => player.id) || [];
    const excluded = item.id && await serviceMatch.delete(item.id, idPlayers)
    if (excluded) {
      notify('success', 'Partida excluída com sucesso.')
      setListMatches((prev) => prev.filter(e => e.id !== item.id))
    } else notify('error', 'Problema ao excluír partida.')
  }

  const getInfoMatch = async (idMatch: number | undefined) => {
    try {
      setBottomSheetOpen(true)
      const info = await serviceMatch.findPerId(idMatch ?? 0)
      info && setMatchSelected(info)
    } catch (error) {
      console.error(error)
    }
  }

  const handleEdit = () => {
    const objMatch = {
      id: matchSelected?.id,
      name: matchSelected?.name,
      max_points: String(matchSelected?.max_points),
      players: matchSelected?.players
    }
    if (matchSelected) {
      setBottomSheetOpen(false)
      return router.push({
        pathname: 'formMatch',
        params: { matchData: JSON.stringify(objMatch) },
      })
    }

  }

  const bottomSheetOptions = [
    {
      icon: JSON.stringify(EditIcon),
      onClick: () => handleEdit(),
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
    <View style={cardStyles.container}>
      <TouchableOpacity
        onPress={() => router.push({
          pathname: '/match/[id]',
          params: { id: item.id }
        })}
        onLongPress={() => getInfoMatch(item.id)}
        activeOpacity={0.7}
        style={cardStyles.touchable} >
        <View style={cardStyles.vTitle}>
          <Text style={cardStyles.title}>{item.name}</Text>
        </View>
        <View style={cardStyles.vInfoWithPlayers} >
          <AntDesign name="user" size={20} />

          {item.players?.map((player, index) => (
            <View key={player.id} style={cardStyles.vPlayers}>
              <Text style={cardStyles.defalutText} >{player.name}</Text>
              {(index + 1) !== item.players?.length && <Text style={cardStyles.defalutText}>X</Text>}
            </View>
          ))}

        </View>
        <View style={cardStyles.vDate}>
          <AntDesign name="calendar" size={20} />
          <Text style={cardStyles.defalutText}>
            {item.created_at && formatDate(new Date(item.created_at), 'dd/MM/yyyy')}
          </Text>
        </View>
      </TouchableOpacity >

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
    </View >
  )
}

export default CardMatch