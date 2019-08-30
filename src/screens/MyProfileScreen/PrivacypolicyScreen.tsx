import React from "react";
import { WebView } from "react-native";

/**
 * プライバシーポリシー画面
 * @author itsukiyamada
 */
const PrivacypolicyScreen: React.FC = () => {
  return (
    <WebView
      // TODO Webページを実装したらURLを置き換える
      source={{ uri: "https://github.com/facebook/react-native" }}
      style={{ marginTop: 20 }}
    />
  );
};

export default PrivacypolicyScreen;
