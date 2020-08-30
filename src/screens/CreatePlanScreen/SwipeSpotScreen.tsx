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
  const SELECT_SPOT: Array<ICandidateSpot> = [];
  const SAMPLE_SPOTS: Array<ICandidateSpot> = [];

  const setSpot = useCallback(() => {
    console.log(createTempSpots.spots.length, '000');
    for (let i = 0; i < createTempSpots.spots.length; i++) {
      let obj = {
        spotName: createTempSpots.spots[i]['name'],
        address: createTempSpots.spots[i]['vicinity'],
        rating: createTempSpots.spots[i]['user_ratings_total'],
        imageUrl:
          createTempSpots.spots[i].photos &&
          createTempSpots.spots[i].photos.length > 0
            ? getPlacePhoto(createTempSpots.spots[i].photos[0].photo_reference)
            : 'https://via.placeholder.com/120x90?text=No+Image',
        latitude: createTempSpots.spots[i]['geometry']['location']['lat'],
        longitude: createTempSpots.spots[i]['geometry']['location']['lng'],
        id: createTempSpots.spots[i]['place_id'],
        heart: false,
        like: false,
        openinghour: '',
      };
      if (i == 0) {
        SELECT_SPOT.push(obj);
      } else {
        SAMPLE_SPOTS.push(obj);
      }
    }
  }, [SAMPLE_SPOTS]);

  return (
    <Container>
      {setSpot()}
      <SpotSwiper spots={SAMPLE_SPOTS} selected={SELECT_SPOT} />
    </Container>
  );
};

export default SwipeSpotScreen;
