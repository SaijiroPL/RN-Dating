import React, { useCallback, useState, useEffect } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { ICandidateSpot } from 'app/src/interfaces/app/Spot';
import { Container } from 'native-base';
// from app
import { IMAGE, LAYOUT } from 'app/src/constants';
import { SpotSwiper } from '../Content/dist/SpotSwiper';
import { useGooglePlace } from 'app/src/hooks';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';

// interface Props {}
interface Props {
  realSpots: Array<ICandidateSpot>;
}
/** 画像選択グリッド */
export const ImageGrid: React.FC<Props> = (props: Props) => {
  const { realSpots } = props;
  const { getPlaceOpeningHours } = useGooglePlace();

  const [total, setTotal] = useState<ICandidateSpot>(realSpots.total);
  const [setting, setSetting] = useState([]);

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < total.length; i++) {
      let arr1 = [];
      if (getOpenHours(total[i].openinghour)) {
        if (total[i].like) {
          arr1 = ['orange', 0.2];
        } else {
          arr1 = ['orange', 1];
        }
      } else {
        arr1 = ['black', 0.2];
      }
      arr.push(arr1);
    }
    setSetting(arr);
  }, []);

  function getOpenState(
    startTimeH,
    startTimeM,
    currentTimeH,
    currentTimeM,
    endTimeH,
    endTimeM,
  ) {
    let currentTime = eval(currentTimeH * 60 + currentTimeM);
    let startTime = eval(startTimeH * 60 + startTimeM);
    let endTime = eval(endTimeH * 60 + endTimeM);
    if (startTime < currentTime && currentTime < endTime) {
      return true;
    } else {
      return false;
    }
  }

  function getOpenHours(openhour) {
    if (openhour) {
      if (openhour == '24時間営業') {
        return true;
      } else {
        let startTime = openhour.split('-')[0];
        let endTime = openhour.split('-')[1];
        let currentTime = moment().format('HH:MM');
        let startTimeH = startTime.split(':')[0];
        let startTimeM = startTime.split(':')[1];
        let endTimeH = endTime.split(':')[0];
        let endTimeM = endTime.split(':')[1];
        let currentTimeH = currentTime.split(':')[0];
        let currentTimeM = currentTime.split(':')[1];

        if (parseInt(startTimeH) < parseInt(endTimeH)) {
          if (parseInt(currentTimeH) == 0) {
            currentTimeH = parseInt(currentTimeH) + 24;
          }
          getOpenState(
            startTimeH,
            startTimeM,
            currentTimeH,
            currentTimeM,
            endTimeH,
            endTimeM,
          );
        } else {
          endTimeH = parseInt(endTimeH) + 24;
          if (
            parseInt(startTimeH) < parseInt(currentTimeH) &&
            parseInt(currentTimeH) < parseInt(endTimeH)
          ) {
            getOpenState(
              startTimeH,
              startTimeM,
              currentTimeH,
              currentTimeM,
              endTimeH,
              endTimeM,
            );
          } else {
            currentTimeH = parseInt(currentTimeH) + 24;
            getOpenState(
              startTimeH,
              startTimeM,
              currentTimeH,
              currentTimeM,
              endTimeH,
              endTimeM,
            );
          }
        }
      }
    } else {
      return true;
    }
  }
  const imgCheck = (index, id) => {
    if (setting[index][0] != 'black') {
      setTotal((prev) => {
        let arr = prev;
        if (arr.filter((item) => item.id == id)[0].like == true) {
          arr.filter((item) => item.id == id)[0].like = false;
        } else {
          arr.filter((item) => item.id == id)[0].like = true;
        }
        return arr;
      });
    }
    setSetting((prev) => {
      let arr = prev;
      if (arr[index][0] != 'black') {
        if (arr[index][1] == 0.2) {
          arr[index][1] = 1;
        } else {
          arr[index][1] = 0.2;
        }
      }
      return arr;
    });
  };

  useEffect(() => {}, [setting]);

  const renderSpots1 = (spot, index) => {
    if (index % 2 == 0) {
      return (
        <Row style={thisStyle.box} onPress={() => imgCheck(index, spot.id)}>
          {console.log('setting[index][1]')}
          <View
            style={[
              thisStyle.image,
              {
                position: 'absolute',
                backgroundColor:
                  setting.length == total.length ? setting[index][0] : '',
              },
            ]}
          ></View>
          <Image
            style={[
              thisStyle.image,
              {
                opacity: setting.length == total.length ? setting[index][1] : 1,
              },
            ]}
            source={{ uri: spot.imageUrl }}
          />
        </Row>
      );
    }
  };
  const renderSpots2 = (spot, index) => {
    if (index % 2 != 0) {
      return (
        <Row style={thisStyle.box} onPress={() => imgCheck(index, spot.id)}>
          <View
            style={[
              thisStyle.image,
              {
                position: 'absolute',
                backgroundColor:
                  setting.length == total.length ? setting[index][0] : '',
              },
            ]}
          ></View>
          <Image
            style={[
              thisStyle.image,
              {
                opacity: setting.length == total.length ? setting[index][1] : 1,
              },
            ]}
            source={{ uri: spot.imageUrl }}
          />
        </Row>
      );
    }
  };

  return (
    <ScrollView>
      <Grid style={{ padding: 20 }}>
        <Col>{total.map((spot, index) => renderSpots1(spot, index))}</Col>
        <Col>{total.map((spot, index) => renderSpots2(spot, index))}</Col>
      </Grid>
    </ScrollView>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  box: {
    height: LAYOUT.window.width / 3,
    width: LAYOUT.window.width / 2.1,
    justifyContent: 'center',
  },
  image: {
    height: '90%',
    width: '90%',
  },
});
