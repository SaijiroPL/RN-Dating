import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {
  Body,
  Card,
  CardItem,
  Text,
  Button,
  Left,
  Right,
  Thumbnail,
} from 'native-base';
// from app
import { useGlobalState } from 'app/src/Store';
import { LoadingSpinner } from 'app/src/components/Spinners';
import { UserProfile } from 'app/src/components/Content';
import { SettingFab } from 'app/src/components/Button';
import {
  useGetUserDetail,
  useGetPlanList,
  useUploadImage,
} from 'app/src/hooks';
import MapView from 'react-native-maps';
import { COLOR, LAYOUT } from 'app/src/constants';
import {
  FontAwesome,
  FontAwesome5,
  SimpleLineIcons,
  Entypo,
} from '@expo/vector-icons';
/** マイプロフィール画面 */
const MyProfileScreen: React.FC = () => {
  /** ログイン中のユーザー */
  const loginUser = useGlobalState('loginUser');

  /** ユーザー詳細取得 */
  const { isUserLoading, user, getUserDetail } = useGetUserDetail(
    loginUser.id,
    loginUser.id,
  );

  /** デートプラン取得 */
  const { plans, isPlanListLoading, isRefreshing, onRefresh } = useGetPlanList(
    loginUser.id,
  );

  /** 画像選択アップロード */
  const { image, pickImage } = useUploadImage();

  // ローディング
  if (isUserLoading || isPlanListLoading) {
    return LoadingSpinner;
  }

  const PlannerHeader = (
    <CardItem>
      <Left style={thisStyle.planner}>
        <Thumbnail
          source={{ uri: 'https://www.w3schools.com/howto/img_avatar.png' }}
          small
        />
        <Body style={thisStyle.body}>
          <Text style={(thisStyle.mainText, [{ fontSize: 18 }])}>花子</Text>
          <Text note style={(thisStyle.mainText, [{ marginLeft: 10 }])}>
            habako.des
          </Text>
        </Body>
      </Left>
      <Right style={{ zIndex: 100 }}>
        <Entypo name="triangle-down" size={30} color={COLOR.tintColor} />
      </Right>
    </CardItem>
  );

  return (
    <View style={[{ padding: 20 }]}>
      <UserProfile
        user={user}
        me
        image={image}
        pickImage={pickImage}
        reload={getUserDetail}
      />
      <Card style={thisStyle.card}>
        {PlannerHeader}
        <CardItem cardBody>
          <Image
            source={{
              uri:
                'https://i.pinimg.com/originals/5b/55/88/5b5588af841070a2284ea76e2042dd9d.jpg',
            }}
            style={thisStyle.image}
          />
        </CardItem>
        <CardItem cardBody>
          <MapView
            region={{
              latitude: 35.658606737323325,
              longitude: 139.69814462256613,
              latitudeDelta: 0.02,
              longitudeDelta: 0.05,
            }}
            style={thisStyle.map}
          />
        </CardItem>
      </Card>
      <SettingFab />
    </View>
  );
};
const thisStyle = StyleSheet.create({
  card: {
    borderRadius: 10,
    shadowColor: '#ccc',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  planner: {
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    height: LAYOUT.window.height * 0.18,
  },
  map: {
    flex: 1,
    height: LAYOUT.window.height * 0.2,
  },
  description: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    borderBottomColor: COLOR.greyColor,
    borderBottomWidth: 1,
  },
  linkButtonGroup: {
    // backgroundColor: COLOR.baseBackgroundColor,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 0,
    marginBottom: 10,
  },
  linkButton: {
    flex: 1,
    justifyContent: 'center',
  },
  mainText: {
    fontFamily: 'genju-medium',
    fontSize: 14,
  },
  footerText: {
    fontFamily: 'genju-medium',
    fontSize: 10,
  },
  descriptionText: {
    fontFamily: 'genju-light',
    fontSize: 12,
  },
  linkButtonText: {
    color: COLOR.tintColor,
    fontSize: 15,
  },
  body: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  bodylike: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  likebutton: {
    padding: 5,
  },
  footer: {
    paddingLeft: 0,
  },
});

export default MyProfileScreen;
