import React from 'react';
import { FlatList } from 'react-native';

// from app
import { IPlan } from 'app/src/interfaces/api/Plan';
import { RefreshSpinner } from 'app/src/components/Spinners';
import { PlanCard } from 'app/src/components/Element';

interface Props {
  planList: Array<IPlan>;
  myPlan?: boolean;
  isRefreshing: boolean;
  onRefresh: () => Promise<void>;
}

/**
 * デートプランリストコンポーネント
 * @author kotatanaka
 */
export const PlanCardList: React.FC<Props> = (props: Props) => {
  const { planList, myPlan, isRefreshing, onRefresh } = props;

  const renderPlanCard = ({ item }: { item: IPlan }): JSX.Element => {
    if (myPlan) {
      return <PlanCard plan={item} myPlan />;
    }

    return <PlanCard plan={item} />;
  };

  return (
    <FlatList
      data={planList}
      renderItem={renderPlanCard}
      refreshControl={RefreshSpinner(isRefreshing, onRefresh)}
      keyExtractor={(item) => item.plan_id}
    />
  );
};
