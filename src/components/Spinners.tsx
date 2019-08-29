import React from "react";
import { RefreshControl } from "react-native";
import { Spinner } from "native-base";

// from app
import Colors from "app/src/constants/Colors";

/** ローディングスピナー */
export const LoadingSpinner = (
  <Spinner color={Colors.tintColor} style={{ flex: 1 }} />
);

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
