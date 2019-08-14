import React from "react";
import { View } from "react-native";
import { useNavigation } from "react-navigation-hooks";

// from app
import CompleteButton from "app/src/components/buttons/CompleteButton";
import { createPlanStyle } from "app/src/styles/home-screen-style";

/**
 * マップからスポット範囲指定画面
 */
const SearchMapScreen: React.FC = () => {
  const { navigate } = useNavigation();

  const onCompleteButtonPress = () => {
    navigate("flick");
  };

  return (
    <View style={createPlanStyle.container}>
      <CompleteButton title="決定" onPress={onCompleteButtonPress} />
    </View>
  );
};

export default SearchMapScreen;
