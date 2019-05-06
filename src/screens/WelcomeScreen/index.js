import React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { Button } from 'react-native-elements';

// from app
import images from '../../images';
import styles from './styles';

// Constants
const SLIDE_DATA = [
  {
    title: '日時の入力',
    description: 'デート当日の日付と時間、移動手段を入力します。',
    uri: images.welcome01
  },
  {
    title: '場所とピン付け',
    description: 'マップで大まかな行動範囲を設定します。',
    uri: images.welcome02
  },
  {
    title: 'フリックでリストアップ',
    description: 'デートスポット候補をフリックで選択します。',
    uri: images.welcome03
  },
  {
    title: 'スポット厳選',
    description: 'リストアップした候補を厳選します。',
    uri: images.welcome04
  },
  {
    title: '順番とプラン名',
    description: '訪れる順番とデートプラン名を決定します。',
    uri: images.welcome05
  },
];

/**
 * ウェルカム画面
 * 
 * @author tanakakota
 */
export default class WelcomeScreen extends React.Component {

  /** 完了ボタン押下でホーム画面に遷移する */
  onStartButtonPress = () => {
    this.props.navigation.navigate('main');
  }

  /**
   * 最後のページに完了ボタンを配置する
   * 
   * @param index ページのインデックス
   */
  renderLastButton(index) {
    if (index === SLIDE_DATA.length - 1) {
      return (
        <View>
          <Button
            buttonStyle={{
              backgroundColor: 'orange',
              paddingVertical: 10,
              paddingHorizontal: 50
            }}
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
          {/* TODO 固定ヘッダーにする */}
          <View style={styles.headerStyle}>
            <Text style={styles.headerTextStyle}>プラン作成方法</Text>
          </View>

          <Image
            style={{ flex: 3 }}
            resizeMode="contain"
            source={slide.uri}
          />

          {/* TODO 画像と説明の間にボーダーを入れる */}
          <View style={styles.containerStyle}>
            <Text style={styles.titleStyle}>{slide.title}</Text>
            <Text style={styles.descriptionStyle}>{slide.description}</Text>
          </View>
        
          <View style={styles.footerStyle}>
            {this.renderLastButton(index)}
            <Text style={styles.descriptionStyle}>{index + 1} / 5</Text>
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