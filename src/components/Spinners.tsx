import React from "react";
import { RefreshControl } from "react-native";

// from app
import Colors from "app/src/constants/Colors";

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
