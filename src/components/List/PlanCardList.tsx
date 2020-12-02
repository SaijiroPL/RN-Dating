import React from 'react';
import { FlatList } from 'react-native';

// from app
import { IPlan } from 'app/src/interfaces/api/Plan';
import { RefreshSpinner } from 'app/src/components/Spinners';
import { PlanCard } from 'app/src/components/Element';

interface Props {
  planList: Array<IPlan>;
  liked?: boolean;
  isRefreshing: boolean;
  onRefresh: () => Promise<void>;
}

/** デートプランリスト */
export const PlanCardList: React.FC<Props> = (props: Props) => {
  const { planList, liked, isRefreshing, onRefresh } = props;

  const renderPlanCard = ({ item }: { item: IPlan }): JSX.Element => {
    return <PlanCard plan={item} liked={liked} />;
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

PlanCardList.defaultProps = {
  liked: false,
};
