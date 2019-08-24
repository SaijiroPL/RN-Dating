import React, { useState } from "react";
import { Image } from "react-native";
import Carousel from "react-native-snap-carousel";

// from app
import { Plan } from "app/src/types/api/TPlan";
import Images from "app/src/constants/Images";
import Layout from "app/src/constants/Layout";
import { imageCarouselStyle } from "app/src/styles/common-component-style";

interface Props {
  plan: Plan;
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
const ImageCarousel: React.FC<Props> = (props: Props) => {
  const renderImageItem = ({ item }: { item: any }) => {
    return <Image style={imageCarouselStyle.image} source={item.image} />;
  };

  return (
    <Carousel
      data={SAMPLE_DATA}
      renderItem={renderImageItem}
      sliderWidth={Layout.window.width}
      itemWidth={Layout.window.width * 0.8}
      containerCustomStyle={imageCarouselStyle.comtainer}
      slideStyle={imageCarouselStyle.slide}
      // layout={"default"}
      // firstItem={0}
    />
  );
};

export default ImageCarousel;
