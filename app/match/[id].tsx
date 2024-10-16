import { MatchService } from "@/services/match";
import { MatchInfo } from "@/types/match";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import matchStyles from "./matchStyles";
import PlayerPoints from "./components/PlayerPoints";
import PlayerInputs from "./components/PlayerInputs";
import CheckPlayerPoints from "./components/CheckPlayerPoints";
import Header from "./components/Header";

const Match = () => {
  const { id } = useLocalSearchParams();
  const serviceMatch = new MatchService()
  const [match, setMatch] = useState<MatchInfo | undefined>()
  const [openOptions, setOpenOptions] = useState(false);

  useFocusEffect(() => {
    getMatchInfo();
  })

  const getMatchInfo = useCallback(async () => {
    const match = await serviceMatch.findPerId(Number(id));
    match && setMatch(match);
  }, []);

  return (
    <SafeAreaView style={matchStyles.safeArea}>
      <View style={matchStyles.container}>
        {match &&
          <Header
            match={match}
            openOptions={openOptions}
            setOpenOptions={setOpenOptions}
          />
        }
        <KeyboardAvoidingView
          style={matchStyles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
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
        </KeyboardAvoidingView>

      </View>
    </SafeAreaView >
  )
}

export default Match;
