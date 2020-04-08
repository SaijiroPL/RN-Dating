import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Thumbnail, Text } from 'native-base';

// from app
import { COLOR, IMAGE } from 'app/src/constants';
import { IUserDetail } from 'app/src/interfaces/api/User';
import { ImagePickerButton, FollowButton } from 'app/src/components/Button';
import { appTextStyle } from 'app/src/styles';

interface Props {
  user: IUserDetail;
  me?: boolean;
  image?: any;
  pickImage?: () => Promise<void>;
  follow?: (id: string) => Promise<boolean>;
  unfollow?: (id: string) => Promise<boolean>;
  reload: () => Promise<void>;
}

/**
 * ユーザー情報コンポーネント
 * @author kotatanaka
 */
export const UserProfile: React.FC<Props> = (props: Props) => {
  const { navigate } = useNavigation();
  const { user, me, image, pickImage, follow, unfollow, reload } = props;

  /** フォロー数押下時の処理 */
  const onFollowPress = useCallback(() => {
    navigate(me ? 'MyFollow' : 'Follow', { userId: user.user_id });
  }, [me, user]);

  /** フォロワー数押下時の処理 */
  const onFollowerPress = useCallback(() => {
    navigate(me ? 'MyFollower' : 'Follower', { userId: user.user_id });
  }, [me, user]);

  /** プラン数押下時の処理 */
  const onPlanPress = useCallback(() => {
    navigate('MyPlan');
  }, []);

  return (
    <View style={thisStyle.container}>
      <Thumbnail large source={image ? { uri: image } : IMAGE.noUserImage} />
      {me && pickImage && <ImagePickerButton pickImage={pickImage} />}
      <View style={thisStyle.userInfoContainer}>
        <Text style={thisStyle.nameText}>{user.name}</Text>
        <Text note style={thisStyle.nameText}>
          @{user.user_id}
        </Text>
      </View>
      <View style={thisStyle.countContainer}>
        <View style={thisStyle.countItem}>
          <Text style={thisStyle.countTitleText}>プラン数</Text>
          <Text style={appTextStyle.countText} onPress={onPlanPress}>
            {user.plan_count}
          </Text>
        </View>
        <View style={thisStyle.countItem}>
          <Text style={thisStyle.countTitleText}>フォロー</Text>
          <Text style={appTextStyle.countText} onPress={onFollowPress}>
            {user.follow_count}
          </Text>
        </View>
        <View style={thisStyle.countItem}>
          <Text style={thisStyle.countTitleText}>フォロワー</Text>
          <Text style={appTextStyle.countText} onPress={onFollowerPress}>
            {user.follower_count}
          </Text>
        </View>
      </View>
      {!me && follow && unfollow && (
        <View style={thisStyle.followContainer}>
          <FollowButton
            targetUserId={user.user_id}
            followed={user.is_follow}
            onFollow={follow}
            onUnfollow={unfollow}
            reload={reload}
          />
        </View>
      )}
    </View>
  );
};

/** デフォルト値 */
UserProfile.defaultProps = {
  me: false,
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  userInfoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  countContainer: {
    alignContent: 'space-around',
    flexDirection: 'row',
  },
  followContainer: {
    marginBottom: 10,
    marginTop: 10,
  },
  countItem: {
    alignItems: 'center',
    flexDirection: 'column',
    margin: 10,
  },
  nameText: {
    color: COLOR.textTintColor,
    fontFamily: 'genju-medium',
    marginTop: 5,
  },
  countTitleText: {
    color: COLOR.textTintColor,
    fontFamily: 'genju-light',
    fontSize: 15,
  },
});
