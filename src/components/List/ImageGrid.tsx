import React, { useState } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
// from app
import { LAYOUT, COLOR } from 'app/src/constants';
import { useGooglePlace } from 'app/src/hooks';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { IPlaceNode } from 'app/src/Reducer';

// interface Props {}
interface Props {
  realSpots: IPlaceNode[];
  possibilitySpots: IPlaceNode[];
  updateSelectedSpots(spots: IPlaceNode[]): void;
}
/** 画像選択グリッド */
export const ImageGrid: React.FC<Props> = (props: Props) => {
  const { realSpots, possibilitySpots, updateSelectedSpots } = props;
  const { getPlacePhoto } = useGooglePlace();

  const [spots, setSpots] = useState<IPlaceNode[]>(realSpots);

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
              uri: item.place.hpImage
                ? item.place.hpImage
                : getPlacePhoto(item.place.photos[0].photo_reference),
            }}
          />
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
