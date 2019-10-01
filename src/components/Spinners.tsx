import React from "react";
import { ActivityIndicator, RefreshControl } from "react-native";
import { Spinner } from "native-base";

// from app
import Colors from "app/src/constants/Colors";

/** ローディングスピナー(画面中央) */
export const LoadingSpinner = (
  <Spinner color={Colors.tintColor} style={{ flex: 1 }} />
);

/** ローディングスピナー(適宜配置) */
export const Indicator = <ActivityIndicator color={Colors.tintColor} />;

/** プルリロードスピナー */
export const RefreshSpinner = (
  isRefreshing: boolean,
  onRefresh: () => void
) => (
  <RefreshControl
    refreshing={isRefreshing}
    onRefresh={onRefresh}
    tintColor={Colors.tintColor}
  />
);
