import React from "react";
import { Image } from "react-native";
import { DeckSwiper, Card, CardItem, Text, Left, Body } from "native-base";
import MapView from "react-native-maps";
import { AntDesign } from "@expo/vector-icons";

// from app
import { CandidateSpot } from "app/src/types/api/TSpot";
import Images from "app/src/constants/Images";

interface Props {
  spots: Array<CandidateSpot>;
}

/**
 * デートスポットスワイパー
 * @author kotatanaka
 */
const SpotSwiper: React.FC<Props> = (props: Props) => {
  return (
    <DeckSwiper
      dataSource={props.spots}
      renderItem={(item: CandidateSpot) => (
        <Card style={{ elevation: 3 }}>
          <CardItem>
            <Left>
              <Body>
                <Text>{item.spotName}</Text>
                <Text note>{item.address}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            {/* FIXME 当該スポットの画像表示 */}
            <Image style={{ height: 200, flex: 1 }} source={Images.noImage} />
          </CardItem>
          <CardItem cardBody>
            <MapView
              region={{
                latitude: item.latitude,
                longitude: item.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.05
              }}
              style={{ height: 200, flex: 1 }}
            />
          </CardItem>
          <CardItem>
            <AntDesign name="heart" style={{ color: "red" }} />
            <Text>{item.description}</Text>
          </CardItem>
        </Card>
      )}
    />
  );
};

export default SpotSwiper;
