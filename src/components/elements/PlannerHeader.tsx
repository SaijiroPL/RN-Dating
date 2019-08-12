import React from "react";
import { useNavigation } from "react-navigation-hooks";
import { Thumbnail, Text, Left, Body } from "native-base";

// from app
import { Planner } from "app/src/types/TPlanner";
import Images from "app/src/constants/Images";
import { planStyle } from "app/src/styles/plan-component-style";

interface Props {
  planner: Planner;
}

/**
 * デートプラン作成者コンポーネント
 * @author kotatanaka
 */
const PlannerHeader: React.FC<Props> = ({ planner }) => {
  const { navigate } = useNavigation();

  return (
    <Left>
      <Thumbnail source={Images.noUserImage} />
      <Body>
        <Text style={planStyle.mainText}>{planner.userName}</Text>
        <Text note style={planStyle.mainText}>
          {planner.userAttr}
        </Text>
      </Body>
    </Left>
  );
};

export default PlannerHeader;
