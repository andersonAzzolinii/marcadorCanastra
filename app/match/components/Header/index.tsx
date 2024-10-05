import { Image, Text, TouchableOpacity, View } from "react-native"
import Options from '@/assets/icons/options.png'
import headerStyles from "./headerStyles"
import { MatchInfo } from "@/types/match"
import { useState } from "react"
import HistoryMatch from "../History"
import { useRouter, } from "expo-router"
import BottomSheet from "@/components/bottomSheet"
import Edit from '@/lotties/edit.json'
import History from '@/lotties/history.json'

const Header = (
  { match, openOptions, setOpenOptions }: {
    match: MatchInfo, openOptions: boolean,
    setOpenOptions: React.Dispatch<React.SetStateAction<boolean>>
  },

) => {
  const [showHistory, setShowHistory] = useState(false)
  const router = useRouter();
  const bottomSheetItems = [{
    icon: JSON.stringify(Edit),
    onClick: () => handleClickToMatch(),
    optionName: 'Editar informações'
  },
  {
    icon: JSON.stringify(History),
    onClick: () => handleClickOpenHistory(),
    optionName: 'Visualizar histórico'
  }]

  const handleClickOpenHistory = () => {
    setShowHistory(true)
    setOpenOptions(false)
  }

  const handleClickToMatch = () => {
    const myObject = {
      id: match.id,
      name: match.name,
      max_points: String(match.max_points),
      players: match.players
    };
    setOpenOptions(false)
    router.push({
      pathname: '/formMatch',
      params: { matchData: JSON.stringify(myObject) },
    });
  }

  return (
    <View style={headerStyles.container}>
      <View>
        <Text style={headerStyles.matchName}>{match?.name}</Text>
        <Text style={headerStyles.maxPointsText}>Até {match?.max_points} pontos</Text>
      </View>
      <TouchableOpacity onPress={() => setOpenOptions(!openOptions)}>
        <Image
          style={headerStyles.imageOptions}
          source={Options}
        />
      </TouchableOpacity>
      <BottomSheet
        showList={openOptions}
        setShowList={setOpenOptions}
        data={bottomSheetItems}
      />
      <HistoryMatch
        history={match.history}
        setShowHistory={setShowHistory}
        showHistory={showHistory}
      />
    </View >
  )
}

export default Header