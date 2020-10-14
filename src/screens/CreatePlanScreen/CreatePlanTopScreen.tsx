import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'native-base';
import moment from 'moment';

// from app
import { useDispatch } from 'app/src/Store';
import { ActionType } from 'app/src/Reducer';
import { COLOR, LAYOUT } from 'app/src/constants';
import { SelectButton, SmallCompleteButton } from 'app/src/components/Button';
import { DateTimePickerLabel } from 'app/src/components/Form';
import { getToday } from 'app/src/utils';
import { appStyle } from 'app/src/styles';

/** デートプラン作成画面トップ(基本情報入力画面) */
const CreatePlanTopScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const [fromDate, updateFrom] = useState<string>('');
  const [toDate, updateTo] = useState<string>('');
  const [car, setCar] = useState<boolean>(false);
  const [train, setTrain] = useState<boolean>(false);
  const [bus, setBus] = useState<boolean>(false);
  const [walk, setWalk] = useState<boolean>(false);

  useEffect(() => {
    updateFrom(
      moment()
        .add(1, 'day')
        .set('minute', 0)
        .set('second', 0)
        .format('YYYY/MM/DD HH:mm'),
    );
    updateTo(
      moment()
        .add(1, 'day')
        .add(8, 'hours')
        .set('minute', 0)
        .set('second', 0)
        .format('YYYY/MM/DD HH:mm'),
    );
  }, []);

  /** デート予定日と交通手段を永続化 */
  function setCreatePlan() {
    const dateFrom = new Date(fromDate);
    const dateTo = new Date(toDate);
    if (dateFrom > dateTo) {
      return;
    }

    let transportationList = [];
    if (car) {
      transportationList = [];
      transportationList.push('car');
    } else if (train) {
      transportationList = [];
      transportationList.push('train');
    } else if (bus) {
      transportationList = [];
      transportationList.push('bus');
    } else if (walk) {
      transportationList = [];
      transportationList.push('walk');
    }

    dispatch({
      type: ActionType.SET_CREATE_PLAN,
      payload: {
        dateFrom: fromDate,
        dateTo: toDate,
        transportations: transportationList,
      },
    });
  }

  function onCompleteButtonPress() {
    setCreatePlan();
    navigate('Map');
  }

  /** 移動手段選択ボタン */
  const TransportationButtonGroup: JSX.Element = (
    <View style={thisStyle.formGroup}>
      <Text style={thisStyle.itemTitleText}>移動手段</Text>
      <SelectButton
        value={car}
        setValue={setCar}
        reversible
        buttonName="車"
        setOtherValues={[setTrain, setBus, setWalk]}
      />
      <SelectButton
        value={train}
        setValue={setTrain}
        reversible
        setOtherValues={[setBus, setCar, setWalk]}
        buttonName="電車"
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
      {fromDate > toDate ||
      fromDate === '' ||
      toDate === '' ||
      (!car && !train && !bus && !walk) ? (
        <SmallCompleteButton title="決定" disabled />
      ) : (
        <SmallCompleteButton title="決定" onPress={onCompleteButtonPress} />
      )}
      <View style={{ marginBottom: 10 }} />
    </View>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  formGroup: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: LAYOUT.window.height * 0.03,
  },
  dateGroup: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: COLOR.textTintColor,
    borderBottomWidth: 2,
    paddingBottom: LAYOUT.window.height * 0.03,
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
    marginRight: 30,
  },
});

export default CreatePlanTopScreen;
