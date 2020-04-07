import { StyleSheet, View } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import {
  Container,
  Content,
  Text,
  Left,
  Body,
  Switch,
  Right,
  Form,
  Label,
  Item,
  Input,
} from 'native-base';

// from app
import { COLOR } from 'app/src/constants';
import { ImageCarousel, UserHeader } from 'app/src/components/Content';
import { CommentGrid } from 'app/src/components/List';
import { SimpleMapView } from 'app/src/components/MapItem';
import { CompleteButton } from 'app/src/components/Button';
import { formatDate } from 'app/src/utils';
import { InputLabelTextAreaForm } from 'app/src/components/Form';
import { appTextStyle } from 'app/src/styles';
import { useCallback } from 'react';

/**
 * デートプラン詳細画面
 * @author kotatanaka
 */
const PostScreen: React.FC = () => {
  /** ナビゲーター */
  const { navigate } = useNavigation();

  const onCompleteButtonPress = useCallback(() => {
    navigate('post');
  }, []);

  return (
    <Container>
      <Content>
        {/** 投稿する画像を表示できるようにする */}
        {/** 投稿する場所をマップで表示する */}
        <Form>
          <Item fixedLabel>
            {/** ここにスポットの名前が自動で挿入されるようにする */}
            <Label>スポット名を入力</Label>
            <Input />
          </Item>
          <Item fixedLabel last>
            <Label>ポイントを書く</Label>
            <Input />
          </Item>
        </Form>
        <Left>
          <Text style={appTextStyle.defaultText}>スポット滞在時間</Text>
        </Left>
        <Body>
          {/**　スポット滞在時間を表示、変更もできるようにする
          <Text style={thisStyle.descriptionText}>
            {formatDate(plan.date, "YYYY年MM月DD日TT時MM分")}
          </Text>
          */}
        </Body>
        <Right>
          {/**　非公開ボタンを挿入
          <Text>投稿を非公開にする</Text>
          <Switch onValueChange={handleSwitchPrivateValue} value={privateOn} />
          <Text>投稿を非公開にする</Text>
          <Switch onValueChange={handleSwitchPrivateValue} value={privateOn} />
          */}
        </Right>
      </Content>
      <CompleteButton title="投稿" onPress={onCompleteButtonPress} />
    </Container>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  descriptionText: {
    color: COLOR.textTintColor,
    fontFamily: 'genju-light',
    fontSize: 10,
  },
});

export default PostScreen;
