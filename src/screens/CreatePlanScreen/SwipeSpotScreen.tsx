import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container } from 'native-base';

// from app
import { ICandidateSpot } from 'app/src/interfaces/app/Spot';
import { SpotSwiper } from 'app/src/components/Content';
import { CompleteFooterButton } from 'app/src/components/Button';

// 仮データ
const SAMPLE_SPOTS: Array<ICandidateSpot> = [
  {
    spotName: '1Dateカフェ渋谷店',
    description: 'この夏オススメのデートスポット',
    address: '東京都渋谷区道玄坂1-1-1',
    latitude: 35.6585805,
    longitude: 139.7432442,
  },
  {
    spotName: '1Date公園',
    description: 'ゆったり公園デートにおすすめ！',
    address: '東京都渋谷区代々木2-2-2',
    latitude: 35.6585805,
    longitude: 139.7432442,
  },
];

/** デートスポット候補スワイプ画面 */
const SwipeSpotScreen: React.FC = () => {
  const { navigate } = useNavigation();

  const onCompleteButtonPress = useCallback(() => {
    navigate('Select');
  }, []);

  return (
    <Container>
      <SpotSwiper spots={SAMPLE_SPOTS} />
      {/* FIXME Footer透明にしたい */}
      <CompleteFooterButton title="次へ" onPress={onCompleteButtonPress} />
    </Container>
  );
};

export default SwipeSpotScreen;
