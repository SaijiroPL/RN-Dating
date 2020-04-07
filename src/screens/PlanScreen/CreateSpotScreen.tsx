import React, {
  useCallback,
  // useState
} from 'react';
// import { StyleSheet } from 'react-native';
import {
  Container,
  Content,
  Form,
  View,
  // DatePicker,
  // Picker,
  Item,
  // Icon,
  Text,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';

// from app
import { CompleteButton } from 'app/src/components/Button';
import { InputLabelForm } from 'app/src/components/Form';
// import { COLOR } from 'app/src/constants';

/**
 * スポット作成画面
 * @author itsukiyamada
 */
const CreateSpotScreen: React.FC = () => {
  const { navigate } = useNavigation();

  /** スポットのカテゴリを追加 */
  // const [selected2, onValueChange2] = useState<boolean>(false);

  /** スポットのカテゴリを追加 */
  // const [date, setDate] = useState<string>('');

  const onCompleteButtonPress = useCallback(() => {
    navigate('Top');
  }, []);

  return (
    <Container>
      <Content>
        <Form>
          <InputLabelForm label="名称" />
        </Form>
        <View>
          <Form>
            <Item picker>
              <Text>カテゴリを入力できるボタンを挿入</Text>
              {/* <Picker
                style={thisStyle.itemTitleText}
                mode="dropdown"
                iosIcon={<Icon name="arrowdown" />}
                placeholder="カテゴリを選択"
                selectedValue={selected2}
                onValueChange={onValueChange2}
              >
                <Picker.Item label="映えスポット" value="key0" />
                <Picker.Item label="宿泊施設" value="key1" />
                <Picker.Item label="レストラン" value="key2" />
                <Picker.Item label="カフェ" value="key3" />
                <Picker.Item label="衣類用品店" value="key4" />
                <Picker.Item label="ATM" value="key5" />
                <Picker.Item label="ショッピングモール" value="key6" />
                <Picker.Item label="スーパー" value="key7" />
                <Picker.Item label="インテリア用品店" value="key8" />
                <Picker.Item label="家電量販店" value="key9" />
                <Picker.Item label="ジム" value="key10" />
                <Picker.Item label="オフィス" value="key11" />
                <Picker.Item label="薬局" value="key12" />
                <Picker.Item label="博物館/美術館" value="key13" />
                <Picker.Item label="映画館" value="key14" />
                <Picker.Item label="ナイトクラブ" value="key15" />
              </Picker> */}
            </Item>
          </Form>
        </View>
        <Text>小さなマップを表示しスポットにピンを置けるようにする</Text>
        {/* TODO マップのスポットを選択できる機能を挿入 */}
        <Text>営業日時入力フォームを挿入</Text>
        {/* TODO スポット営業時間入力フォームを挿入 */}
        {/* <View style={thisStyle.formGroup}>
          <Text style={thisStyle.itemTitleText}>スポット営業時間</Text>
          <DatePicker date={date} setDate={setDate} minDate={getToday()} />
        </View> */}
        <Form>
          <InputLabelForm label="電話番号" />
        </Form>
      </Content>
      <View
        style={{
          alignItems: 'center',
          padding: 15,
        }}
      >
        <CompleteButton title="追加する" onPress={onCompleteButtonPress} />
      </View>
    </Container>
  );
};

export default CreateSpotScreen;

/** スタイリング */
// const thisStyle = StyleSheet.create({
//   formGroup: {
//     alignItems: 'center',
//     flex: 1,
//     flexDirection: 'row',
//   },
//   itemTitleText: {
//     color: COLOR.textTintColor,
//     marginRight: 10,
//   },
// });
