import React from "react";
import { FlatList } from "react-native";

// from app
import { Plan } from "app/src/constants/interfaces";
import PlanCard from "app/src/components/PlanCard";

interface Props {
  planList: Array<Plan>;
}

/**
 * デートプランリストコンポーネント
 * @author kotatanaka
 */
const PlanCardList: React.FC<Props> = ({ planList }) => {
  const renderPlanList = ({ item }: { item: Plan }) => {
    return <PlanCard plan={item} />;
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
