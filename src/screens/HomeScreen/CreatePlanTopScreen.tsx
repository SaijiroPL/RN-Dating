import React, { useState } from "react";
import { View } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { Button, Text } from "native-base";

// from app
import DatePicker from "app/src/components/contents/DatePicker";
import CompleteFooterButton from "app/src/components/buttons/CompleteFooterButton";
import { getToday } from "app/src/utils/DateUtil";
import appStyle from "app/src/styles/general-style";
import { createPlanTopScreenStyle } from "app/src/styles/create-screen-style";

/**
 * デートプラン作成画面トップ(基本情報入力画面)
 * @author kotatanaka
 */
const CreatePlanTopScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const [date, setDate] = useState("");
  const [car, setCar] = useState(false);
  const [train, setTrain] = useState(false);
  const [bus, setBus] = useState(false);
  const [walk, setWalk] = useState(false);

  const onCompleteButtonPress = () => {
    navigate("map", { trasportation: getTransportationList() });
  };

  /**
   * 移動手段リストを生成する
   * @return 移動手段リスト
   */
  const getTransportationList = () => {
    var transportationList = new Array();
    if (car) transportationList.push("car");
    if (train) transportationList.push("train");
    if (bus) transportationList.push("bus");
    if (walk) transportationList.push("walk");
    return transportationList;
  };

  /**
   * 移動手段ボタンの一つを描画する
   * @param value state
   * @param setValue state更新関数
   * @param buttonName ボタン表示名
   */
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
          style={createPlanTopScreenStyle.selectButtonInactive}
          onPress={() => setValue(true)}
        >
          <Text style={createPlanTopScreenStyle.selectButtonInactiveText}>
            {buttonName}
          </Text>
        </Button>
      );
    } else {
      return (
        <Button
          small
          style={createPlanTopScreenStyle.selectButtonActive}
          onPress={() => setValue(false)}
        >
          <Text style={createPlanTopScreenStyle.selectButtonActiveText}>
            {buttonName}
          </Text>
        </Button>
      );
    }
  };

  /** 移動手段選択ボタンを描画する */
  const renderTransportationButtonGroup = () => {
    return (
      <View style={createPlanTopScreenStyle.formGroup}>
        <Text style={createPlanTopScreenStyle.itemTitleText}>移動手段</Text>
        {renderTransportatoinButton(car, setCar, "車")}
        {renderTransportatoinButton(train, setTrain, "電車")}
        {renderTransportatoinButton(bus, setBus, "バス")}
        {renderTransportatoinButton(walk, setWalk, "徒歩")}
      </View>
    );
  };

  /** 日付選択フォームを描画する */
  // FIXME 日付を選択するとエラー NativeBaseじゃないDatePickerにする?
  const renderDatePicker = () => {
    return (
      <View style={createPlanTopScreenStyle.formGroup}>
        <Text style={createPlanTopScreenStyle.itemTitleText}>デート予定日</Text>
        <DatePicker date={date} setDate={setDate} minDate={getToday()} />
      </View>
    );
  };

  const renderCompleteButton = () => {
    if (date == "" || (!car && !train && !bus && !walk)) {
      return <CompleteFooterButton title="次へ" disabled />;
    } else {
      return (
        <CompleteFooterButton title="次へ" onPress={onCompleteButtonPress} />
      );
    }
  };

  return (
    <View style={appStyle.standardContainer}>
      <View style={appStyle.emptySpace} />
      {renderDatePicker()}
      {renderTransportationButtonGroup()}
      <View style={appStyle.emptySpace} />
      {renderCompleteButton()}
    </View>
  );
};

export default CreatePlanTopScreen;
