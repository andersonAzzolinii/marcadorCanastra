import { MatchService } from "@/services/match";
import { MatchInfo } from "@/types/match";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  TouchableWithoutFeedback,
  View,
  BackHandler
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import matchStyles from "./matchStyles";
import PlayerPoints from "./components/PlayerPoints";
import PlayerInputs from "./components/PlayerInputs";
import CheckPlayerPoints from "./components/CheckPlayerPoints";
import Header from "./components/Header";
import { useRouter } from "expo-router";

const Match = () => {
  const { id } = useLocalSearchParams();
  const serviceMatch = new MatchService()
  const [match, setMatch] = useState<MatchInfo | undefined>()
  const [openOptions, setOpenOptions] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getMatches()
  }, [])

  const onBackPress = () => {
    if (openOptions) {
      setOpenOptions(false);
      return true;
    }
    router.replace('/')
  }

  BackHandler.addEventListener('hardwareBackPress', onBackPress);

  const getMatches = useCallback(async () => {
    const match = await serviceMatch.findPerId(Number(id));
    console.log(match);

    match && setMatch(match);
  }, []);

  const handlePressOutside = () => {
    if (openOptions)
      setOpenOptions(false);
  };

  return (
    <SafeAreaView style={matchStyles.safeArea}>

      <TouchableWithoutFeedback onPress={handlePressOutside}>
        <View style={matchStyles.container}>
          {match &&
            <Header
              match={match}
              openOptions={openOptions}
              setOpenOptions={setOpenOptions}
            />
          }
          <>
            <View style={matchStyles.topListContainer}>
              <PlayerPoints
                players={match?.players}
              />
              <CheckPlayerPoints
                match={match}
                setMatch={setMatch}
              />
            </View>
            <View style={matchStyles.bottomListContainer}>
              <PlayerInputs
                match={match}
                setMatch={setMatch}
              />
            </View>
          </>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView >
  )
}

export default Match;
