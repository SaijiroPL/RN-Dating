import React from "react";
import { Image, StyleSheet } from "react-native";
import {
  DeckSwiper,
  Card,
  CardItem,
  Content,
  Text,
  Left,
  Body
} from "native-base";
import MapView from "react-native-maps";
import { AntDesign } from "@expo/vector-icons";

// from app
import { IMAGE } from "app/src/constants";
import { ICandidateSpot } from "app/src/interfaces/Spot";

interface Props {
  spots: Array<ICandidateSpot>;
}

/**
 * デートスポットスワイパー
 * @author kotatanaka
 */
export const SpotSwiper: React.FC<Props> = (props: Props) => {
  const { spots } = props;

  return (
    <Content style={thisStyle.swiper}>
      <DeckSwiper
        dataSource={spots}
        renderItem={(item: ICandidateSpot) => (
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
              <Image style={{ height: 200, flex: 1 }} source={IMAGE.noImage} />
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
    </Content>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  swiper: {
    marginHorizontal: 10
  }
});
