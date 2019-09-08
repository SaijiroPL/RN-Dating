import React, { useState } from "react";
import { useNavigation } from "react-navigation-hooks";
import { Container } from "native-base";
import MapView from "react-native-maps";

// from app
import { ILocation } from "app/src/interfaces/Map";
import CompleteFooterButton from "app/src/components/buttons/CompleteFooterButton";
import { searchMapScreenStyle } from "app/src/styles/create-screen-style";

/**
 * マップからスポット範囲指定画面
 * @author kotatanaka
 */
const SearchMapScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const [location, setLocation] = useState<ILocation>({
    latitude: 35.658606737323325,
    longitude: 139.69814462256613,
    latitudeDelta: 0.038651027332100796,
    longitudeDelta: 0.02757163010454633
  });

  const onCompleteButtonPress = () => {
    navigate("flick");
  };

  return (
    <Container>
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
        style={searchMapScreenStyle.mapView}
        initialRegion={location}
      />
      {/* TODO MapHeader */}
      <CompleteFooterButton title="次へ" onPress={onCompleteButtonPress} />
    </Container>
  );
};

export default SearchMapScreen;
