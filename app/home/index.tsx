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

export default function Home() {

  const serviceMatch = new MatchService()

  const [listMatches, setListMatches] = useState<Partial<MatchInfo>[]>([])
  const [filteredMatches, setFilteredMatches] = useState<Partial<MatchInfo>[]>([])
  const [inputSearch, setInputSearch] = useState('')


  const getMatches = useCallback(async () => {
    const matches = await serviceMatch.find();
    Array.isArray(matches) && setListMatches(matches);
  }, [serviceMatch]);

  useFocusEffect(() => {
    getMatches();
  })

  const handleChangeText = (text: string) => {
    setInputSearch(text)
    const filtered = listMatches.filter((match) => {
      const matchNameMatch = match.name?.toLowerCase().includes(inputSearch.toLowerCase());
      const playerNameMatch = match.players?.some(player => player.name.toLowerCase().includes(inputSearch.toLowerCase()));
      return matchNameMatch || playerNameMatch;
    });
    setFilteredMatches(filtered);

  }

  const headerRender = () => {
    return (
      <View style={homeStyle.vInput}>
        <Text style={homeStyle.headerText}>Minhas partidas</Text>
        <DefaultTextInput
          value={inputSearch}
          placeholder='Procure sua partida aqui'
          onChangeText={handleChangeText} />
      </View>
    )
  }

  const emptyRender = () => (
    <View style={homeStyle.vEmptyMatches}>
      <Text style={homeStyle.emptyText}>Nenhuma partida criada</Text>
    </View>
  )

  return (
    <SafeAreaView style={homeStyle.container}>
      {headerRender()}
      <FlatList
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ marginTop: 10 }}
        renderItem={({ item }) => <CardMatch item={item} setListMatches={setListMatches} />}
        data={inputSearch.length > 0 ? filteredMatches : listMatches}
        ListEmptyComponent={emptyRender}
      />
      <NewMatchButton />
    </SafeAreaView >
  )
}
