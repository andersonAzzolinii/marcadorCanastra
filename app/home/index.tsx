import { Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import homeStyle from './homeStyle';
import DefaultTextInput from '../../components/Input';
import NewMatchButton from '@/components/newMatchButton';
import { useCallback, useState } from 'react';
import { MatchInfo } from '@/types/match';
import { MatchService } from '@/services/match';
import CardMatch from './components/CardMatch';
import { useFocusEffect } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Home() {

  const serviceMatch = new MatchService()

  const [listMatches, setListMatches] = useState<Partial<MatchInfo>[]>([])

  const getMatches = useCallback(async () => {
    const matches = await serviceMatch.find();
    Array.isArray(matches) && setListMatches(matches as Partial<MatchInfo>[]);
  }, [serviceMatch]);

  useFocusEffect(
    useCallback(() => {
      getMatches();
    }, [])
  );

  const headerRender = () => {
    return (
      <View style={homeStyle.vInput}>
        <Text style={homeStyle.headerText}>Minhas partidas</Text>
        <DefaultTextInput
          placeholder='Procure sua partida aqui'
        />
      </View>
    )
  }

  const emptyRender = () => (
    <View style={homeStyle.vEmptyMatches}>
      <Text style={homeStyle.emptyText}>Nenhuma partida criada </Text>
    </View>
  )


  return (
    <SafeAreaView  >
      <GestureHandlerRootView style={homeStyle.container}>
        <View >
          <FlatList
            keyExtractor={(item) => String(item.id)}
            ListHeaderComponent={headerRender}
            renderItem={({ item }) => <CardMatch item={item} setListMatches={setListMatches} />}
            data={listMatches}
            ListEmptyComponent={emptyRender}
          >
          </FlatList>
          <NewMatchButton />
        </View>
      </GestureHandlerRootView>
    </SafeAreaView >
  )
}
