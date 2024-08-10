import { FC, useEffect, useRef } from "react";
import { Animated } from "react-native";
import DefaultButton from "@/components/button";
import Eyes from '@/lotties/eyes.json'
import LottieView from "lottie-react-native";
import { MatchInfo } from "@/types/match";

interface CheckPlayerPointsProps {
  match: MatchInfo | undefined
}

const CheckPlayerPoints: FC<CheckPlayerPointsProps> = ({ match }) => {

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    controlAnimationButton()
  }, [match, fadeAnim]);

  const checkCondition = () => {
    return match?.players
      .map(player => player.points.reduce((a, b) => a + b, 0))
      .some(e => e >= Number(match.max_points));
  };
  const renderLottieButton = (): React.JSX.Element => (
    <LottieView
      autoPlay
      style={{
        width: 45,
        height: 32,
      }}
      source={Eyes}
    />
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
          key="winnerButton" // Adicionado key para garantir a re-renderização
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
            text="Temos um vencedor?"
            children={renderLottieButton()}
          />
        </Animated.View>
      }
    </>
  )
}

export default CheckPlayerPoints