import React from "react";
import { useNavigation } from "react-navigation-hooks";
import { Thumbnail, Text, Left, Body } from "native-base";

// from app
import { Planner } from "app/src/types/TPlanner";
import Images from "app/src/constants/Images";
import { planCardStyle } from "app/src/styles/common-component-style";

interface Props {
  planner: Planner;
}

/**
 * デートプラン作成者コンポーネント
 * @author kotatanaka
 */
const PlannerHeader: React.FC<Props> = ({ planner }) => {
  const { navigate } = useNavigation();

  const onPress = () => {
    navigate("profile", { id: planner.userId });
  };

  return (
    <Left>
      <Thumbnail source={Images.noUserImage} />
      <Body>
        <Text style={planCardStyle.mainText} onPress={onPress}>
          {planner.userName}
        </Text>
        <Text note style={planCardStyle.mainText}>
          {planner.userAttr}
        </Text>
      </Body>
    </Left>
  );
};

export default PlannerHeader;
