import React, { useCallback } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// from app
import { COLOR, IMAGE, LAYOUT } from 'app/src/constants';
import { CompleteButton } from 'app/src/components/Button';
import { appStyle } from 'app/src/styles';

// Constants
const SLIDE_DATA = [
  {
    title: '日時の入力',
    description: 'デート当日の日付と時間、移動手段を入力します。',
    uri: IMAGE.welcome01,
  },
  {
    title: '場所とピン付け',
    description: 'マップで大まかな行動範囲を設定します。',
    uri: IMAGE.welcome02,
  },
  {
    title: 'フリックでリストアップ',
    description: 'デートスポット候補をフリックで選択します。',
    uri: IMAGE.welcome03,
  },
  {
    title: 'スポット厳選',
    description: 'リストアップした候補を厳選します。',
    uri: IMAGE.welcome04,
  },
  {
    title: '順番とプラン名',
    description: '訪れる順番とデートプラン名を決定します。',
    uri: IMAGE.welcome05,
  },
];

/** ウェルカム画面 */
const WelcomeScreen: React.FC = () => {
  const { navigate } = useNavigation();

  /** 完了ボタン押下で基本情報入力画面に遷移する */
  const onStartButtonPress = useCallback(() => {
    navigate('Entry');
  }, []);

  return (
    <ScrollView horizontal pagingEnabled style={{ flex: 1 }}>
      {SLIDE_DATA.map((slide, index) => (
        <View key={index} style={thisStyle.slide}>
          <View style={appStyle.emptySpace} />
          <Image style={{ flex: 3 }} resizeMode="contain" source={slide.uri} />

          {/* TODO 画像と説明の間にボーダーを入れる */}
          <View style={appStyle.standardContainer}>
            <Text style={thisStyle.title}>{slide.title}</Text>
            <Text style={thisStyle.description}>{slide.description}</Text>
          </View>

          <View style={thisStyle.footer}>
            {/* 最後のページに完了ボタンを配置する */}
            {index === SLIDE_DATA.length - 1 && (
              <View>
                <CompleteButton title="完了" onPress={onStartButtonPress} />
              </View>
            )}
            <Text style={thisStyle.description}>{index + 1} / 5</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  slide: {
    alignItems: 'center',
    flex: 1,
    width: LAYOUT.window.width,
  },
  footer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: COLOR.textTintColor,
    fontFamily: 'genju-medium',
    fontSize: 20,
    padding: 10,
  },
  description: {
    color: COLOR.textTintColor,
    fontFamily: 'genju-medium',
    fontSize: 15,
    padding: 10,
  },
});

export default WelcomeScreen;
