import React, { useCallback, useEffect, useState } from 'react';

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

// from app
import { ICandidateSpot } from 'app/src/interfaces/app/Spot';
import { SpotSwiper } from 'app/src/components/Content';
import { CompleteFooterButton } from 'app/src/components/Button';
import { useGooglePlace } from 'app/src/hooks';
import { useDispatch, useGlobalState } from 'app/src/Store';
import { useNavigation } from '@react-navigation/native';
import { ActionType } from 'app/src/Reducer';
import SelectSpotScreen from './dist/SelectSpotScreen';
import { ILocation, IPlace, IPlaceOpenHour } from 'app/src/interfaces/app/Map';
import { COLOR, SPOT_TYPE, LAYOUT } from 'app/src/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Slider, Button, Overlay, CheckBox } from 'react-native-elements';
import {
  FontAwesome,
  FontAwesome5,
  Entypo,
  Ionicons,
} from '@expo/vector-icons';
import { IGoogleResult } from 'app/src/interfaces/app/Map';
import axios from 'axios';
import { LoadingSpinner } from 'app/src/components/Spinners';

/** デートスポット候補スワイプ画面 */
const SwipeSpotScreen: React.FC = () => {
  const [spots, setSpots] = useState([]);
  const [typesPopup, setTypesPopup] = useState(false);
  const [spotChecked, setSpotChecked] = useState([]);
  const [deletedSpots, setDeletedSpots] = useState<ICandidateSpot>([]);
  const [isPlacesLoading, setIsPlacesLoading] = useState<boolean>(true);

  const {
    // searchNearbyPlace,
    getPlacePhoto,
    getPlaceDetail,
    getPlaceOpeningHours,
    // places,
    // setPlaces,
    API_KEY,
    baseUrl,
  } = useGooglePlace();
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const createTempSpots = useGlobalState('createTempSpots');

  useEffect(() => {
    setIsPlacesLoading(true);
    place_load();
  }, [spotChecked]);

  async function place_load() {
    console.disableYellowBox = true;
    let tempSpots = [],
      tokenState = true,
      nextToken = undefined;
    createTempSpots.tempSpots.filter((item) => tempSpots.push(item));
    let type = spotChecked;
    if (type.length) {
      for (let i = 0; i < type.length; i++) {
        if (tokenState && !nextToken) {
          let data = await getPlaces1(type[i]);
          if (data.results?.length) {
            console.log(data.results.length, '22222222222222222222');
            data.results.filter((item: any, index: any) => {
              let obj = {
                spotName: item['name'],
                address: item['vicinity'],
                rating: item['user_ratings_total'],
                imageUrl:
                  item.photos && item.photos.length > 0
                    ? getPlacePhoto(item.photos[0].photo_reference)
                    : 'https://via.placeholder.com/120x90?text=No+Image',
                latitude: item['geometry']['location']['lat'],
                longitude: item['geometry']['location']['lng'],
                id: item['place_id'],
                heart: false,
                like: false,
                check: false,
                openinghour: '',
              };
              if (tempSpots.length) {
                for (let j = 0; j < tempSpots.length; j++) {
                  if (tempSpots[j].id == obj.id) {
                    break;
                  } else if (j == tempSpots.length - 1) {
                    tempSpots.push(obj);
                  }
                }
              } else {
                tempSpots.push(obj);
              }
            });
            if (data.next_page_token) {
              nextToken = data.next_page_token;
              i--;
            } else {
              nextToken = undefined;
            }
          }
          tokenState = false;
        } else if (nextToken) {
          let data = await getPlaces2(type[i], nextToken);
          if (data.results?.length) {
            data.results.filter((item: any) => {
              let obj = {
                spotName: item['name'],
                address: item['vicinity'],
                rating: item['user_ratings_total'],
                imageUrl:
                  item.photos && item.photos.length > 0
                    ? getPlacePhoto(item.photos[0].photo_reference)
                    : 'https://via.placeholder.com/120x90?text=No+Image',
                latitude: item['geometry']['location']['lat'],
                longitude: item['geometry']['location']['lng'],
                id: item['place_id'],
                heart: false,
                like: false,
                check: false,
                openinghour: '',
              };
              if (tempSpots.length) {
                for (let j = 0; j < tempSpots.length; j++) {
                  if (tempSpots[j].id == obj.id) {
                    break;
                  } else if (j == tempSpots.length - 1) {
                    tempSpots.push(obj);
                  }
                }
              } else {
                tempSpots.push(obj);
              }
            });
            if (data.next_page_token) {
              nextToken = data.next_page_token;
              i--;
            } else {
              nextToken = undefined;
            }
          }
        } else {
          tokenState = true;
        }
      }
      for (let i = 0; i < tempSpots.length; i++) {
        let data = await getOpenHours(tempSpots[i].id);
        tempSpots.filter(
          (item) => item.id == tempSpots[i].id,
        )[0].openinghour = data;
      }
      await setSpots(tempSpots);
      await setIsPlacesLoading(false);
    }
  }
  async function getPlaces1(type) {
    let location = createTempSpots.location;
    let radius = createTempSpots.radius;
    const url = `${baseUrl}/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=${radius}&type=${type}&language=ja&key=${API_KEY}`;
    const { data } = await axios.get<IGoogleResult>(url);
    return data;
  }
  async function getPlaces2(type, next_token) {
    let location = createTempSpots.location;
    let radius = createTempSpots.radius;
    const url = `${baseUrl}/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=${radius}&type=${type}&language=ja&key=${API_KEY}&pagetoken=${next_token}`;
    const { data } = await axios.get<IGoogleResult>(url);
    return data;
  }
  useEffect(() => {
    const checked = [];
    for (let i = 0; i < SPOT_TYPE.length; i += 1) {
      if (SPOT_TYPE[i].id == 'restaurant') {
        checked.push(SPOT_TYPE[i].id);
      }
    }
    setSpotChecked(checked);
  }, [SPOT_TYPE]);

  const onCompleteButtonPress = () => {
    let total = [];
    for (let i = 0; i < spots.length; i++) {
      if (spots[i].heart || spots[i].like) {
        total.push(spots[i]);
      }
    }
    if (total.length > 20) {
      alert('Too Much!');
      return;
    } else if (total.length == 0) {
      alert('Select Correctly!');
      return;
    } else {
      dispatch({
        type: ActionType.SET_CREATE_REAL_SPOTS,
        payload: {
          total,
        },
      });
      navigate('Select');
    }
  };

  const formatOpHour = (value: string) =>
    `${value.slice(0, 2)}:${value.slice(2, 4)}`;
  async function getOpenHours(id) {
    const openHours = await getPlaceOpeningHours(id);
    return formatPlaceOpeningHours(openHours);
  }
  function formatPlaceOpeningHours(opHour) {
    if (opHour) {
      const dayHour = opHour.periods[0];
      if (dayHour && dayHour.close) {
        return `${formatOpHour(dayHour.open.time)}-${formatOpHour(
          dayHour.close.time,
        )}`;
      }
      return '24時間営業';
    }
    return '';
  }

  const setSpotFilter = () => {
    setTypesPopup(true);
  };
  const setSpotRestore = () => {
    if (deletedSpots.length) {
      let resoteId = deletedSpots[0].id;
      setSpots((prev) => [...prev, deletedSpots[0]]);
      setDeletedSpots((prev) => prev.filter((item) => item.id !== resoteId));
    }
  };
  const setSpotDelete = (spot) => {
    setDeletedSpots((prev) => [...prev, spot]);
    setSpots((prev) => prev.filter((item) => item.id !== spot.id));
  };
  const setSpotSelect = (spot) => {
    let arr = [...spots];
    arr.filter((item) => item.id == spot.id)[0].heart = true;
    arr.filter((item) => item.id == spot.id)[0].like = false;
    setSpots(arr);
  };
  const setSpotLike = (spot) => {
    let arr = [...spots];
    arr.filter((item) => item.id == spot.id)[0].heart = false;
    arr.filter((item) => item.id == spot.id)[0].like = true;
    setSpots(arr);
  };

  if (isPlacesLoading) {
    return LoadingSpinner;
  }

  const PlannerLike = (
    <Body style={thisStyle.bodylike}>
      <FontAwesome5 name="heart" size={24} color={COLOR.greyColor} />
      <Entypo name="star-outlined" size={24} color={COLOR.greyColor} />
      <FontAwesome name="comment-o" size={24} color={COLOR.greyColor} />
    </Body>
  );

  return (
    <Container>
      <View
        style={{
          justifyContent: 'flex-end',
          flexDirection: 'row',
          marginBottom: 10,
        }}
      >
        <TouchableOpacity
          style={[thisStyle.filter]}
          onPress={() => setSpotFilter()}
        >
          <Entypo name="list" size={30} color={COLOR.greyColor} />
        </TouchableOpacity>
      </View>
      {spots.length ? (
        <View style={{ height: LAYOUT.window.height * 0.7, padding: 10 }}>
          <DeckSwiper
            dataSource={spots}
            renderItem={(item: any) => {
              return (
                <Card>
                  <Image
                    style={{ height: LAYOUT.window.height * 0.4 }}
                    source={{
                      uri: item.imageUrl,
                    }}
                  />
                  <CardItem>
                    <View
                      style={{
                        flexDirection: 'column',
                        width: LAYOUT.window.width * 0.7,
                      }}
                    >
                      <Text note style={thisStyle.centerText}>
                        {item.spotName}
                      </Text>
                      <Text note style={thisStyle.centerText}>
                        {item.address}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        width: LAYOUT.window.width * 0.3,
                        paddingRight: 50,
                      }}
                    >
                      <View
                        style={{
                          height: LAYOUT.window.height * 0.05,
                          padding: 10,
                        }}
                      >
                        {PlannerLike}
                      </View>
                      <Text note style={thisStyle.footerText}>
                        {item.rating}
                      </Text>
                    </View>
                  </CardItem>
                  <CardItem>
                    <TouchableOpacity
                      style={thisStyle.footerIcon1}
                      onPress={() => setSpotRestore()}
                    >
                      <Ionicons
                        name="md-refresh"
                        size={30}
                        color={COLOR.tintColor}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={thisStyle.footerIcon2}
                      onPress={() => setSpotDelete(item)}
                    >
                      <Ionicons
                        name="ios-close"
                        size={50}
                        color={COLOR.tintColor}
                      />
                    </TouchableOpacity>
                    {item.heart ? (
                      <TouchableOpacity
                        style={[
                          thisStyle.footerIcon2,
                          thisStyle.footerIconActive,
                        ]}
                        onPress={() => setSpotSelect(item)}
                      >
                        <FontAwesome5
                          name="heart"
                          size={5}
                          color={COLOR.greyColor}
                        />
                      </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                          style={thisStyle.footerIcon2}
                          onPress={() => setSpotSelect(item)}
                        >
                          <FontAwesome5
                            name="heart"
                            size={40}
                            color={COLOR.tintColor}
                          />
                        </TouchableOpacity>
                      )}
                    {item.like ? (
                      <TouchableOpacity
                        style={[
                          thisStyle.footerIcon1,
                          thisStyle.footerIconActive,
                        ]}
                        onPress={() => setSpotLike(item)}
                      >
                        <FontAwesome5
                          name="star"
                          size={30}
                          color={COLOR.greyColor}
                        />
                      </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                          style={thisStyle.footerIcon1}
                          onPress={() => setSpotLike(item)}
                        >
                          <FontAwesome5
                            name="star"
                            size={30}
                            color={COLOR.tintColor}
                          />
                        </TouchableOpacity>
                      )}
                  </CardItem>
                </Card>
              );
            }}
          ></DeckSwiper>
        </View>
      ) : null}
      <Footer style={thisStyle.touchable}>
        <Button
          buttonStyle={thisStyle.footerButton}
          title="保存して案内"
          onPress={onCompleteButtonPress}
        />
      </Footer>
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
              checked={spotChecked[index]}
              onPress={() => {
                const arrChecked = [...spotChecked];
                arrChecked[index] = !arrChecked[index];
                setSpotChecked(arrChecked);
              }}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </Overlay>
    </Container>
  );
};

export default SwipeSpotScreen;
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
    //marginTop: LAYOUT.window.height * 0.01,
    //marginBottom: LAYOUT.window.height * 0.01,
    height: LAYOUT.window.height * 0.1,
  },
  footerText: {
    textAlign: 'center',
  },
  footerIcon1: {
    backgroundColor: COLOR.greyColor,
    width: LAYOUT.window.width * 0.1,
    height: LAYOUT.window.width * 0.1,
    padding: 5,
    borderRadius: LAYOUT.window.width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: LAYOUT.window.width * 0.05,
    marginRight: LAYOUT.window.width * 0.05,
  },
  footerIcon2: {
    backgroundColor: COLOR.greyColor,
    width: LAYOUT.window.width * 0.13,
    height: LAYOUT.window.width * 0.13,
    padding: 5,
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
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLOR.backgroundColor,
    height: LAYOUT.window.height * 0.07,
    padding: 0,
    marginBottom: 0,
    marginTop: 0,
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
