/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container } from 'native-base';
import moment from 'moment';

// from app
import { ImageGrid } from 'app/src/components/List';
import { CompleteFooterButton } from 'app/src/components/Button';
import { useDispatch, useGlobalState } from 'app/src/Store';
import { ActionType, IPlaceNode } from 'app/src/Reducer';
import { useGooglePlace } from 'app/src/hooks';
import { SPOT_TYPE, getRightSpotType } from 'app/src/constants';
import { LoadingSpinner } from 'app/src/components/Spinners';

const G = require('generatorics');

/** デートスポット厳選画面 */
const SelectSpotScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const { distanceMatrix, getDistanceMatrix } = useGooglePlace();
  const createPlan = useGlobalState('createPlan');

  const [selectedSpots, setSelectedSpots] = useState<IPlaceNode[]>(
    createPlan.heartedSpots,
  );
  const [isPlacesLoading, setIsPlacesLoading] = useState<boolean>(true);

  useEffect(() => {
    const placeIDs = [];
    for (let i = 0; i < createPlan.candidatedSpots.length; i += 1) {
      placeIDs.push(`place_id:${createPlan.candidatedSpots[i].place.place_id}`);
    }

    const mode =
      createPlan.transportations.indexOf('car') >= 0 ? 'drive' : 'transit';
    getDistanceMatrix(placeIDs, mode);
  }, []);

  useEffect(() => {
    if (distanceMatrix) setIsPlacesLoading(false);
  }, [distanceMatrix]);

  const path = useMemo(() => {
    if (distanceMatrix) {
      if (selectedSpots.length === 1) {
        return {
          cost:
            SPOT_TYPE[getRightSpotType(selectedSpots[0].place.types)].elapse,
          route: [createPlan.candidatedSpots.indexOf(selectedSpots[0])],
        };
      }
      if (selectedSpots.length > 1) {
        const arrKey: number[] = [];
        selectedSpots.forEach((item) => {
          arrKey.push(createPlan.candidatedSpots.indexOf(item));
        });

        let cost = 0;
        let route: number[] = [];
        for (const comb of G.permutation(arrKey, selectedSpots.length)) {
          let perCost =
            SPOT_TYPE[
              getRightSpotType(createPlan.candidatedSpots[comb[0]].place.types)
            ].elapse;
          for (let j = 0; j < selectedSpots.length - 1; j += 1) {
            perCost +=
              Math.round(
                distanceMatrix.rows[comb[j]].elements[comb[j + 1]].duration
                  .value / 60,
              ) +
              SPOT_TYPE[
                getRightSpotType(
                  createPlan.candidatedSpots[comb[j + 1]].place.types,
                )
              ].elapse;
          }
          if (cost === 0 || cost > perCost) {
            cost = perCost;
            route = [...comb];
          }
        }

        return {
          cost,
          route,
        };
      }
    }

    return {
      cost: 0,
      route: [],
    };
  }, [selectedSpots]);

  const remainTime = useMemo(() => {
    const orgTime = createPlan.neededTime;
    if (selectedSpots.length === 1) {
      const typeIdx = getRightSpotType(selectedSpots[0].place.types);

      return orgTime - SPOT_TYPE[typeIdx].elapse;
    }
    if (selectedSpots.length > 1) {
      return orgTime - path.cost;
    }

    return orgTime;
  }, [path]);

  const possibilitySpots = useMemo(() => {
    const remainSpots = createPlan.candidatedSpots.filter((item) => {
      return selectedSpots.indexOf(item) < 0;
    });
    if (distanceMatrix) {
      return remainSpots.filter((item) => {
        if (selectedSpots.length > 0) {
          const lastItem =
            createPlan.candidatedSpots[path.route[path.route.length - 1]];
          const estimateTime =
            Math.round(
              distanceMatrix.rows[createPlan.candidatedSpots.indexOf(lastItem)]
                .elements[createPlan.candidatedSpots.indexOf(item)].duration
                .value / 60,
            ) + SPOT_TYPE[getRightSpotType(item.place.types)].elapse;

          return estimateTime < remainTime;
        }

        return true;
      });
    }

    return remainSpots;
  }, [remainTime]);

  function onCompleteButtonPress() {
    if (path.route.length === 0) return;
    const routedSpots: IPlaceNode[] = [];
    selectedSpots.forEach((item, index) => {
      routedSpots.push({
        ...item,
        cost: SPOT_TYPE[getRightSpotType(item.place.types)].elapse,
      });
    });
    dispatch({
      type: ActionType.SET_CREATE_PLAN,
      payload: {
        ...createPlan,
        route: {
          spots: routedSpots,
          cost: path.cost,
          check: false,
        },
      },
    });
    navigate('Arrange');
  }

  const formatMinute = (time: number) =>
    `${Math.floor(time / 60)}時間${time % 60}分`;

  if (isPlacesLoading) {
    return LoadingSpinner;
  }

  return (
    <Container>
      <ImageGrid
        realSpots={createPlan.candidatedSpots}
        possibilitySpots={possibilitySpots}
        updateSelectedSpots={setSelectedSpots}
      />
      <CompleteFooterButton
        title="次へ"
        spotCount={selectedSpots.length}
        remainTime={formatMinute(remainTime)}
        onPress={onCompleteButtonPress}
      />
    </Container>
  );
};

export default SelectSpotScreen;
