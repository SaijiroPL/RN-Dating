import React, { useCallback, useState } from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  View,
  Text,
  Left,
  Body,
  Right,
  ListItem,
  // Switch,
} from 'native-base';
import { useNavigation } from 'react-navigation-hooks';

// from app
import { StyleSheet } from 'react-native';
import { COLOR } from 'app/src/constants';
import { DatePicker } from 'app/src/components/Form';
import { getToday } from 'app/src/utils';
import { SmallCompleteButton } from 'app/src/components/Button/SmallCompleteButton';

/**
 * デートスポット順番並べ替え画面
 * @author kotatanaka, itsukiyamada
 */
const ArrangeRouteScreen: React.FC = () => {
  const { navigate } = useNavigation();

  const [date, setDate] = useState<string>('');

  const onCompleteButtonPress = useCallback(() => {
    navigate('Complete');
  }, []);

  return (
    <Container>
      <Content />
      {/* <ImageCarousel plan={plan} />
      <SimpleMapView spot={plan.spots[0]} /> */}
      <Text style={{ flex: 1 }}>ここに写真とルートを表示</Text>
      <Form>
        <Item inlineLabel>
          <Text>
            <Label style={thisStyle.text2}>プラン名変更</Label>
          </Text>
          <Input />
          <View style={thisStyle.formGroup}>
            <Text style={thisStyle.itemTitleText}>デート予定日</Text>
            <DatePicker date={date} setDate={setDate} minDate={getToday()} />
          </View>
        </Item>
        <Item inlineLabel last style={{ marginTop: 25 }}>
          <Text>
            <Label style={thisStyle.text}>ポイントを書く</Label>
          </Text>
          <Input />
        </Item>
      </Form>
      <View style={thisStyle.emptySpace}>
        <ListItem icon>
          <Left>
            <View style={thisStyle.columnTitle}>
              <Text style={thisStyle.columnTitleText}>スポット滞在時間</Text>
            </View>
          </Left>
          <Body>
            <Text style={thisStyle.text}>ここに合計スポット滞在時間を表示</Text>
          </Body>
          <Right>
            <Text style={thisStyle.text}>ここに非公開ボタンを表示</Text>
            {/* <Text style={thisStyle.itemTitleText}>投稿日時を非公開にする</Text>
            <Switch
              onValueChange={handleSwitchFacebookValue}
              value={facebookOn}
            />
            <Text style={thisStyle.itemTitleText}>投稿を非公開にする</Text>
            <Switch
              onValueChange={handleSwitchFacebookValue}
              value={facebookOn}
            /> */}
          </Right>
        </ListItem>
      </View>
      <View style={thisStyle.button1}>
        <View style={{ marginLeft: 10 }} />
        <SmallCompleteButton title="保存" onPress={onCompleteButtonPress} />
        <View style={{ width: 20, marginRight: 10 }} />
        <SmallCompleteButton
          title="保存して案内"
          onPress={onCompleteButtonPress}
        />
      </View>
    </Container>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  formGroup: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  columnTitle: {
    backgroundColor: COLOR.tintColor,
    borderRadius: 10,
    marginRight: 5,
    marginTop: 2,
    paddingHorizontal: 5,
  },
  columnTitleText: {
    color: 'white',
    fontFamily: 'genju-medium',
    fontSize: 10,
  },
  itemTitleText: {
    color: COLOR.textTintColor,
    fontFamily: 'genju-medium',
    fontSize: 10,
    marginRight: 10,
  },
  button1: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
    padding: 15,
  },
  text: {
    color: COLOR.textTintColor,
    fontSize: 10,
    padding: 20,
  },
  text2: {
    color: COLOR.textTintColor,
    flexDirection: 'row',
    fontSize: 12,
  },
  emptySpace: {
    marginBottom: 5,
  },
});

export default ArrangeRouteScreen;
