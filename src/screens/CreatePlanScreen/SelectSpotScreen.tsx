/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container } from 'native-base';

// from app
import { ImageGrid } from 'app/src/components/List';
import { CompleteFooterButton } from 'app/src/components/Button';
import { useDispatch, useGlobalState } from 'app/src/Store';
import { SelectedPlace } from 'app/src/Reducer';
import { useGooglePlace } from 'app/src/hooks';
import { SPOT_TYPE, getTypeIndex } from 'app/src/constants';
import { LoadingSpinner } from 'app/src/components/Spinners';

const G = require('generatorics');

/** デートスポット厳選画面 */
const SelectSpotScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const { distanceMatrix, getDistanceMatrix } = useGooglePlace();
  const createPlan = useGlobalState('createPlan');

  const [selectedSpots, setSelectedSpots] = useState<SelectedPlace[]>([]);
  const [isPlacesLoading, setIsPlacesLoading] = useState<boolean>(true);

  useEffect(() => {
    const placeIDs = [];
    for (let i = 0; i < createPlan.selectedSpots.length; i += 1) {
      placeIDs.push(`place_id:${createPlan.selectedSpots[i].place.place_id}`);
    }
    getDistanceMatrix(placeIDs);
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
          route: [createPlan.selectedSpots.indexOf(selectedSpots[0])],
        };
      }
      if (selectedSpots.length > 1) {
        const arrKey: number[] = [];
        selectedSpots.forEach((item) => {
          arrKey.push(createPlan.selectedSpots.indexOf(item));
        });

        let cost = 0;
        let route: number[] = [];
        for (const comb of G.permutation(arrKey, selectedSpots.length)) {
          let perCost =
            SPOT_TYPE[
              getRightSpotType(createPlan.selectedSpots[comb[0]].place.types)
            ].elapse;
          for (let j = 0; j < selectedSpots.length - 1; j += 1) {
            perCost +=
              distanceMatrix.rows[comb[j]].elements[comb[j + 1]].duration
                .value +
              SPOT_TYPE[
                getRightSpotType(
                  createPlan.selectedSpots[comb[j + 1]].place.types,
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
    const dateFrom = new Date(createPlan.dateFrom);
    const dateTo = new Date(createPlan.dateTo);
    // const orgTime = (dateTo - dateFrom) / 60000;
    const orgTime = 1000;
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
    const remainSpots = createPlan.selectedSpots.filter((item) => {
      return selectedSpots.indexOf(item) < 0;
    });
    if (distanceMatrix) {
      return remainSpots.filter((item) => {
        const idx = createPlan.selectedSpots.indexOf(item);
        if (selectedSpots.length > 0) {
          const lastItem =
            createPlan.selectedSpots[path.route[path.route.length - 1]];
          const estimateTime =
            distanceMatrix.rows[createPlan.selectedSpots.indexOf(lastItem)]
              .elements[createPlan.selectedSpots.indexOf(item)].duration.value +
            SPOT_TYPE[getRightSpotType(item.place.types)].elapse;

          return estimateTime < remainTime;
        }

        return true;
      });
    }

    return remainSpots;
  }, [remainTime]);

  function getRightSpotType(types: string[]) {
    let typeIdx = -1;
    types.forEach((value) => {
      if (getTypeIndex(value) >= 0) typeIdx = getTypeIndex(value);
    });

    return typeIdx;
  }

  function onCompleteButtonPress() {
    navigate('Arrange');
  }

  if (isPlacesLoading) {
    return LoadingSpinner;
  }

  return (
    <Container>
      <ImageGrid
        realSpots={createPlan.selectedSpots}
        possibilitySpots={possibilitySpots}
        updateSelectedSpots={setSelectedSpots}
      />
      <CompleteFooterButton
        title="次へ"
        spotCount={selectedSpots.length}
        remainTime={remainTime}
        onPress={onCompleteButtonPress}
      />
    </Container>
  );
};

export default SelectSpotScreen;
