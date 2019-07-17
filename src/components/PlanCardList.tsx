import React, { FC } from "react";
import { FlatList } from "react-native";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";

// from app
import { Plan } from "app/src/constants/interfaces";
import PlanCard from "app/src/components/PlanCard";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  planList: Array<Plan>;
}

/**
 * デートプランリストコンポーネント
 * @author kotatanaka
 */
const PlanCardList: FC<Props> = ({ navigation, planList }) => {
  const renderPlanList = ({ item }: { item: Plan }) => {
    return <PlanCard navigation={navigation} plan={item} />;
  };

  return (
    <FlatList
      data={planList}
      renderItem={renderPlanList}
      keyExtractor={item => item.plan_id}
    />
  );
};

export default PlanCardList;
