import React from "react";
import { Image } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

// from app
import Images from "app/src/constants/Images";
import { imageGridStyle } from "app/src/styles/create-screen-style";

interface Props {}

/**
 * 画像選択グリッド
 * @author kotatanaka
 */
const ImageGrid: React.FC<Props> = () => {
  return (
    <Grid>
      <Col>
        <Row style={imageGridStyle.box}>
          <Image style={imageGridStyle.image} source={Images.noImage} />
        </Row>
        <Row style={imageGridStyle.box}>
          <Image style={imageGridStyle.image} source={Images.noImage} />
        </Row>
        <Row style={imageGridStyle.box}>
          <Image style={imageGridStyle.image} source={Images.noImage} />
        </Row>
      </Col>
      <Col>
        <Row style={imageGridStyle.box}>
          <Image style={imageGridStyle.image} source={Images.noImage} />
        </Row>
        <Row style={imageGridStyle.box}>
          <Image style={imageGridStyle.image} source={Images.noImage} />
        </Row>
        <Row style={imageGridStyle.box}>
          <Image style={imageGridStyle.image} source={Images.noImage} />
        </Row>
      </Col>
    </Grid>
  );
};

export default ImageGrid;
