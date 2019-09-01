import React, { useState } from "react";
import { View } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { Button, Text } from "native-base";

// from app
import SelectButton from "app/src/components/buttons/SelectButton";
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
  const [date, setDate] = useState<string>("");
  const [car, setCar] = useState<boolean>(false);
  const [train, setTrain] = useState<boolean>(false);
  const [bus, setBus] = useState<boolean>(false);
  const [walk, setWalk] = useState<boolean>(false);

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

  /** 移動手段選択ボタンを描画する */
  const renderTransportationButtonGroup = () => {
    return (
      <View style={createPlanTopScreenStyle.formGroup}>
        <Text style={createPlanTopScreenStyle.itemTitleText}>移動手段</Text>
        <SelectButton
          value={car}
          setValue={setCar}
          reversible
          buttonName={"車"}
        />
        <SelectButton
          value={train}
          setValue={setTrain}
          reversible
          buttonName={"電車"}
        />
        <SelectButton
          value={bus}
          setValue={setBus}
          reversible
          buttonName={"バス"}
        />
        <SelectButton
          value={walk}
          setValue={setWalk}
          reversible
          buttonName={"徒歩"}
        />
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
