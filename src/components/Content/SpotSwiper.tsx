import React, { useCallback, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import {
  DeckSwiper,
  Card,
  CardItem,
  Content,
  Text,
  Left,
  Body,
  Right,
  Button,
} from 'native-base';
import MapView from 'react-native-maps';
import {
  FontAwesome,
  FontAwesome5,
  Entypo,
  Ionicons,
} from '@expo/vector-icons';

// from app
import { IMAGE } from 'app/src/constants';
import { ICandidateSpot } from 'app/src/interfaces/app/Spot';
import { LAYOUT, COLOR } from 'app/src/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  spots: Array<ICandidateSpot>;
}

/** デートスポットスワイパー */
export const SpotSwiper: React.FC<Props> = (props: Props) => {
  const { spots } = props;
  const [heart, setHeart] = useState<boolean>(false);
  const [star, setStar] = useState<boolean>(false);
  const [comment, setComment] = useState<boolean>(false);

  const [footerRefresh, setFooterRefresh] = useState<boolean>(false);
  const [footerClose, setFooterClose] = useState<boolean>(false);
  const [footerHeart, setFooterHeart] = useState<boolean>(false);
  const [footerStar, setFooterStar] = useState<boolean>(false);

  const PlannerLike = (
    <Body style={thisStyle.bodylike}>
      <Button
        style={thisStyle.likebutton}
        transparent
        onPress={() => setHeart(!heart)}
      >
        {heart ? (
          <FontAwesome5 name="heart" size={24} color={COLOR.tintColor} />
        ) : (
          <FontAwesome5 name="heart" size={24} color={COLOR.greyColor} />
        )}
      </Button>
      <Button
        style={thisStyle.likebutton}
        transparent
        onPress={() => setStar(!star)}
      >
        {star ? (
          <Entypo name="star-outlined" size={24} color={COLOR.tintColor} />
        ) : (
          <Entypo name="star-outlined" size={24} color={COLOR.greyColor} />
        )}
      </Button>
      <Button
        style={thisStyle.likebutton}
        transparent
        onPress={() => setComment(!comment)}
      >
        {comment ? (
          <FontAwesome name="comment-o" size={24} color={COLOR.tintColor} />
        ) : (
          <FontAwesome name="comment-o" size={24} color={COLOR.greyColor} />
        )}
      </Button>
    </Body>
  );
  return (
    <Content style={thisStyle.swiper}>
      <View>
        <DeckSwiper
          dataSource={spots}
          renderItem={(item: ICandidateSpot) => (
            <Image
              style={{ height: LAYOUT.window.height * 0.3 }}
              source={{ uri: item.imageUrl }}
            />
          )}
        />
        <View style={{ height: LAYOUT.window.height * 0.3 }}></View>
        <View
          style={{
            height: LAYOUT.window.height * 0.1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'column',
              width: LAYOUT.window.width * 0.7,
            }}
          >
            <Text note style={thisStyle.centerText}>
              {spots[0].spotName}
            </Text>
            <Text note style={thisStyle.centerText}>
              {spots[0].description}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              width: LAYOUT.window.width * 0.3,
              paddingRight: 50,
            }}
          >
            <View style={{ height: LAYOUT.window.height * 0.04 }}>
              {PlannerLike}
            </View>
            <Text note style={thisStyle.footerText}>
              {spots[0].address}
            </Text>
          </View>
        </View>
        <MapView
          region={{
            latitude: spots[0].latitude,
            longitude: spots[0].longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.05,
          }}
          style={{ height: LAYOUT.window.height * 0.3 }}
        />
        <View style={thisStyle.footer}>
          {footerRefresh ? (
            <TouchableOpacity
              style={[thisStyle.footerIcon1, thisStyle.footerIconActive]}
              onPress={() => setFooterRefresh(!footerRefresh)}
            >
              <Ionicons name="md-refresh" size={30} color={COLOR.greyColor} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={thisStyle.footerIcon1}
              onPress={() => setFooterRefresh(!footerRefresh)}
            >
              <Ionicons
                name="md-refresh"
                size={30}
                color={COLOR.tintColor}
                onPress={() => setFooterRefresh(!footerRefresh)}
              />
            </TouchableOpacity>
          )}
          {footerClose ? (
            <TouchableOpacity
              style={[thisStyle.footerIcon2, thisStyle.footerIconActive]}
              onPress={() => setFooterClose(!footerClose)}
            >
              <Ionicons name="ios-close" size={50} color={COLOR.greyColor} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={thisStyle.footerIcon2}
              onPress={() => setFooterClose(!footerClose)}
            >
              <Ionicons name="ios-close" size={50} color={COLOR.tintColor} />
            </TouchableOpacity>
          )}
          {footerHeart ? (
            <TouchableOpacity
              style={[thisStyle.footerIcon2, thisStyle.footerIconActive]}
              onPress={() => setFooterHeart(!footerHeart)}
            >
              <FontAwesome5 name="heart" size={40} color={COLOR.greyColor} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={thisStyle.footerIcon2}
              onPress={() => setFooterHeart(!footerHeart)}
            >
              <FontAwesome5 name="heart" size={40} color={COLOR.tintColor} />
            </TouchableOpacity>
          )}
          {footerStar ? (
            <TouchableOpacity
              style={[thisStyle.footerIcon1, thisStyle.footerIconActive]}
              onPress={() => setFooterStar(!footerStar)}
            >
              <FontAwesome5 name="star" size={30} color={COLOR.greyColor} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={thisStyle.footerIcon1}
              onPress={() => setFooterStar(!footerStar)}
            >
              <FontAwesome5 name="star" size={30} color={COLOR.tintColor} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Content>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
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
    alignItems: 'flex-end',
    marginTop: LAYOUT.window.height * 0.015,
  },
  footerIcon1: {
    backgroundColor: COLOR.greyColor,
    width: LAYOUT.window.width * 0.1,
    height: LAYOUT.window.width * 0.1,
    padding: 10,
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
    padding: 10,
    borderRadius: LAYOUT.window.width * 0.13,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: LAYOUT.window.width * 0.05,
    marginRight: LAYOUT.window.width * 0.05,
  },
  footerIconActive: {
    backgroundColor: COLOR.tintColor,
  },
});
