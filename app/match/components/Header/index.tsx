import { Image, Text, TouchableOpacity, View } from "react-native"
import Options from '@/assets/icons/options.png'
import headerStyles from "./headerStyles"
import { MatchInfo } from "@/types/match"
import { useState } from "react"
import HistoryMatch from "../History"
import { useRouter, } from "expo-router"

const Header = (
  { match, openOptions, setOpenOptions }: {
    match: MatchInfo, openOptions: boolean,
    setOpenOptions: React.Dispatch<React.SetStateAction<boolean>>
  },

) => {
  const [showHistory, setShowHistory] = useState(false)
  const router = useRouter();

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
      {
        openOptions &&

        <View style={headerStyles.containerListOptions}>
          <View >
            <TouchableOpacity onPress={handleClickOpenHistory}>
              <Text style={headerStyles.textOption}>Histórico</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleClickToMatch} >
              <Text style={headerStyles.textOption}>Editar informações</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
      <HistoryMatch
        history={match.history}
        setShowHistory={setShowHistory}
        showHistory={showHistory}
      />
    </View >
  )
}

export default Header