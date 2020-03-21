import React, { useCallback, useState } from "react";
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
  Switch
} from "native-base";
import { useNavigation } from "react-navigation-hooks";

// from app
import { CompleteFooterButton } from "app/src/components/Button";
import { ImageCarousel } from "app/src/components/Content";
import { SimpleMapView } from "app/src/components/MapItem";
import { useGetPlanDetail } from "app/src/hooks";
import { StyleSheet } from "react-native";
import { COLOR } from "app/src/constants";
import { DatePicker } from "app/src/components/Form";
import { getToday } from "app/src/utils";
import { appTextStyle } from "app/src/styles";

/**
 * デートスポット順番並べ替え画面
 */
const ArrangeRouteScreen: React.FC = () => {
  const { navigate } = useNavigation();

  /** デートプラン詳細取得 */
  const { plan } = useGetPlanDetail(planId, loginUser.id);

  const [date, setDate] = useState<string>("");

  const onCompleteButtonPress = useCallback(() => {
    navigate("complete");
  }, []);

  return (
    <Container>
      <Content />
      <View style={thisStyle.formGroup}>
        <Text style={thisStyle.itemTitleText}>デート予定日</Text>
        <DatePicker date={date} setDate={setDate} minDate={getToday()} />
      </View>
      <Form>
        <Item inlineLabel>
          <Label>プラン名変更</Label>
          <Input />
        </Item>
        <Item inlineLabel last>
          <Label>ポイントを書く</Label>
          <Input />
        </Item>
      </Form>
      <ImageCarousel plan={plan} />
      <SimpleMapView spot={plan.spots[0]} />
      <ListItem icon>
        <Left>
          <View style={thisStyle.columnTitle}>
            <Text style={thisStyle.columnTitleText}>ポイント</Text>
          </View>
        </Left>
        <Body>ここに合計スポット滞在時間を表示</Body>
        <Text style={thisStyle.itemTitleText}>デート予定日</Text>
        {/**
        <Right>
          <Text style={thisStyle.itemTitleText}>投稿日時を非公開にする</Text>
          <Switch
            onValueChange={handleSwitchFacebookValue}
            value={facebookOn}
          />
          <Text style={thisStyle.itemTitleText}>投稿を非公開にする</Text>
          <Switch
            onValueChange={handleSwitchFacebookValue}
            value={facebookOn}
          />
        </Right>
        */}
      </ListItem>
      <CompleteFooterButton title="保存" onPress={onCompleteButtonPress} />
      <CompleteFooterButton
        title="保存して案内"
        onPress={onCompleteButtonPress}
      />
    </Container>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  formGroup: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row"
  },
  columnTitle: {
    backgroundColor: COLOR.tintColor,
    borderRadius: 10,
    marginRight: 5,
    marginTop: 2,
    paddingHorizontal: 5
  },
  columnTitleText: {
    color: "white",
    fontFamily: "genju-medium",
    fontSize: 10
  },
  itemTitleText: {
    color: COLOR.textTintColor,
    fontFamily: "genju-medium",
    marginRight: 10
  }
});

export default ArrangeRouteScreen;
