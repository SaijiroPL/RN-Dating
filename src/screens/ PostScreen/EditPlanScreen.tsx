import { StyleSheet, View } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import {
  Container,
  Content,
  Text,
  Left,
  Body,
  Switch,
  Right,
  Form
} from "native-base";

// from app
import { COLOR } from "app/src/constants";
import { ImageCarousel, UserHeader } from "app/src/components/Content";
import { CommentGrid } from "app/src/components/List";
import { SimpleMapView } from "app/src/components/MapItem";
import { CompleteButton } from "app/src/components/Button";
import { formatDate } from "app/src/utils";
import { InputLabelTextAreaForm } from "app/src/components/Form";

/**
 * デートプラン詳細画面
 * @author kotatanaka
 */
const GuidePostScreen: React.FC = () => {
  /** ナビゲーター */
  const { navigate } = useNavigation();

  return (
    <Container>
      <Content>
        <ImageCarousel plan={plan} />
        <SimpleMapView spot={plan.spots[0]} />
        {PlanDescription}
        <CommentGrid comments={comments.comment_list} />
        <Form>
          <InputLabelTextAreaForm
            label="自己紹介"
            value={profile}
            setValue={setProfile}
            errors={profileErrors}
          />
        </Form>
        <Left>
          <Text>スポット滞在時間</Text>
        </Left>
        <Body>
          <Text style={thisStyle.descriptionText}>
            {formatDate(plan.date, "YYYY年MM月DD日TT時MM分")}
          </Text>
        </Body>
        <Right>
          <Text>投稿を非公開にする</Text>
          <Switch onValueChange={handleSwitchPrivateValue} value={privateOn} />
          <Text>投稿を非公開にする</Text>
          <Switch onValueChange={handleSwitchPrivateValue} value={privateOn} />
        </Right>
        <CompleteButton title="投稿" onPress={onCompleteButtonPress} />
      </Content>
    </Container>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  descriptionText: {
    color: COLOR.textTintColor,
    fontFamily: "genju-light",
    fontSize: 10
  }
});

export default EditPlanScreen;
