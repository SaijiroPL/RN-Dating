import React, { useState } from "react";
import { Image, StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";

// from app
import { IPlan } from "app/src/interfaces/api/Plan";
import Images from "app/src/constants/Images";
import Layout from "app/src/constants/Layout";

interface Props {
  plan: IPlan;
}

// 仮データ
const SAMPLE_DATA = [
  {
    image: Images.noImage
  },
  {
    image: Images.noImage
  },
  {
    image: Images.noImage
  }
];

/**
 * 画像スライドカルーセル
 * @author kotatanaka
 */
export const ImageCarousel: React.FC<Props> = (props: Props) => {
  const renderImageItem = ({ item }: { item: any }) => {
    return <Image style={thisStyle.image} source={item.image} />;
  };

  return (
    <Carousel
      data={SAMPLE_DATA}
      renderItem={renderImageItem}
      sliderWidth={Layout.window.width}
      itemWidth={Layout.window.width * 0.8}
      containerCustomStyle={thisStyle.container}
      slideStyle={thisStyle.slide}
      // layout={"default"}
      // firstItem={0}
    />
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  container: {
    // flex: 1,
    marginVertical: 5
  },
  slide: {
    // flex: 1,
    height: Layout.window.height * 0.23,
    shadowColor: "#ccc",
    shadowOffset: {
      height: 0,
      width: 0
    },
    shadowOpacity: 1,
    shadowRadius: 2
  },
  image: {
    flex: 1,
    width: Layout.window.width * 0.8
  }
});
