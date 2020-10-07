import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from 'react';

import {
  DeckSwiper,
  Card,
  CardItem,
  Content,
  Text,
  Left,
  Body,
  Right,
  Container,
  Footer,
} from 'native-base';
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import Carousel from 'react-native-snap-carousel';
// from app
import { ICandidateSpot } from 'app/src/interfaces/app/Spot';
import { SpotSwiper } from 'app/src/components/Content';
import { CompleteFooterButton } from 'app/src/components/Button';
import { useGooglePlace } from 'app/src/hooks';
import { useDispatch, useGlobalState } from 'app/src/Store';
import { useNavigation } from '@react-navigation/native';
import { ActionType, SelectedPlace } from 'app/src/Reducer';
import {
  ILocation,
  IPlace,
  IPlaceOpenHour,
  IGoogleResult,
} from 'app/src/interfaces/app/Map';
import { COLOR, SPOT_TYPE, LAYOUT, getTypeIndex } from 'app/src/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Slider, Button, Overlay, CheckBox } from 'react-native-elements';
import {
  FontAwesome,
  FontAwesome5,
  Entypo,
  Ionicons,
} from '@expo/vector-icons';

import axios from 'axios';
import { LoadingSpinner } from 'app/src/components/Spinners';
import SelectSpotScreen from 'app/src/screens/CreatePlanScreen/SelectSpotScreen';

/** デートスポット候補スワイプ画面 */
const SwipeSpotScreen: React.FC = () => {
  const {
    searchNearbyPlace,
    getPlacePhoto,
    getPlaceDetail,
    getPlaceOpeningHours,
    places,
    setPlaces,
    API_KEY,
    baseUrl,
  } = useGooglePlace();
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const createPlan = useGlobalState('createPlan');
  const [typesPopup, setTypesPopup] = useState(false);
  const [isPlacesLoading, setIsPlacesLoading] = useState<boolean>(true);
  const [spots, setSpots] = useState<SelectedPlace[]>(createPlan.spots);
  const [deletedSpots, setDeletedSpots] = useState<string[]>([]);
  const [excludeTypes, setExcludeTypes] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentSpot, setCurrentSpot] = useState<SelectedPlace>();

  const carouselRef = useRef();

  const showSpots = useMemo(() => {
    const result = [...spots];

    const includeTypes: number[] = [];
    for (let i = 0; i < SPOT_TYPE.length; i += 1) {
      if (excludeTypes.indexOf(i) < 0) includeTypes.push(i);
    }

    return result.filter((value) => {
      if (deletedSpots.indexOf(value.place.place_id) >= 0) return false;

      for (let i = 0; i < value.place.types.length; i += 1) {
        const type = value.place.types[i];
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
        const obj = {
          place: item,
          heart: false,
          like: false,
          check: false,
        } as SelectedPlace;

        let exists = false;
        for (let j = 0; j < newSpots.length; j += 1) {
          if (newSpots[j].place.place_id === item.place_id) {
            exists = true;
          }
        }
        if (!exists) newSpots.push(obj);
      }
      setSpots(newSpots);
    }
  }, [places]);

  if (isPlacesLoading) {
    return LoadingSpinner;
  }

  function setSpotDelete() {
    const idx = currentIndex;
    setDeletedSpots((prev) => [...prev, showSpots[idx].place.place_id]);
  }

  function setSpotRestore() {
    const newDeletedSpots = [...deletedSpots];
    newDeletedSpots.pop();
    setDeletedSpots(newDeletedSpots);
  }

  function setSpotSelect() {
    const idx = currentIndex;
    showSpots[idx].heart = !showSpots[idx].heart;
    setCurrentSpot({ ...showSpots[idx] });
  }

  function setSpotLike() {
    const idx = currentIndex;
    showSpots[idx].like = !showSpots[idx].like;
    setCurrentSpot({ ...showSpots[idx] });
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

  const renderItem = (item: SelectedPlace, index: number) => (
    <View>
      <Image
        style={{
          height: LAYOUT.window.height * 0.35,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        source={{
          uri:
            item.place.photos && item.place.photos.length > 0
              ? getPlacePhoto(item.place.photos[0].photo_reference)
              : 'https://via.placeholder.com/120x90?text=No+Image',
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
            {item.place.name}
          </Text>
          <Text note style={thisStyle.centerText}>
            {item.place.vicinity}
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
            {item.place.user_ratings_total}
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
          height: LAYOUT.window.height * 0.55,
          padding: 5,
        }}
      >
        {showSpots.length ? (
          <Carousel
            data={showSpots}
            sliderWidth={LAYOUT.window.width * 0.95}
            itemWidth={LAYOUT.window.width * 0.85}
            renderItem={({
              item,
              index,
            }: {
              item: SelectedPlace;
              index: number;
            }) => renderItem(item, index)}
            onBeforeSnapToItem={(slideIndex) => {
              setCurrentIndex(slideIndex);
              setCurrentSpot(showSpots[slideIndex]);
            }}
          />
        ) : null}
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
          onPress={() => setSpotRestore()}
        >
          <FontAwesome5 name="redo-alt" size={20} color={COLOR.tintColor} />
        </TouchableOpacity>
        <TouchableOpacity
          style={thisStyle.footerIcon2}
          onPress={() => setSpotDelete()}
        >
          <FontAwesome5 name="times" size={30} color={COLOR.tintColor} />
        </TouchableOpacity>
        <TouchableOpacity
          style={thisStyle.footerIcon2}
          onPress={() => setSpotSelect()}
        >
          {currentSpot?.heart ? (
            <FontAwesome5
              name="heart"
              size={30}
              color={COLOR.tintColor}
              solid
            />
          ) : (
            <FontAwesome5 name="heart" size={30} color={COLOR.tintColor} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={thisStyle.footerIcon1}
          onPress={() => setSpotLike()}
        >
          {currentSpot?.like ? (
            <FontAwesome5 name="star" size={20} color={COLOR.tintColor} solid />
          ) : (
            <FontAwesome5 name="star" size={20} color={COLOR.tintColor} />
          )}
        </TouchableOpacity>
      </View>
      <View style={thisStyle.touchable}>
        <Button
          buttonStyle={thisStyle.footerButton}
          title="保存して案内"
          // onPress={onCompleteButtonPress}
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
        <FlatList
          data={SPOT_TYPE}
          renderItem={({ item, index }) => (
            <CheckBox
              title={item.title}
              checked={excludeTypes.indexOf(index) < 0}
              onPress={() => onPressSpotType(index)}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </Overlay>
    </Container>
  );
};

const thisStyle = StyleSheet.create({
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
