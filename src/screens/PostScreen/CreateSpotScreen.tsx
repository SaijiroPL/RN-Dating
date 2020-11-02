/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback, useState } from 'react';
import { Container, View, Text } from 'native-base';
import {
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import moment from 'moment';
import debounce from 'lodash/debounce';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// from app
import { CompleteButton } from 'app/src/components/Button';
import {
  COLOR,
  LAYOUT,
  SPOT_TYPE_GROUP,
  getSpotTypesByGroup,
} from 'app/src/constants';

import { ILocation } from 'app/src/interfaces/app/Map';
import MapView, { Region, LatLng, Marker } from 'react-native-maps';
// import { COLOR } from 'app/src/constants';

/** スポット作成画面 */
const CreateSpotScreen: React.FC = () => {
  const { navigate } = useNavigation();

  const [location, setLocation] = useState<ILocation>({
    latitude: 35.658606737323325,
    longitude: 139.69814462256613,
    latitudeDelta: 0.038651027332100796,
    longitudeDelta: 0.02757163010454633,
  });
  const [center, setCenter] = useState<LatLng>({
    latitude: 35.658606737323325,
    longitude: 139.69814462256613,
  });
  const today = new Date();

  const [image, setImage] = useState('');
  const [showTimeFrom, setShowTimeFrom] = useState(false);
  const [showTimeTo, setShowTimeTo] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [timeFrom, setTimeFrom] = useState<Date>();
  const [timeTo, setTimeTo] = useState<Date>();
  const [dateLimit, setDateLimit] = useState<Date>();

  const onCompleteButtonPress = useCallback(() => {
    navigate('Top');
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const spotTypes = () => {
    const result: {
      label: string;
      value: string;
    }[] = [];

    SPOT_TYPE_GROUP.forEach((item, index) => {
      const spottypes = getSpotTypesByGroup(index);
      spottypes.forEach((item) => {
        result.push({ label: item.title, value: item.id });
      });
    });

    return result;
  };

  // map region changed
  const handleMapMoved = debounce((newRegion: Region) => {
    setCenter(newRegion);
  }, 100);

  function onRegionChange(newRegion: Region) {
    handleMapMoved(newRegion);
  }

  return (
    <Container style={{ padding: 10 }}>
      <KeyboardAwareScrollView>
        <ScrollView>
          <View style={thisStyle.imageContainer}>
            <Image source={{ uri: image }} style={thisStyle.imageStyle} />
            <View
              style={{
                position: 'absolute',
                right: LAYOUT.window.width * 0.1,
                bottom: 20,
              }}
            >
              <TouchableOpacity
                style={thisStyle.spotButton}
                onPress={pickImage}
              >
                <FontAwesome5 name="plus" size={24} color={COLOR.greyColor} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={thisStyle.infoContainer}>
            <TouchableOpacity style={thisStyle.buttonStyle}>
              <Text style={thisStyle.buttonTextStyle}>住所</Text>
            </TouchableOpacity>
            <TextInput
              placeholder="住所を追加"
              style={thisStyle.textInputStyle}
            />
          </View>
          <View
            style={{
              height: LAYOUT.window.height * 0.3,
              borderColor: COLOR.textTintColor,
              borderWidth: 1,
              borderRadius: 5,
              padding: 1,
              marginTop: 5,
            }}
          >
            <MapView
              initialRegion={location}
              style={{ height: '100%' }}
              onRegionChange={onRegionChange}
            >
              <Marker
                coordinate={{
                  latitude: center.latitude,
                  longitude: center.longitude,
                }}
              >
                <View>
                  <FontAwesome5 name="map-marker" size={30} color="orange" />
                </View>
              </Marker>
            </MapView>
          </View>
          <View style={thisStyle.infoContainer}>
            <TouchableOpacity style={thisStyle.buttonStyle}>
              <Text style={thisStyle.buttonTextStyle}>名前</Text>
            </TouchableOpacity>
            <TextInput
              placeholder="名前を追加"
              style={thisStyle.textInputStyle}
            />
          </View>
          <View style={thisStyle.infoContainer}>
            <TouchableOpacity style={thisStyle.buttonStyle}>
              <Text style={thisStyle.buttonTextStyle}>カテゴリ</Text>
            </TouchableOpacity>
            <View style={{ marginLeft: 10 }}>
              <RNPickerSelect
                onValueChange={(value) => console.log(value)}
                items={spotTypes()}
                placeholder={{
                  label: 'カテゴリを追加',
                  value: null,
                  color: 'grey',
                }}
              />
            </View>
          </View>
          <View style={thisStyle.infoContainer}>
            <TouchableOpacity style={thisStyle.buttonStyle}>
              <Text style={thisStyle.buttonTextStyle}>営業時間</Text>
            </TouchableOpacity>
            <Text
              style={thisStyle.textInputStyle}
              onPress={() => setShowTimeFrom(true)}
            >
              {timeFrom ? moment(timeFrom).format('HH:mm') : '??:??'}
            </Text>
            <Text style={thisStyle.textInputStyle}>~</Text>
            <Text
              style={thisStyle.textInputStyle}
              onPress={() => setShowTimeTo(true)}
            >
              {timeTo ? moment(timeTo).format('HH:mm') : '??:??'}
            </Text>
            <Text style={thisStyle.textInputStyle}>期間限定</Text>
            <Text
              style={thisStyle.textInputStyle}
              onPress={() => setShowDate(true)}
            >
              {dateLimit
                ? moment(dateLimit).format('YYYY/MM/DD')
                : '日程を追加'}
            </Text>
          </View>
          <View style={thisStyle.infoContainer}>
            <TouchableOpacity style={thisStyle.buttonStyle}>
              <Text style={thisStyle.buttonTextStyle}>電話番号</Text>
            </TouchableOpacity>
            <TextInput
              placeholder="電話番号を追加"
              style={thisStyle.textInputStyle}
              textContentType="telephoneNumber"
              keyboardType="numbers-and-punctuation"
            />
          </View>
          <View style={thisStyle.infoContainer}>
            <TouchableOpacity style={thisStyle.buttonStyle}>
              <Text style={thisStyle.buttonTextStyle}>webサイト</Text>
            </TouchableOpacity>
            <TextInput
              placeholder="webサイトを追加"
              style={thisStyle.textInputStyle}
              textContentType="URL"
              keyboardType="url"
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              padding: 15,
            }}
          >
            <CompleteButton title="追加する" onPress={onCompleteButtonPress} />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <DateTimePickerModal
        isVisible={showTimeFrom}
        mode="time"
        onConfirm={(date) => {
          setTimeFrom(date);
          setShowTimeFrom(false);
        }}
        onCancel={() => setShowTimeFrom(false)}
        date={timeFrom}
      />
      <DateTimePickerModal
        isVisible={showTimeTo}
        mode="time"
        onConfirm={(date) => {
          setTimeTo(date);
          setShowTimeTo(false);
        }}
        onCancel={() => setShowTimeTo(false)}
        date={timeTo}
      />
      <DateTimePickerModal
        isVisible={showDate}
        mode="date"
        onConfirm={(date) => {
          setDateLimit(date);
          setShowDate(false);
        }}
        onCancel={() => setShowDate(false)}
        date={dateLimit}
        minimumDate={today}
      />
    </Container>
  );
};

export default CreateSpotScreen;

/** スタイリング */
const thisStyle = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    width: '100%',
    paddingBottom: 10,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  imageStyle: {
    width: LAYOUT.window.width * 0.8,
    height: 200,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  spotButton: {
    backgroundColor: COLOR.tintColor,
    width: LAYOUT.window.width * 0.1,
    height: LAYOUT.window.width * 0.1,
    borderRadius: LAYOUT.window.width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  infoContainer: {
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  buttonStyle: {
    backgroundColor: 'orange',
    borderRadius: 5,
    width: 75,
  },
  buttonTextStyle: {
    color: 'white',
    fontFamily: 'genju-medium',
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
  },
  textInputStyle: {
    marginLeft: 10,
    fontSize: 14,
    color: '#ccc',
  },
});
