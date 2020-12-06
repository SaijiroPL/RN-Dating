import React, { useEffect, useState, useMemo, useRef } from 'react';

import { CardItem, Text, Body, Container } from 'native-base';
import { View, Image, StyleSheet, FlatList, SectionList } from 'react-native';

import CardStack, { Card } from 'react-native-card-stack-swiper';
// from app

import { useGooglePlace } from 'app/src/hooks';
import { useDispatch, useGlobalState } from 'app/src/Store';
import { useNavigation } from '@react-navigation/native';
import { ActionType } from 'app/src/Reducer';

import {
  COLOR,
  SPOT_TYPE,
  SPOT_TYPE_GROUP,
  LAYOUT,
  getTypeIndex,
  getRightSpotType,
  getSpotTypesByGroup,
  SpotType,
} from 'app/src/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Overlay, CheckBox } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';

import { LoadingSpinner } from 'app/src/components/Spinners';
import { IPlace } from 'app/src/interfaces/app/Map';

/** デートスポット候補スワイプ画面 */
const SwipeSpotScreen: React.FC = () => {
  const { searchNearbyPlace, getPlacePhoto, places } = useGooglePlace();
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const createPlan = useGlobalState('createPlan');

  const [typesPopup, setTypesPopup] = useState(false);
  const [isPlacesLoading, setIsPlacesLoading] = useState<boolean>(true);
  const [spots, setSpots] = useState<IPlace[]>(createPlan.spots);
  const [excludeTypes, setExcludeTypes] = useState<number[]>([]);
  const [currentSwipped, setCurrentSwipped] = useState<number>(-1);

  const [deletedSpots, setDeletedSpots] = useState<string[]>([]);
  const [likedSpots, setLikedSpots] = useState<string[]>([]);
  const [heartedSpots, setHeartedSpots] = useState<string[]>([]);

  const cardStack = useRef();

  const showSpots = useMemo(() => {
    const result = [...spots];

    const includeTypes: number[] = [];
    for (let i = 0; i < SPOT_TYPE.length; i += 1) {
      if (excludeTypes.indexOf(i) < 0) includeTypes.push(i);
    }

    return result.filter((value) => {
      for (let i = 0; i < value.types.length; i += 1) {
        const type = value.types[i];
        const typeIdx = getTypeIndex(type);
        if (includeTypes.indexOf(typeIdx) >= 0) {
          return true;
        }
      }

      return false;
    });
  }, [excludeTypes, deletedSpots, spots]);

  function onPressSpotType(index: number) {
    const orgExcludeTypes = [...excludeTypes];
    const exists = excludeTypes.indexOf(index);
    if (exists >= 0) {
      orgExcludeTypes.splice(exists, 1);
      setExcludeTypes(orgExcludeTypes);
    } else {
      setExcludeTypes((prev) => [...prev, index]);
    }
  }

  function loadSpotByTypeIndex(idx: number) {
    if (idx < SPOT_TYPE.length) {
      searchNearbyPlace(
        createPlan.center,
        createPlan.radius * 100,
        SPOT_TYPE[idx].id,
      );
      setTimeout(() => {
        loadSpotByTypeIndex(idx + 1);
      }, 100);
    } else {
      setIsPlacesLoading(false);
    }
  }

  useEffect(() => {
    setIsPlacesLoading(true);
    loadSpotByTypeIndex(0);
  }, []);

  useEffect(() => {
    if (places.length > 0) {
      // get places from api
      const newSpots = [...spots];
      for (let i = 0; i < places.length; i += 1) {
        const item = places[i];

        let exists = false;
        for (let j = 0; j < newSpots.length; j += 1) {
          if (newSpots[j].place_id === item.place_id) {
            exists = true;
          }
        }
        if (!exists && item.photos) newSpots.push({ ...item });
      }
      const randomSpots = [];
      while (newSpots.length > 0) {
        const randomIdx = Math.floor(Math.random() * newSpots.length);
        randomSpots.push(newSpots[randomIdx]);
        newSpots.splice(randomIdx, 1);
      }
      setSpots(randomSpots);
    }
  }, [places]);

  if (isPlacesLoading) {
    return LoadingSpinner;
  }

  function deleteSpot(idx: number) {
    setDeletedSpots((prev) => [...prev, showSpots[idx].place_id]);
  }

  function likeSpot(idx: number) {
    setLikedSpots((prev) => [...prev, showSpots[idx].place_id]);
  }

  function rewindSpot() {
    if (currentSwipped < 0) return;
    setDeletedSpots((prev) =>
      prev.filter((item) => item !== showSpots[currentSwipped].place_id),
    );
    setLikedSpots((prev) =>
      prev.filter((item) => item !== showSpots[currentSwipped].place_id),
    );
    setHeartedSpots((prev) =>
      prev.filter((item) => item !== showSpots[currentSwipped].place_id),
    );
    if (deletedSpots.indexOf(showSpots[currentSwipped].place_id) >= 0)
      cardStack.current.goBackFromLeft();
    else if (likedSpots.indexOf(showSpots[currentSwipped].place_id) >= 0)
      cardStack.current.goBackFromRight();
    setCurrentSwipped((prev) => prev - 1);
  }

  function onCompleteButtonPress() {
    const candidates = spots
      .filter((item) => {
        return likedSpots.indexOf(item.place_id) >= 0;
      })
      .map((item) => {
        return {
          place: item,
          cost: SPOT_TYPE[getRightSpotType(item.types)].elapse,
          check: heartedSpots.indexOf(item.place_id) >= 0,
        };
      });
    const hearted = spots
      .filter((item) => {
        return heartedSpots.indexOf(item.place_id) >= 0;
      })
      .map((item) => {
        return {
          place: item,
          cost: SPOT_TYPE[getRightSpotType(item.types)].elapse,
          check: true,
        };
      });
    dispatch({
      type: ActionType.SET_CREATE_PLAN,
      payload: {
        ...createPlan,
        candidatedSpots: candidates,
        heartedSpots: hearted,
      },
    });
    navigate('Select');
  }

  function getSectionData() {
    const result: {
      title: string;
      data: SpotType[];
    }[] = [];
    SPOT_TYPE_GROUP.forEach((item, index) => {
      result.push({
        title: item,
        data: getSpotTypesByGroup(index),
      });
    });

    return result;
  }

  const PlannerLike = (
    <Body style={thisStyle.bodylike}>
      <FontAwesome5
        name="heart"
        size={24}
        color={COLOR.greyColor}
        style={{ marginRight: 3 }}
      />
      <FontAwesome5
        name="star"
        size={24}
        color={COLOR.greyColor}
        style={{ marginRight: 3 }}
      />
      <FontAwesome5
        name="comment"
        size={24}
        color={COLOR.greyColor}
        style={{ marginRight: 3 }}
      />
    </Body>
  );

  const renderItem = (item: IPlace) => (
    <View>
      <Image
        style={{
          height: LAYOUT.window.height * 0.35,
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
        }}
        source={{
          uri: getPlacePhoto(item.photos[0].photo_reference),
        }}
      />
      <CardItem
        style={{
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderStyle: 'solid',
          borderWidth: 1,
          borderColor: COLOR.greyColor,
        }}
      >
        <View
          style={{
            flexDirection: 'column',
            width: LAYOUT.window.width * 0.55,
          }}
        >
          <Text note style={thisStyle.centerText}>
            {item.name}
          </Text>
          <Text note style={thisStyle.centerText}>
            {item.vicinity}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
          }}
        >
          <View
            style={{
              height: LAYOUT.window.height * 0.05,
            }}
          >
            {PlannerLike}
          </View>
          <Text note style={thisStyle.footerText}>
            {item.user_ratings_total}
          </Text>
        </View>
      </CardItem>
    </View>
  );

  return (
    <Container>
      <View
        style={{
          justifyContent: 'flex-end',
          flexDirection: 'row',
          paddingRight: LAYOUT.window.width * 0.02,
        }}
      >
        <TouchableOpacity
          style={[thisStyle.filter]}
          onPress={() => setTypesPopup(true)}
        >
          <FontAwesome5 name="list" size={20} color={COLOR.greyColor} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: LAYOUT.window.height * 0.53,
          width: LAYOUT.window.width * 0.9,
          marginLeft: LAYOUT.window.width * 0.06,
          padding: 5,
          marginTop: 10,
        }}
      >
        <CardStack
          ref={cardStack}
          disableBottomSwipe
          disableTopSwipe
          verticalSwipe={false}
          onSwipedLeft={deleteSpot}
          onSwipedRight={likeSpot}
          onSwiped={(idx) => setCurrentSwipped(idx)}
        >
          {showSpots.map((item) => (
            <Card>{renderItem(item)}</Card>
          ))}
        </CardStack>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          style={thisStyle.footerIcon1}
          onPress={() => rewindSpot()}
        >
          <FontAwesome5 name="redo-alt" size={20} color={COLOR.tintColor} />
        </TouchableOpacity>
        <TouchableOpacity
          style={thisStyle.footerIcon2}
          onPress={() => cardStack.current.swipeLeft()}
        >
          <FontAwesome5 name="times" size={30} color={COLOR.tintColor} />
        </TouchableOpacity>
        <TouchableOpacity
          style={thisStyle.footerIcon2}
          onPress={() => cardStack.current.swipeRight()}
        >
          <FontAwesome5 name="heart" size={30} color={COLOR.tintColor} />
        </TouchableOpacity>
        <TouchableOpacity
          style={thisStyle.footerIcon1}
          onPress={() => {
            cardStack.current.swipeRight();
            if (currentSwipped < showSpots.length - 1) {
              setHeartedSpots((prev) => [
                ...prev,
                showSpots[currentSwipped + 1].place_id,
              ]);
            }
          }}
        >
          <FontAwesome5 name="star" size={20} color={COLOR.tintColor} />
        </TouchableOpacity>
      </View>
      <View style={thisStyle.touchable}>
        <Button
          buttonStyle={thisStyle.footerButton}
          title="決定"
          onPress={onCompleteButtonPress}
        />
      </View>
      <Overlay
        isVisible={typesPopup}
        windowBackgroundColor="rgba(0, 0, 0, .5)"
        overlayBackgroundColor="white"
        onBackdropPress={() => {
          setTypesPopup(false);
        }}
        width="auto"
        height={500}
      >
        <SectionList
          sections={getSectionData()}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={thisStyle.sectionHeader}>{title}</Text>
          )}
          renderItem={({ item }) => (
            <CheckBox
              title={item.title}
              checked={excludeTypes.indexOf(getTypeIndex(item.id)) < 0}
              onPress={() => onPressSpotType(getTypeIndex(item.id))}
            />
          )}
        />
      </Overlay>
    </Container>
  );
};

const thisStyle = StyleSheet.create({
  sectionHeader: {
    backgroundColor: 'white',
    paddingTop: 10,
    paddingLeft: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
  filter: {
    width: LAYOUT.window.width * 0.1,
    height: LAYOUT.window.width * 0.1,
    padding: 10,
    borderRadius: LAYOUT.window.width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: LAYOUT.window.width * 0.05,
    marginRight: LAYOUT.window.width * 0.05,
    backgroundColor: COLOR.tintColor,
    marginTop: LAYOUT.window.width * 0.05,
  },
  content: {
    alignItems: 'center',
  },
  footerButton: {
    backgroundColor: COLOR.tintColor,
    width: LAYOUT.window.width * 0.4,
    borderRadius: 10,
  },
  swiper: {
    marginTop: 10,
    padding: 20,
  },
  centerText: {
    fontFamily: 'genju-medium',
    fontSize: 14,
  },
  bodylike: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  likebutton: {
    padding: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: LAYOUT.window.height * 0.1,
  },
  footerText: {
    textAlign: 'center',
  },
  footerIcon1: {
    backgroundColor: COLOR.greyColor,
    width: LAYOUT.window.width * 0.1,
    height: LAYOUT.window.width * 0.1,
    // padding: 5,
    borderRadius: LAYOUT.window.width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: LAYOUT.window.width * 0.01,
    marginRight: LAYOUT.window.width * 0.01,
  },
  footerIcon2: {
    backgroundColor: COLOR.greyColor,
    width: LAYOUT.window.width * 0.13,
    height: LAYOUT.window.width * 0.13,
    // padding: 5,
    borderRadius: LAYOUT.window.width * 0.16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: LAYOUT.window.width * 0.05,
    marginRight: LAYOUT.window.width * 0.05,
  },
  footerIconActive: {
    backgroundColor: COLOR.tintColor,
  },
  touchable: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLOR.backgroundColor,
    height: LAYOUT.window.height * 0.07,
    padding: 0,
    marginBottom: 0,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    justifyContent: 'center',
    backgroundColor: COLOR.tintColor,
    width: LAYOUT.window.width * 0.3,
    borderRadius: 10,
    marginBottom: 0,
  },
});
export default SwipeSpotScreen;
