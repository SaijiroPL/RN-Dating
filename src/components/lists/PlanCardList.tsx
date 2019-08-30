import React from "react";
import { FlatList } from "react-native";

// from app
import { Plan } from "app/src/types/api/TPlan";
import PlanCard from "app/src/components/elements/PlanCard";

interface Props {
  planList: Array<Plan>;
  myPlan?: boolean;
}

/**
 * デートプランリストコンポーネント
 * @author kotatanaka
 */
const PlanCardList: React.FC<Props> = (props: Props) => {
  const { planList, myPlan } = props;

  const renderPlanCard = ({ item }: { item: Plan }) => {
    if (myPlan) {
      return <PlanCard plan={item} myPlan />;
    }
    return <PlanCard plan={item} />;
  };

  return (
    <FlatList
      data={planList}
      renderItem={renderPlanCard}
      keyExtractor={item => item.plan_id}
    />
  );
};

export default PlanCardList;
