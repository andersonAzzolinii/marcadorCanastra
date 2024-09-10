import { FC, useEffect, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";
import DefaultButton from "@/components/button";
import Eyes from '@/lotties/eyes.json'
import LottieView from "lottie-react-native";
import { MatchInfo } from "@/types/match";
import PopupWinner from "../PopupWinner";

interface CheckPlayerPointsProps {
  match: MatchInfo | undefined
}

const CheckPlayerPoints: FC<CheckPlayerPointsProps> = ({ match }) => {

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [popupWinnerVisible, setPopupWinnerVisible] = useState(false)

  useEffect(() => {
    controlAnimationButton()
  }, [match, fadeAnim]);

  const checkCondition = () => {
    return match?.players
      .map(player => player.points.reduce((a, b) => a + b, 0))
      .some(e => e >= Number(match.max_points));
  };
  const renderLottieButton = (): React.JSX.Element => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
      <Text style={{ fontWeight: 'bold' }}>Temos um vencedor?</Text>
      <LottieView
        autoPlay
        style={{
          width: 45,
          height: 32,
        }}
        source={Eyes}
      />
    </View>
  )

  const controlAnimationButton = () => {
    if (checkCondition()) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else fadeAnim.setValue(0);
  }

  return (
    <>
      {checkCondition() &&
        <Animated.View
          key="winnerButton" 
          style={{
            opacity: fadeAnim,
            paddingHorizontal: 15,
            marginBottom: 5,
            alignItems: 'center',
          }}
        >
          <DefaultButton
            style={{ height: 40, paddingHorizontal: 20 }}
            textStyle={{ fontSize: 16 }}
            onPress={() => setPopupWinnerVisible(true)}
            children={renderLottieButton()}
          />
        </Animated.View>
      }
      <PopupWinner
        maxPoints={Number(match?.max_points)}
        players={match?.players}
        visible={popupWinnerVisible}
        onCancel={() => setPopupWinnerVisible(false)}
      />
    </>
  )
}

export default CheckPlayerPoints