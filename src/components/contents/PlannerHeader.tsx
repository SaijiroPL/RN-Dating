import React from "react";
import { View } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { Thumbnail, Text } from "native-base";

// from app
import { Planner } from "app/src/types/TPlanner";
import Images from "app/src/constants/Images";
import { plannerHeaderStyle } from "app/src/styles/common-component-style";

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
    <View style={plannerHeaderStyle.container}>
      <View style={plannerHeaderStyle.thumbnail}>
        <Thumbnail source={Images.noUserImage} />
      </View>
      <View style={plannerHeaderStyle.planner}>
        <Text style={plannerHeaderStyle.nameText} onPress={onPress}>
          {planner.userName}
        </Text>
        <Text note style={plannerHeaderStyle.attrText}>
          {planner.userAttr}
        </Text>
      </View>
    </View>
  );
};

export default PlannerHeader;
