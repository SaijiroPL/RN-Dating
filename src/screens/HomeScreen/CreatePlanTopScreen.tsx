import React, { useState } from "react";
import { View } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { Button, Text } from "native-base";

// from app
import CompleteButton from "app/src/components/buttons/CompleteButton";
import { createPlanStyle } from "app/src/styles/home-screen-style";

/**
 * デートプラン作成画面トップ(基本情報入力画面)
 * @author kotatanaka
 */
const CreatePlanTopScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const [car, setCar] = useState(false);
  const [train, setTrain] = useState(false);
  const [bus, setBus] = useState(false);
  const [walk, setWalk] = useState(false);

  const onCompleteButtonPress = () => {
    navigate("map", { trasportation: getTransportationList() });
  };

  /** 移動手段リストを生成する */
  const getTransportationList = () => {
    var transportationList = new Array();
    if (car) transportationList.push("car");
    if (train) transportationList.push("train");
    if (bus) transportationList.push("bus");
    if (walk) transportationList.push("walk");
    return transportationList;
  };

  /** 移動手段ボタンの一つを描画する */
  const renderTransportatoinButton = (
    value: boolean,
    setValue: React.Dispatch<React.SetStateAction<boolean>>,
    buttonName: string
  ) => {
    if (!value) {
      return (
        <Button
          small
          light
          style={createPlanStyle.selectButtonInactive}
          onPress={() => setValue(true)}
        >
          <Text style={createPlanStyle.selectButtonInactiveText}>
            {buttonName}
          </Text>
        </Button>
      );
    } else {
      return (
        <Button
          small
          style={createPlanStyle.selectButtonActive}
          onPress={() => setValue(false)}
        >
          <Text style={createPlanStyle.selectButtonActiveText}>
            {buttonName}
          </Text>
        </Button>
      );
    }
  };

  /** 移動手段選択ボタンを描画する */
  const renderTransportationButtonGroup = () => {
    return (
      <View style={createPlanStyle.selectButtonGroup}>
        <Text style={createPlanStyle.itemTitleText}>移動手段</Text>
        {renderTransportatoinButton(car, setCar, "車")}
        {renderTransportatoinButton(train, setTrain, "電車")}
        {renderTransportatoinButton(bus, setBus, "バス")}
        {renderTransportatoinButton(walk, setWalk, "徒歩")}
      </View>
    );
  };

  return (
    <View style={createPlanStyle.container}>
      {renderTransportationButtonGroup()}
      <CompleteButton title="決定" onPress={onCompleteButtonPress} />
    </View>
  );
};

export default CreatePlanTopScreen;
