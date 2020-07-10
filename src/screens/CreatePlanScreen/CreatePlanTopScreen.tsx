import React, { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'native-base';

// from app
import { useDispatch } from 'app/src/Store';
import { ActionType } from 'app/src/Reducer';
import { COLOR } from 'app/src/constants';
import { SelectButton, SmallCompleteButton } from 'app/src/components/Button';
import { DateTimePickerLabel } from 'app/src/components/Form';
import { getToday } from 'app/src/utils';
import { appStyle } from 'app/src/styles';

/**
 * デートプラン作成画面トップ(基本情報入力画面)
 * @author kotatanaka
 */
const CreatePlanTopScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const [fromDate, updateFrom] = useState<string>('');
  const [toDate, updateTo] = useState<string>('');
  const [car, setCar] = useState<boolean>(false);
  const [train, setTrain] = useState<boolean>(false);
  const [bus, setBus] = useState<boolean>(false);
  const [walk, setWalk] = useState<boolean>(false);

  /** デート予定日と交通手段を永続化 */
  const setCreatePlan = useCallback(() => {
    const transportationList = [];
    if (car) transportationList.push('car');
    if (train) transportationList.push('train');
    if (bus) transportationList.push('bus');
    if (walk) transportationList.push('walk');

    dispatch({
      type: ActionType.SET_CREATE_PLAN,
      payload: {
        fromDate,
        trasportations: transportationList,
      },
    });
  }, [car, train, bus, walk, fromDate]);

  const onCompleteButtonPress = useCallback(() => {
    setCreatePlan();
    navigate('Map');
  }, [setCreatePlan]);

  /** 移動手段選択ボタン */
  const TransportationButtonGroup: JSX.Element = (
    <View style={thisStyle.formGroup}>
      <Text style={thisStyle.itemTitleText}>移動手段</Text>
      <SelectButton value={car} setValue={setCar} reversible buttonName="車" />
      <SelectButton
        value={train}
        setValue={setTrain}
        reversible
        buttonName="電車"
      />
      <SelectButton
        value={bus}
        setValue={setBus}
        reversible
        buttonName="バス"
      />
      <SelectButton
        value={walk}
        setValue={setWalk}
        reversible
        buttonName="徒歩"
      />
    </View>
  );

  return (
    <View style={appStyle.standardContainer}>
      <View style={appStyle.emptySpace} />
      <View style={thisStyle.dateGroup}>
        <View style={thisStyle.dateView}>
          <Text style={thisStyle.itemTitleText}>開始予定時間日時</Text>
          <DateTimePickerLabel
            date={fromDate}
            setDate={updateFrom}
            minDate={getToday()}
          />
        </View>
        <Text style={thisStyle.dateView}>→</Text>
        <View style={thisStyle.dateView}>
          <Text style={thisStyle.itemTitleText}>終了予定時間日時</Text>
          <DateTimePickerLabel
            date={toDate}
            setDate={updateTo}
            minDate={getToday()}
          />
        </View>
      </View>
      {TransportationButtonGroup}
      <View style={appStyle.emptySpace} />
      {fromDate === '' || (!car && !train && !bus && !walk) ? (
        <SmallCompleteButton title="決定" disabled />
      ) : (
          <SmallCompleteButton title="決定" onPress={onCompleteButtonPress} />
        )}
    </View>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  formGroup: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  dateGroup: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: COLOR.textTintColor,
    borderBottomWidth: 2,
  },
  dateView: {
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 15,
  },
  itemTitleText: {
    color: COLOR.textTintColor,
    fontFamily: 'genju-medium',
    fontSize: 14,
    marginRight: 10,
  },
});

export default CreatePlanTopScreen;
