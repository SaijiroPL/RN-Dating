import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// from app
import { COLOR } from 'app/src/constants';
import { LoadingSpinner } from 'app/src/components/Spinners';
import { PlanCardList } from 'app/src/components/List';
import { CreatePlanFab } from 'app/src/components/Button';
import { useGetPlanList } from 'app/src/hooks';
import { appTextStyle } from 'app/src/styles';

/** ホーム画面トップ */
const HomeScreen: React.FC = () => {
  /** デートプラン一覧取得 */
  const {
    isPlanListLoading,
    plans,
    isRefreshing,
    onRefresh,
  } = useGetPlanList();

  // temp plan data
  const temp_plans: any[] = [
    {
      plan_id: '1',
      title: 'plan1',
      description: 'i am description1',
      create_date: '2020-08-24',
      spots: [
        {
          spot_name: 'spot1',
          latitude: 35.658606737323325,
          longitude: 139.69814462256613,
        },
      ],
      user_id: '1',
      user_name: '花子',
      user_attr: 'habako.des',
      user_avatar: 'https://www.w3schools.com/howto/img_avatar.png',
      user_image_url:
        'https://i.pinimg.com/originals/5b/55/88/5b5588af841070a2284ea76e2042dd9d.jpg',
      like_count: 10,
      comment_count: 4,
    },
    {
      plan_id: '2',
      title: 'plan2',
      description: 'i am description1',
      create_date: '2020-08-24',
      spots: [
        {
          spot_name: 'spot2',
          latitude: 35.658606737323325,
          longitude: 139.69814462256613,
        },
      ],
      user_id: '2',
      user_name: '花子',
      user_attr: 'habako.des',
      user_avatar: 'https://www.w3schools.com/howto/img_avatar.png',
      user_image_url:
        'https://i.pinimg.com/originals/5b/55/88/5b5588af841070a2284ea76e2042dd9d.jpg',
      like_count: 10,
      comment_count: 4,
    },
    {
      plan_id: '3',
      title: 'plan3',
      description: 'i am description1',
      create_date: '2020-08-24',
      spots: [
        {
          spot_name: 'spot3',
          latitude: 35.658606737323325,
          longitude: 139.69814462256613,
        },
      ],
      user_id: '3',
      user_name: '花子',
      user_attr: 'habako.des',
      user_avatar: 'https://www.w3schools.com/howto/img_avatar.png',
      user_image_url:
        'https://i.pinimg.com/originals/5b/55/88/5b5588af841070a2284ea76e2042dd9d.jpg',
      like_count: 10,
      comment_count: 4,
    },
  ];

  /** ローディング */
  if (isPlanListLoading) {
    return LoadingSpinner;
  }

  return (
    <View style={thisStyle.container}>
      {/* <Text style={appTextStyle.countText}>
        デートプランの数: {plans.total}
      </Text> */}
      <PlanCardList
        // planList={plans.plan_list}
        planList={temp_plans}
        isRefreshing={isRefreshing}
        onRefresh={onRefresh}
      />
      <CreatePlanFab />
    </View>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  container: {
    backgroundColor: COLOR.backgroundColor,
    flex: 1,
    justifyContent: 'center',
  },
});

export default HomeScreen;
