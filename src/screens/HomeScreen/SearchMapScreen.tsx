import React, { useState } from "react";
import { View } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import MapView from "react-native-maps";

// from app
import { Location } from "app/src/types/TMap";
import CompleteButton from "app/src/components/buttons/CompleteButton";
import { mapViewStyle } from "app/src/styles/map-component-style";

const locationInitialRound = 700;

/**
 * マップからスポット範囲指定画面
 * @author kotatanaka
 */
const SearchMapScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const [location, setLocation] = useState<Location>({
    latitude: 35.658606737323325,
    longitude: 139.69814462256613,
    latitudeDelta: 0.038651027332100796,
    longitudeDelta: 0.02757163010454633
  });

  const onCompleteButtonPress = () => {
    navigate("flick");
  };

  return (
    <>
      <MapView
        testID="mapView"
        showsMyLocationButton={false}
        showsPointsOfInterest={false}
        showsCompass={false}
        showsScale={false}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={false}
        showsIndoorLevelPicker={false}
        toolbarEnabled={false}
        moveOnMarkerPress={false}
        style={mapViewStyle.container}
        initialRegion={location}
      >
        {/* TODO 完了ボタンを右下に配置したい */}
        <CompleteButton title="決定" onPress={onCompleteButtonPress} />
      </MapView>
      {/* TODO MapHeader */}
    </>
  );
};

export default SearchMapScreen;
