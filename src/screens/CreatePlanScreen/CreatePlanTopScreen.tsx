import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { Text } from "native-base";

// from app
import { useDispatch } from "app/src/Store";
import { ActionType } from "app/src/Reducer";
import { COLOR } from "app/src/constants";
import { SelectButton, CompleteFooterButton } from "app/src/components/Button";
import { DatePicker } from "app/src/components/Form";
import { getToday } from "app/src/utils";
import { appStyle } from "app/src/styles";

/**
 * デートプラン作成画面トップ(基本情報入力画面)
 * @author kotatanaka
 */
const CreatePlanTopScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const [date, setDate] = useState<string>("");
  const [car, setCar] = useState<boolean>(false);
  const [train, setTrain] = useState<boolean>(false);
  const [bus, setBus] = useState<boolean>(false);
  const [walk, setWalk] = useState<boolean>(false);

  const onCompleteButtonPress = () => {
    setCreatePlan();
    navigate("map");
  };

  /** デート予定日と交通手段を永続化 */
  const setCreatePlan = () => {
    var transportationList = new Array();
    if (car) transportationList.push("car");
    if (train) transportationList.push("train");
    if (bus) transportationList.push("bus");
    if (walk) transportationList.push("walk");

    dispatch({
      type: ActionType.SET_CREATE_PLAN,
      payload: {
        date: date,
        trasportations: transportationList
      }
    });
  };

  /** 移動手段選択ボタンを描画する */
  const renderTransportationButtonGroup = () => {
    return (
      <View style={thisStyle.formGroup}>
        <Text style={thisStyle.itemTitleText}>移動手段</Text>
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
      <View style={thisStyle.formGroup}>
        <Text style={thisStyle.itemTitleText}>デート予定日</Text>
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

/** スタイリング */
const thisStyle = StyleSheet.create({
  formGroup: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row"
  },
  itemTitleText: {
    color: COLOR.textTintColor,
    fontFamily: "genju-medium",
    marginRight: 10
  }
});

export default CreatePlanTopScreen;