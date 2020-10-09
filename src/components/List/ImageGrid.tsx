import React, { useCallback, useState, useEffect } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { ICandidateSpot } from 'app/src/interfaces/app/Spot';
import { Container } from 'native-base';
// from app
import { IMAGE, LAYOUT, COLOR } from 'app/src/constants';
import { useGooglePlace } from 'app/src/hooks';
import moment from 'moment';
import {
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { initialWindowSafeAreaInsets } from 'react-native-safe-area-context';
import { SelectedPlace } from 'app/src/Reducer';
import { SpotSwiper } from '../Content/dist/SpotSwiper';

// interface Props {}
interface Props {
  realSpots: SelectedPlace[];
  possibilitySpots: SelectedPlace[];
  updateSelectedSpots(spots: SelectedPlace[]): void;
}
/** 画像選択グリッド */
export const ImageGrid: React.FC<Props> = (props: Props) => {
  const { realSpots, possibilitySpots, updateSelectedSpots } = props;
  const { getPlacePhoto } = useGooglePlace();

  const [spots, setSpots] = useState<SelectedPlace[]>(realSpots);

  function selectItem(index: number) {
    if (!spots[index].check && possibilitySpots.indexOf(spots[index]) < 0)
      return;
    const newSpots = [...spots];
    newSpots[index].check = !newSpots[index].check;
    setSpots(newSpots);
    updateSelectedSpots(
      newSpots.filter((value) => {
        return value.check;
      }),
    );
  }

  function renderMask(item: SelectedPlace) {
    if (item.check) {
      return <View style={thisStyle.selectMask} />;
    }
    if (possibilitySpots.indexOf(item) < 0) {
      return <View style={thisStyle.disableMask} />;
    }
    if (item.like) {
      return (
        <>
          <View style={thisStyle.mask} />
          <View style={thisStyle.textPane}>
            <Text style={thisStyle.maskText}>Check</Text>
          </View>
        </>
      );
    }

    return null;
  }

  return (
    <FlatList
      data={spots}
      keyExtractor={(item) => item.place.place_id}
      numColumns={2}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={thisStyle.box}
          onPress={() => selectItem(index)}
        >
          <Image
            style={thisStyle.image}
            source={{
              uri:
                item.place.photos && item.place.photos.length > 0
                  ? getPlacePhoto(item.place.photos[0].photo_reference)
                  : 'https://via.placeholder.com/120x90?text=No+Image',
            }}
          />
          {item.like && (
            <>
              <View style={thisStyle.mask} />
              <View style={thisStyle.textPane}>
                <Text style={thisStyle.maskText}>Check</Text>
              </View>
            </>
          )}
          {item.check && <View style={thisStyle.selectMask} />}
          {!item.check && possibilitySpots.indexOf(item) < 0 && (
            <View style={thisStyle.disableMask} />
          )}
        </TouchableOpacity>
      )}
      style={thisStyle.list}
    />
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  list: {
    marginLeft: LAYOUT.window.width * 0.05,
    marginRight: LAYOUT.window.width * 0.05,
    marginTop: LAYOUT.window.height * 0.03,
  },
  box: {
    height: LAYOUT.window.height * 0.2,
    width: LAYOUT.window.width * 0.45,
    padding: 5,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  textPane: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 5,
    left: 5,
    justifyContent: 'center',
  },
  mask: {
    height: '100%',
    width: '100%',
    backgroundColor: COLOR.maskColor,
    position: 'absolute',
    top: 5,
    left: 5,
    opacity: 0.5,
  },
  maskText: {
    fontSize: 40,
    color: 'darkorange',
    textAlign: 'center',
    opacity: 1,
    textShadowColor: 'white',
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 1,
    transform: [{ rotate: '-10deg' }],
  },
  selectMask: {
    height: '100%',
    width: '100%',
    backgroundColor: 'orange',
    position: 'absolute',
    top: 5,
    left: 5,
    opacity: 0.5,
  },
  disableMask: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    position: 'absolute',
    top: 5,
    left: 5,
    opacity: 0.5,
  },
});
