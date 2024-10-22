import { MatchInfo } from "@/types/match"
import { View, Text, Image } from "react-native"
import { cardStyles } from "./CardMatchStyles"
import PlayerIcon from '@/assets/icons/user.png';
import EditIcon from '@/lotties/edit.json'
import Trash from '@/lotties/trash.json'
import DateIcon from '@/assets/icons/calendar.png';
import { formatDate } from "@/util/DateUtil";
import { useState, Dispatch } from 'react';
import PopupExclusion from '../PopupExclusion';
import { MatchService } from '@/services/match';
import { Link } from 'expo-router';
import BottomSheet from '@/components/bottomSheet';

interface CardMatchProps {
  item: Partial<MatchInfo>;
  setListMatches: Dispatch<React.SetStateAction<Partial<MatchInfo>[]>>;
}

const CardMatch: React.FC<CardMatchProps> = ({ item, setListMatches }) => {
  const [popUpExclusionOpen, setPopupExclusionOpen] = useState(false)
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false)
  const serviceMatch = new MatchService()

  const handleCancel = () => {
    setPopupExclusionOpen(false)
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

        <View style={cardStyles.container}>
          <Text style={cardStyles.title}>{item.name}</Text>
          <View style={cardStyles.vInfoWithPlayers} >
            <Image source={PlayerIcon} />

            {item.players?.map((player, index) => (
              <View key={player.id} style={cardStyles.vPlayers}>
                <Text style={cardStyles.defalutText} >{player.name}</Text>
                {(index + 1) !== item.players?.length && <Text style={cardStyles.defalutText}>X</Text>}
              </View>
            ))}

          </View>
          <View style={cardStyles.vDate}>
            <Image source={DateIcon} />
            <Text style={cardStyles.defalutText}>
              {item.created_at && formatDate(new Date(item?.created_at), 'dd/MM/yyyy')}
            </Text>
          </View>
        </View>
      </Link >

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