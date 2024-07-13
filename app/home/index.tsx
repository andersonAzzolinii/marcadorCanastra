import { Text, View, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import homeStyle from './homeStyle';
import DefaultTextInput from '../Input';

export default function Home() {

  const headerRender = () => {
    return (
      <View>
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

  const renderBody = () => {
    return (
      <></>
    )
  }
  return (
    <SafeAreaView  >
      <View style={homeStyle.container}>
        <FlatList
          ListHeaderComponent={headerRender}
          renderItem={renderBody}
          data={[]}
          ListEmptyComponent={emptyRender}
        >
        </FlatList>
      </View>
    </SafeAreaView>
  )
}
