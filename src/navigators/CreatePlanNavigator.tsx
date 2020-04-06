import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// from app
import CreatePlanTopScreen from 'app/src/screens/CreatePlanScreen/CreatePlanTopScreen';
import SearchMapScreen from 'app/src/screens/CreatePlanScreen/SearchMapScreen';
import SwipeSpotScreen from 'app/src/screens/CreatePlanScreen/SwipeSpotScreen';
import SelectSpotScreen from 'app/src/screens/CreatePlanScreen/SelectSpotScreen';
import ArrangeRouteScreen from 'app/src/screens/CreatePlanScreen/ArrangeRouteScreen';
import CompletePlanScreen from 'app/src/screens/CreatePlanScreen/CompletePlanScreen';
import PlanDetailScreen from 'app/src/screens/PlanScreen/PlanDetailScreen';
import HomeScreen from 'app/src/screens/PlanScreen/HomeScreen';

const CreatePlanStack = createStackNavigator();

/** プラン作成画面のナビゲーター */
const CreatePlanNavigator: React.FC = () => (
  <CreatePlanStack.Navigator>
    <CreatePlanStack.Screen
      name="BaseInfo"
      component={CreatePlanTopScreen}
      options={{ title: 'プラン作成' }}
    />
    <CreatePlanStack.Screen
      name="Map"
      component={SearchMapScreen}
      options={{ title: '範囲指定' }}
    />
    <CreatePlanStack.Screen
      name="Flick"
      component={SwipeSpotScreen}
      options={{ title: 'スポットスワイプ' }}
    />
    <CreatePlanStack.Screen
      name="Select"
      component={SelectSpotScreen}
      options={{ title: '選択と削除' }}
    />
    <CreatePlanStack.Screen
      name="Arrange"
      component={ArrangeRouteScreen}
      options={{ title: '入れ替え' }}
    />
    <CreatePlanStack.Screen
      name="Complete"
      component={CompletePlanScreen}
      options={{ title: '完成！' }}
    />
    <CreatePlanStack.Screen
      name="Plan"
      component={PlanDetailScreen}
      options={{ title: 'プラン詳細' }}
    />
    <CreatePlanStack.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: 'ホーム' }}
    />
  </CreatePlanStack.Navigator>
);

export default CreatePlanNavigator;
