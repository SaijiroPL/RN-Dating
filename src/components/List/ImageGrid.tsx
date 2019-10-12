import React from "react";
import { Image, StyleSheet } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

// from app
import Images from "app/src/constants/Images";
import Layout from "app/src/constants/Layout";

interface Props {}

/**
 * 画像選択グリッド
 * @author kotatanaka
 */
export const ImageGrid: React.FC<Props> = () => {
  return (
    <Grid>
      <Col>
        <Row style={thisStyle.box}>
          <Image style={thisStyle.image} source={Images.noImage} />
        </Row>
        <Row style={thisStyle.box}>
          <Image style={thisStyle.image} source={Images.noImage} />
        </Row>
        <Row style={thisStyle.box}>
          <Image style={thisStyle.image} source={Images.noImage} />
        </Row>
      </Col>
      <Col>
        <Row style={thisStyle.box}>
          <Image style={thisStyle.image} source={Images.noImage} />
        </Row>
        <Row style={thisStyle.box}>
          <Image style={thisStyle.image} source={Images.noImage} />
        </Row>
        <Row style={thisStyle.box}>
          <Image style={thisStyle.image} source={Images.noImage} />
        </Row>
      </Col>
    </Grid>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  box: {
    height: Layout.window.width / 2,
    justifyContent: "center",
    shadowColor: "#ccc",
    shadowOffset: {
      height: 0,
      width: 0
    },
    shadowOpacity: 1,
    shadowRadius: 1
  },
  image: {
    height: (Layout.window.width * 0.95) / 2,
    width: (Layout.window.width * 0.95) / 2
  }
});
