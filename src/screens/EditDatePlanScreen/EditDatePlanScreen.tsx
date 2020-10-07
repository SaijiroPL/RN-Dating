import React from 'react';
import { StyleSheet, ActionSheetIOS, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Container,
  Content,
  Text,
  Left,
  Body,
  Switch,
  View,
  Right,
  Form,
  Label,
  Item,
  Input,
} from 'native-base';

// from app
import { COLOR } from 'app/src/constants';
import { CompleteButton } from 'app/src/components/Button';
import { appTextStyle } from 'app/src/styles';
import { DateTimePickerLabel } from 'app/src/components/Form';
import { useUpdatePost } from 'app/src/hooks/useUpdatePost';

/** 投稿編集画面 */
const EditPostScreen: React.FC = () => {
  const { params } = useRoute();
  const { goBack } = useNavigation();

  const {
    title,
    setTitle,
    desc,
    setDesc,
    transportation,
    setTransportation,
    fromDate,
    updateFrom,
    updatePlan,
    status,
    setStatus,
  } = useUpdatePost(params.plan);

  const trans = { car: '車', train: '電車', bus: 'バス', walk: '徒歩' };

  const showActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', ...Object.values(trans)],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex !== 0) {
          setTransportation(Object.keys(trans)[buttonIndex - 1]);
        }
      },
    );
  };

  const onSave = async () => {
    const res = await updatePlan();
    if (res) {
      goBack();
    }
  };

  return (
    <Container>
      <Content>
        <Form>
          <Item fixedLabel>
            <Label>プラン名</Label>
            <Input value={title} onChangeText={setTitle} />
          </Item>
          <Item fixedLabel last style={{ alignItems: 'top' }}>
            <Label style={{ marginTop: 10 }}>プランの説明</Label>
            <Input
              multiline
              numberOfLines={3}
              style={{ height: 90 }}
              value={desc}
              onChangeText={setDesc}
            />
          </Item>
          <Item fixedLabel style={{ paddingRight: 15 }}>
            <Left>
              <Text style={thisStyle.label}>デート日</Text>
            </Left>
            <Body />
            <Right>
              <DateTimePickerLabel
                date={fromDate}
                showTime={false}
                setDate={updateFrom}
                // minDate={getToday()}
              />
            </Right>
          </Item>
          <Item style={{ paddingTop: 15, paddingBottom: 15, paddingRight: 25 }}>
            <Left>
              <Label>交通手段リスト</Label>
            </Left>
            <Body />
            <Right>
              <TouchableOpacity onPress={showActionSheet}>
                <Text>{trans[transportation]}</Text>
              </TouchableOpacity>
            </Right>
          </Item>
          <Item style={{ paddingTop: 15, paddingBottom: 15, paddingRight: 25 }}>
            <Left>
              <Label>プランの説明</Label>
            </Left>
            <Body />
            <Right>
              <Switch
                onValueChange={(val) => setStatus(val ? 'private' : 'public')}
                value={status === 'private'}
              />
            </Right>
          </Item>
        </Form>
      </Content>
      <View style={{ alignItems: 'center' }}>
        <CompleteButton title="投稿" onPress={onSave} />
      </View>
    </Container>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
  descriptionText: {
    color: COLOR.textTintColor,
    fontFamily: 'genju-light',
    fontSize: 10,
  },
  label: {
    marginLeft: 0,
    paddingTop: 15,
    paddingBottom: 15,
    ...appTextStyle.defaultText,
  },
});

export default EditPostScreen;
