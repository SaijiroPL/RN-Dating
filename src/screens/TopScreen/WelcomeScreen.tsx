import React from "react";
import { Text, View, ScrollView, Image } from "react-native";
import { useNavigation } from "react-navigation-hooks";

// from app
import images from "app/src/constants/images";
import { topStyle, welocomeStyle } from "app/src/styles/top-screen-style";
import CompleteButton from "app/src/components/buttons/CompleteButton";

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

/**
 * ウェルカム画面
 * @author kotatanaka
 */
const WelcomeScreen: React.FC = () => {
  const { navigate } = useNavigation();

  /** 完了ボタン押下で基本情報入力画面に遷移する */
  const onStartButtonPress = () => {
    navigate("entry");
  };

  /** 最後のページに完了ボタンを配置する */
  const renderLastButton = (index: number) => {
    if (index === SLIDE_DATA.length - 1) {
      return (
        <View>
          <CompleteButton title="完了" onPress={onStartButtonPress} />
        </View>
      );
    }
  };

  /** 各ステップページの描画 */
  const renderSlides = () => {
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
          {renderLastButton(index)}
          <Text style={welocomeStyle.description}>{index + 1} / 5</Text>
        </View>
      </View>
    ));
  };

  /** スクロールビューの描画 */
  return (
    <ScrollView horizontal pagingEnabled style={{ flex: 1 }}>
      {renderSlides()}
    </ScrollView>
  );
};

export default WelcomeScreen;
