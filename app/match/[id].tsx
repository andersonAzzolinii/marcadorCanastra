import { MatchService } from "@/services/match";
import { MatchInfo } from "@/types/match";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Text,
  View,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import matchStyles from "./matchStyles";
import PlayerPoints from "./components/PlayerPoints";
import PlayerInputs from "./components/PlayerInputs";
import CheckPlayerPoints from "./components/CheckPlayerPoints";

const Match = () => {
  const { id } = useLocalSearchParams();
  const serviceMatch = new MatchService()

  const [match, setMatch] = useState<MatchInfo | undefined>()

  useEffect(() => {
    getMatches()
  }, [])

  const getMatches = useCallback(async () => {
    const match = await serviceMatch.findPerId(Number(id));
    match && setMatch(match);
  }, []);

  return (
    <SafeAreaView style={matchStyles.safeArea}>
      <View style={matchStyles.container}>
        <Text style={matchStyles.matchName}>{match?.name}</Text>
        <Text style={matchStyles.maxPointsText}>Até {match?.max_points} pontos</Text>
        <View style={matchStyles.topListContainer}>
          <PlayerPoints
            players={match?.players}
          />
          <CheckPlayerPoints
            match={match}
          />
        </View>
        <View style={matchStyles.bottomListContainer}>
          <PlayerInputs
            match={match}
            setMatch={setMatch}
          />

        </View>
      </View>
    </SafeAreaView>
  )
}

export default Match;
