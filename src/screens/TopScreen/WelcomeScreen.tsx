import React from "react";
import { Text, View, ScrollView, Image } from "react-native";
import { useNavigation } from "react-navigation-hooks";

// from app
import Images from "app/src/constants/Images";
import CompleteButton from "app/src/components/buttons/CompleteButton";
import appStyle from "app/src/styles/general-style";
import { welcomeScreenStyle } from "app/src/styles/top-screen-style";

// Constants
const SLIDE_DATA = [
  {
    title: "日時の入力",
    description: "デート当日の日付と時間、移動手段を入力します。",
    uri: Images.welcome01
  },
  {
    title: "場所とピン付け",
    description: "マップで大まかな行動範囲を設定します。",
    uri: Images.welcome02
  },
  {
    title: "フリックでリストアップ",
    description: "デートスポット候補をフリックで選択します。",
    uri: Images.welcome03
  },
  {
    title: "スポット厳選",
    description: "リストアップした候補を厳選します。",
    uri: Images.welcome04
  },
  {
    title: "順番とプラン名",
    description: "訪れる順番とデートプラン名を決定します。",
    uri: Images.welcome05
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
      <View key={index} style={welcomeScreenStyle.slide}>
        <View style={appStyle.emptySpace} />

        <Image style={{ flex: 3 }} resizeMode="contain" source={slide.uri} />

        {/* TODO 画像と説明の間にボーダーを入れる */}
        <View style={appStyle.standardContainer}>
          <Text style={welcomeScreenStyle.title}>{slide.title}</Text>
          <Text style={welcomeScreenStyle.description}>
            {slide.description}
          </Text>
        </View>

        <View style={welcomeScreenStyle.footer}>
          {renderLastButton(index)}
          <Text style={welcomeScreenStyle.description}>{index + 1} / 5</Text>
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
