import React from "react";
import { FlatList } from "react-native";

// from app
import { IPlan } from "app/src/interfaces/api/Plan";
import PlanCard from "app/src/components/elements/PlanCard";

interface Props {
  planList: Array<IPlan>;
  myPlan?: boolean;
}

/**
 * デートプランリストコンポーネント
 * @author kotatanaka
 */
export const PlanCardList: React.FC<Props> = (props: Props) => {
  const { planList, myPlan } = props;

  const renderPlanCard = ({ item }: { item: IPlan }) => {
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
