import React from "react";
import { ActivityIndicator, RefreshControl } from "react-native";
import { Spinner } from "native-base";

// from app
import { COLOR } from "app/src/constants";

/** ローディングスピナー(画面中央) */
export const LoadingSpinner = (
  <Spinner color={COLOR.tintColor} style={{ flex: 1 }} />
);

/** ローディングスピナー(適宜配置) */
export const Indicator = <ActivityIndicator color={COLOR.tintColor} />;

/** プルリロードスピナー */
export const RefreshSpinner = (
  isRefreshing: boolean,
  onRefresh: () => void
) => (
  <RefreshControl
    refreshing={isRefreshing}
    onRefresh={onRefresh}
    tintColor={COLOR.tintColor}
  />
);
