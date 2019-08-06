import React, { useState, useEffect } from "react";
import { Image } from "react-native";
import { Constants } from "expo";
import { useNavigationParam } from "react-navigation-hooks";
import {
  Content,
  Item,
  Thumbnail,
  Text,
  Button,
  Left,
  Body,
  Right,
  Spinner
} from "native-base";
import axios, { CancelTokenSource } from "axios";

// from app
import { PlanFull } from "app/src/types/api/TPlan";
import { BadRequestError } from "app/src/types/api/TError";
import images from "app/src/constants/images";
import layout from "app/src/constants/layout";

/**
 * デートプラン詳細画面
 * @author kotatanaka
 */
const PlanDetailScreen: React.FC = () => {
  const planId = useNavigationParam("id");

  const [plan, setPlan] = useState({
    plan_id: "",
    title: "",
    description: "",
    date: "",
    transportation: [],
    need_time: 0,
    create_date: "",
    spots: [],
    user_name: "",
    user_attr: "",
    user_image_url: "",
    like_count: 0,
    comment_count: 0,
    is_liked: false
  });
  const [errors, setErrors] = useState({
    code: 0,
    message: "",
    detail_massage: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    getPlanDetail(signal);
    return () => {
      signal.cancel("Cancelling in Cleanup.");
    };
  }, []);

  /** デートプラン詳細取得 */
  const getPlanDetail = (signal: CancelTokenSource) => {
    axios
      .get(Constants.manifest.extra.apiEndpoint + "/plans" + planId, {
        cancelToken: signal.token
      })
      .then((response: { data: PlanFull }) => {
        setPlan(Object.assign(response.data));
        setIsLoading(false);
      })
      .catch((error: BadRequestError) => {
        setErrors(Object.assign(error));
        setIsLoading(false);
        if (axios.isCancel(error)) {
          console.log("Request Cancelled: " + error.message);
        } else {
          console.log("API Error: " + error.message);
        }
      });
  };

  if (isLoading) {
    return <Spinner color="orange" style={{ flex: 1 }} />;
  }

  return (
    <Content>
      <Text>デートプラン詳細</Text>
      <Item>
        <Left>
          <Thumbnail source={images.noUserImage} />
          <Body>
            <Text>{plan.user_name}</Text>
            <Text note>一般ユーザー</Text>
          </Body>
        </Left>
      </Item>
      <Item>
        <Image
          source={images.noImage}
          style={{ height: 200, width: layout.window.width }}
        />
      </Item>
      <Item>
        <Left>
          <Text>{plan.title}</Text>
        </Left>
        <Right>
          <Text note style={{ fontSize: 12 }}>
            {plan.create_date.substr(0, 10)}
          </Text>
        </Right>
      </Item>
      <Item>
        <Left>
          <Text note style={{ fontSize: 12 }}>
            {plan.description}
          </Text>
        </Left>
      </Item>
      <Item>
        <Left>
          <Button transparent>
            <Text>{plan.like_count} Likes</Text>
          </Button>
        </Left>
        <Body>
          <Button transparent>
            <Text>4 Comments</Text>
          </Button>
        </Body>
      </Item>
    </Content>
  );
};

export default PlanDetailScreen;
