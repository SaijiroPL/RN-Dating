import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, ScrollView } from 'react-native';
import { Text } from 'native-base';
import { Button } from 'react-native-elements';
// from app
import { useGlobalState } from 'app/src/Store';
import { LAYOUT, COLOR } from 'app/src/constants';
import { LoadingSpinner } from 'app/src/components/Spinners';
import { useGooglePlace, useGetPlanDetail } from 'app/src/hooks';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { ISpotFull } from 'app/src/interfaces/api/Plan';

/** マイプラン画面 */
const MyPlanRoadScreen: React.FC = () => {
  const { navigate } = useNavigation();

  const loginUser = useGlobalState('loginUser');
  const myPlan = useGlobalState('myPlan');
  const myPlanArrival = useGlobalState('myPlanArrival');
  const { isPlanLoading, plan, getPlanDetail } = useGetPlanDetail(
    myPlan.plan_id,
    loginUser.id,
  );
  const { getDirectionByLocation, API_KEY } = useGooglePlace();

  const [duration, setDuration] = useState(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    getPlanDetail();
  }, []);

  useEffect(() => {
    async function calcCost() {
      const currentSpot = plan.spots[myPlanArrival];
      const goalSpot = plan.spots[myPlanArrival + 1];
      const result = await getDirectionByLocation(
        `${currentSpot.latitude},${currentSpot.longitude}`,
        `${goalSpot.latitude},${goalSpot.longitude}`,
        plan.transportation[0] === 'car' ? 'driving' : 'transit',
      );
      setDuration(Math.round(result.routes[0].legs[0].duration.value / 60));
      setDistance(result.routes[0].legs[0].distance.value);
    }
    if (!isPlanLoading) calcCost();
  }, [myPlanArrival, isPlanLoading]);

  // const angle = useMemo(() => {
  //   if (plan) {
  //     const currentSpot = plan.spots[myPlanArrival];
  //     const goalSpot = plan.spots[myPlanArrival + 1];

  //     if (currentSpot && goalSpot)
  //       return Math.atan(
  //         (goalSpot.longitude - currentSpot.longitude) /
  //           (goalSpot.latitude - currentSpot.latitude),
  //       );
  //   }

  //   return 0;
  // }, [plan, myPlanArrival]);

  const renderPath = (index: number) =>
    index < plan.spots.length - 1 ? (
      <MapViewDirections
        origin={{
          latitude: plan.spots[index].latitude,
          longitude: plan.spots[index].longitude,
        }}
        destination={{
          latitude: plan.spots[index + 1].latitude,
          longitude: plan.spots[index + 1].longitude,
        }}
        apikey={`${API_KEY}`}
        strokeWidth={3}
        strokeColor={index < myPlanArrival ? 'orange' : '#aaa'}
      />
    ) : null;

  const renderMarker = (place: ISpotFull, index: number) => {
    return (
      <Marker
        coordinate={{
          latitude: place.latitude,
          longitude: place.longitude,
        }}
        pinColor={index === myPlanArrival ? 'green' : 'orange'}
        key={index}
      />
    );
  };

  const nextSpot = () => {
    // if (currentSpotIndex >= myPlan.spots.length - 2) return;
    // setCurrentSpotIndex((prev) => prev + 1);
    navigate('Arrival');
  };

  if (isPlanLoading) {
    return LoadingSpinner;
  }

  const formatDistance = () =>
    distance > 1000 ? `${(distance / 1000).toFixed(1)}km` : `${distance}m`;

  const formatDuration = () =>
    duration > 60
      ? `${Math.floor(duration / 60)}時間${duration % 60}分`
      : `${duration}分`;

  return (
    <ScrollView contentContainerStyle={thisStyle.container}>
      <View
        style={{
          height: LAYOUT.window.height * 0.6,
          borderColor: COLOR.textTintColor,
          borderWidth: 1,
          borderRadius: 5,
          padding: 1,
        }}
      >
        <MapView
          initialRegion={{
            latitude: plan.spots[myPlanArrival].latitude,
            longitude: plan.spots[myPlanArrival].longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          style={{ height: '100%' }}
        >
          {plan.spots.map((item, index) => renderPath(index))}
          {plan.spots.map((item, index) => renderMarker(item, index))}
        </MapView>
      </View>
      <View style={thisStyle.button1}>
        <Button
          title={plan.spots[myPlanArrival].spot_name}
          buttonStyle={thisStyle.button}
          titleStyle={thisStyle.buttonTitleStyle}
        />
        <View style={thisStyle.arrowH}>
          <Image
            source={{
              uri:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRVbkaeXBBNOql9vZkRpEznnzyfswHuq9xRjQ&usqp=CAU',
            }}
            style={thisStyle.arrowHImg}
          />
        </View>
        <Button
          buttonStyle={thisStyle.button}
          title={plan.spots[myPlanArrival + 1].spot_name}
          titleStyle={thisStyle.buttonTitleStyle}
        />
      </View>
      <View style={thisStyle.emptySpace}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: LAYOUT.window.width * 0.3,
          }}
        >
          <Text style={thisStyle.itemTitleText}>次の地点まであと</Text>
          <Text style={thisStyle.itemTitleText}>
            {formatDistance()} {formatDuration()}
          </Text>
        </View>
        <View
          style={{
            width: LAYOUT.window.width * 0.45,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexDirection: 'row',
          }}
        >
          <FontAwesome5 name="arrow-up" size={20} color={COLOR.textTintColor} />
          <Text style={thisStyle.text2}>北へ淮む</Text>
        </View>
        <Button
          onPress={nextSpot}
          buttonStyle={[
            thisStyle.button,
            { width: LAYOUT.window.width * 0.15 },
          ]}
          title="到着"
          titleStyle={thisStyle.buttonTitleStyle}
        />
      </View>
    </ScrollView>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  container: {
    backgroundColor: COLOR.backgroundColor,
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 20,
  },
  footerIcon1: {
    backgroundColor: 'white',
    width: LAYOUT.window.width * 0.1,
    height: LAYOUT.window.width * 0.1,
    padding: 10,
    borderRadius: LAYOUT.window.width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: LAYOUT.window.height * 0.6,
    left: LAYOUT.window.width * 0.8,
  },
  arrowH: {
    flexDirection: 'column',
    width: LAYOUT.window.width * 0.3,
    alignItems: 'center',
  },
  arrowHImg: {
    height: 20,
    width: '90%',
  },
  button1: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    // marginBottom: 5,
    // padding: 15,
  },
  text2: {
    color: COLOR.textTintColor,
    fontSize: 14,
  },
  button: {
    backgroundColor: COLOR.tintColor,
    width: LAYOUT.window.width * 0.3,
    borderRadius: 10,
    fontSize: 12,
  },
  columnTitle: {
    backgroundColor: COLOR.tintColor,
    borderRadius: 10,
    padding: 5,
    height: LAYOUT.window.height * 0.03,
    width: LAYOUT.window.width * 0.25,
    alignItems: 'center',
  },
  columnTitleText: {
    color: 'white',
    fontFamily: 'genju-medium',
    fontSize: 12,
  },
  emptySpace: {
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    // padding: 5,
  },
  itemTitleText: {
    color: COLOR.textTintColor,
    fontFamily: 'genju-medium',
    fontSize: 12,
    marginRight: 10,
  },
  buttonTitleStyle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default MyPlanRoadScreen;
