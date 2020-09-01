import React, { useCallback, useEffect } from 'react';

import { Container } from 'native-base';

// from app
import { ICandidateSpot } from 'app/src/interfaces/app/Spot';
import { SpotSwiper } from 'app/src/components/Content';
import { CompleteFooterButton } from 'app/src/components/Button';
import { useGooglePlace } from 'app/src/hooks';
import { useDispatch, useGlobalState } from 'app/src/Store';
import SelectSpotScreen from './dist/SelectSpotScreen';

/** デートスポット候補スワイプ画面 */
const SwipeSpotScreen: React.FC = () => {
  const { getPlacePhoto, API_KEY } = useGooglePlace();
  const createTempSpots = useGlobalState('createTempSpots');
  const SAMPLE_SPOTS: Array<ICandidateSpot> = [];

  return (
    <Container>
      <SpotSwiper spots={createTempSpots.tempSpots} />
    </Container>
  );
};

export default SwipeSpotScreen;
