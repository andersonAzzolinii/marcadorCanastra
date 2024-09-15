import { Image, Pressable, Text, TouchableOpacity, View } from "react-native"
import Options from '@/assets/icons/options.png'
import headerStyles from "./headerStyles"
import { MatchInfo } from "@/types/match"



const Header = (
  { match, openOptions, setOpenOptions }: {
    match: MatchInfo, openOptions: boolean,
    setOpenOptions: React.Dispatch<React.SetStateAction<boolean>>
  },

) => {

  return (
    <View style={headerStyles.container}>
      <View>
        <Text style={headerStyles.matchName}>{match?.name}</Text>
        <Text style={headerStyles.maxPointsText}>Até {match?.max_points} pontos</Text>
      </View>
      <TouchableOpacity onPress={() => setOpenOptions(!openOptions)}>
        <Image
          style={{ width: 50, height: 50 }}
          source={Options}
        />
      </TouchableOpacity>
      {
        openOptions &&
        <View style={{
          position: 'absolute',
          right: 20,
          top: 55,
          justifyContent: 'space-between',
          borderColor: 'black',
          zIndex: 200,
          minWidth: 150,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 5,
        }}>
          <View style={{ backgroundColor: 'white', }}>
            <TouchableOpacity onPress={() => console.log('PRESSSS')}>
              <Text style={{ height: 40, textAlign: 'center', borderWidth: 1, textAlignVertical: 'center' }}>Histórico</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('PRESSSS2')}>
              <Text style={{ height: 40, textAlign: 'center', borderWidth: 1, textAlignVertical: 'center' }}>Editar informações</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    </View >
  )
}

export default Header