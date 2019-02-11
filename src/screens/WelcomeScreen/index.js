import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

// Constants
const SCREEN_WIDTH = Dimensions.get('window').width;
const SLIDE_DATA = [
  {
    step: 'Step: 1',
    title: '日時の入力',
    text: 'デート当日の日付と時間、移動手段を入力します',
    uri: require('../../../assets/images/robot-dev.png')
  },
  {
    step: 'Step: 2',
    title: '場所とピン付け',
    text: 'マップで大まかな行動範囲を設定します',
    uri: require('../../../assets/images/robot-dev.png')
  },
  {
    step: 'Step: 3',
    title: 'フリックでリストアップ',
    text: 'デートスポット候補をフリックで選択します',
    uri: require('../../../assets/images/robot-dev.png') },
  {
    step: 'Step: 4',
    title: 'スポット厳選',
    text: 'リストアップした候補を厳選します',
    uri: require('../../../assets/images/robot-dev.png')
  },
  {
    step: 'Step: 5',
    title: '順番とプラン名',
    text: '訪れる順番とデートプラン名を決定します',
    uri: require('../../../assets/images/robot-dev.png')
  },
];

/**
 * ウェルカム画面
 */
class WelcomeScreen extends React.Component {
  /**
   * 完了ボタン押下でホーム画面に遷移する
   */
  onStartButtonPress = () => {
    this.props.navigation.navigate('main');
  }

  /**
   * 最後のページに完了ボタンを配置する
   * @param index ページのインデックス
   */
  renderLastButton(index) {
    if (index === SLIDE_DATA.length - 1) {
      return (
        <View>
          <Text style={styles.textStyle}>Let's make the plan!</Text>
          <Button
            style={{
              paddingVertical: 10,
              paddingHorizontal: 30
            }}
            buttonStyle={{ backgroundColor: 'orange' }}
            title="完了"
            onPress={this.onStartButtonPress}
          />
        </View>
      );
    }
  }

  /** 各ステップページの描画 */
  renderSlides() {
    return SLIDE_DATA.map((slide, index) => {
      return (
        <View
          key={index}
          style={styles.slideStyle}
        >
          <View style={styles.containerStyle}>
            <Text style={styles.textStyle}>{slide.step}</Text>
            <Text style={styles.titleStyle}>{slide.title}</Text>
            <Text style={styles.textStyle}>{slide.text}</Text>
          </View>

          <Image
            style={{ flex: 2 }}
            resizeMode="contain"
            source={slide.uri}
          />
        
          <View style={styles.containerStyle}>
            {this.renderLastButton(index)}
            <Text style={styles.textStyle}>{index + 1} / 5</Text>
          </View>
        </View>
      )
    });
  }

  /** スクロールビューの描画 */
  render() {
    return (
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        style={{ flex: 1 }}
      >
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  slideStyle: {
    flex: 1,
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleStyle: {
    fontSize: 30,
    padding: 10
  },
  textStyle: {
    fontSize: 20,
    padding: 5
  }
})

export default WelcomeScreen;