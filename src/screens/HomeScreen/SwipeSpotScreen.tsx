import React from "react";
import { useNavigation } from "react-navigation-hooks";
import { Container, Content, Footer } from "native-base";

// from app
import SpotSwiper from "app/src/components/contents/SpotSwiper";
import CompleteButton from "app/src/components/buttons/CompleteButton";
import { CandidateSpot } from "app/src/types/api/TSpot";
import { createPlanStyle } from "app/src/styles/home-screen-style";

// 仮データ
const SAMPLE_SPOTS: Array<CandidateSpot> = [
  {
    spotName: "1Dateカフェ渋谷店",
    description: "この夏オススメのデートスポット",
    address: "東京都渋谷区道玄坂1-1-1",
    latitude: 35.6585805,
    longitude: 139.7432442
  },
  {
    spotName: "1Date公園",
    description: "ゆったり公園デートにおすすめ！",
    address: "東京都渋谷区代々木2-2-2",
    latitude: 35.6585805,
    longitude: 139.7432442
  }
];

/**
 * デートスポット候補スワイプ画面
 * @author kotatanaka
 */
const SwipeSpotScreen: React.FC = () => {
  const { navigate } = useNavigation();

  const onCompleteButtonPress = () => {
    navigate("select");
  };

  return (
    <Container>
      <Content style={createPlanStyle.swiper}>
        <SpotSwiper spots={SAMPLE_SPOTS} />
      </Content>
      {/* FIXME Footer透明にしたい */}
      <Footer>
        <CompleteButton title="決定" onPress={onCompleteButtonPress} />
      </Footer>
    </Container>
  );
};

export default SwipeSpotScreen;
