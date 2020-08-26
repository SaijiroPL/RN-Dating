import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

// from app
import { IMAGE, LAYOUT } from 'app/src/constants';

// interface Props {}

/** 画像選択グリッド */
export const ImageGrid: React.FC = () => {
  return (
    <Grid>
      <Col>
        <Row style={thisStyle.box}>
          <Image
            style={thisStyle.image}
            source={{
              uri:
                'https://i.pinimg.com/originals/5b/55/88/5b5588af841070a2284ea76e2042dd9d.jpg',
            }}
          />
        </Row>
        <Row style={thisStyle.box}>
          <Image
            style={thisStyle.image}
            source={{
              uri:
                'https://i.pinimg.com/originals/5b/55/88/5b5588af841070a2284ea76e2042dd9d.jpg',
            }}
          />
        </Row>
        <Row style={thisStyle.box}>
          <Image
            style={thisStyle.image}
            source={{
              uri:
                'https://i.pinimg.com/originals/5b/55/88/5b5588af841070a2284ea76e2042dd9d.jpg',
            }}
          />
        </Row>
        <Row style={thisStyle.box}>
          <Image
            style={thisStyle.image}
            source={{
              uri:
                'https://i.pinimg.com/originals/5b/55/88/5b5588af841070a2284ea76e2042dd9d.jpg',
            }}
          />
        </Row>
        <Row style={thisStyle.box}>
          <Image
            style={thisStyle.image}
            source={{
              uri:
                'https://i.pinimg.com/originals/5b/55/88/5b5588af841070a2284ea76e2042dd9d.jpg',
            }}
          />
        </Row>
        <Row style={thisStyle.box}>
          <Image
            style={thisStyle.image}
            source={{
              uri:
                'https://i.pinimg.com/originals/5b/55/88/5b5588af841070a2284ea76e2042dd9d.jpg',
            }}
          />
        </Row>
      </Col>
      <Col>
        <Row style={thisStyle.box}>
          <Image
            style={thisStyle.image}
            source={{
              uri:
                'https://i.pinimg.com/originals/5b/55/88/5b5588af841070a2284ea76e2042dd9d.jpg',
            }}
          />
        </Row>
        <Row style={thisStyle.box}>
          <Image
            style={thisStyle.image}
            source={{
              uri:
                'https://i.pinimg.com/originals/5b/55/88/5b5588af841070a2284ea76e2042dd9d.jpg',
            }}
          />
        </Row>
        <Row style={thisStyle.box}>
          <Image
            style={thisStyle.image}
            source={{
              uri:
                'https://i.pinimg.com/originals/5b/55/88/5b5588af841070a2284ea76e2042dd9d.jpg',
            }}
          />
        </Row>
        <Row style={thisStyle.box}>
          <Image
            style={thisStyle.image}
            source={{
              uri:
                'https://i.pinimg.com/originals/5b/55/88/5b5588af841070a2284ea76e2042dd9d.jpg',
            }}
          />
        </Row>
        <Row style={thisStyle.box}>
          <Image
            style={thisStyle.image}
            source={{
              uri:
                'https://i.pinimg.com/originals/5b/55/88/5b5588af841070a2284ea76e2042dd9d.jpg',
            }}
          />
        </Row>
        <Row style={thisStyle.box}>
          <Image
            style={thisStyle.image}
            source={{
              uri:
                'https://i.pinimg.com/originals/5b/55/88/5b5588af841070a2284ea76e2042dd9d.jpg',
            }}
          />
        </Row>
      </Col>
    </Grid>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  box: {
    height: LAYOUT.window.width / 2,
    justifyContent: 'center',
    shadowColor: '#ccc',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  image: {
    height: (LAYOUT.window.width * 0.95) / 2,
    width: (LAYOUT.window.width * 0.95) / 2,
  },
});
