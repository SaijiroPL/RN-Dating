import * as React from "react";
import { Text, View, ScrollView, Image } from "react-native";
import { Button } from "react-native-elements";

// from app
import images from "app/src/constants/images";
import colors from "app/src/constants/colors";
import { topStyle, welocomeStyle } from "app/src/styles/top-style";

// Constants
const SLIDE_DATA = [
  {
    title: "日時の入力",
    description: "デート当日の日付と時間、移動手段を入力します。",
    uri: images.welcome01
  },
  {
    title: "場所とピン付け",
    description: "マップで大まかな行動範囲を設定します。",
    uri: images.welcome02
  },
  {
    title: "フリックでリストアップ",
    description: "デートスポット候補をフリックで選択します。",
    uri: images.welcome03
  },
  {
    title: "スポット厳選",
    description: "リストアップした候補を厳選します。",
    uri: images.welcome04
  },
  {
    title: "順番とプラン名",
    description: "訪れる順番とデートプラン名を決定します。",
    uri: images.welcome05
  }
];

interface Props {
  navigation: any;
}

/**
 * ウェルカム画面
 * @author kotatanaka
 */
export default class WelcomeScreen extends React.Component<Props> {
  /** 完了ボタン押下で基本情報入力画面に遷移する */
  onStartButtonPress = () => {
    this.props.navigation.navigate("entry");
  };

  /**
   * 最後のページに完了ボタンを配置する
   * @param index ページのインデックス
   */
  renderLastButton(index: number) {
    if (index === SLIDE_DATA.length - 1) {
      return (
        <View>
          <Button
            buttonStyle={{
              backgroundColor: colors.tintColor,
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
    return SLIDE_DATA.map((slide, index) => (
      <View key={index} style={welocomeStyle.slide}>
        <View style={topStyle.emptySpace} />

        <Image style={{ flex: 3 }} resizeMode="contain" source={slide.uri} />

        {/* TODO 画像と説明の間にボーダーを入れる */}
        <View style={topStyle.topContainer}>
          <Text style={welocomeStyle.title}>{slide.title}</Text>
          <Text style={welocomeStyle.description}>{slide.description}</Text>
        </View>

        <View style={welocomeStyle.footer}>
          {this.renderLastButton(index)}
          <Text style={welocomeStyle.description}>{index + 1} / 5</Text>
        </View>
      </View>
    ));
  }

  /** スクロールビューの描画 */
  render() {
    return (
      <ScrollView horizontal pagingEnabled style={{ flex: 1 }}>
        {this.renderSlides()}
      </ScrollView>
    );
  }
}
