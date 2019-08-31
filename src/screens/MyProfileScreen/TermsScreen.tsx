import React from "react";
import { WebView } from "react-native";

// from app
import { LoadingSpinner } from "app/src/components/Spinners";

/**
 * 利用規約画面
 * @author itsukiyamada
 */
const TermsScreen: React.FC = () => {
  return (
    <WebView
      // TODO Webページを実装したらURLを置き換える
      source={{ uri: "https://github.com/facebook/react-native" }}
      style={{ marginTop: 20 }}
      renderLoading={() => LoadingSpinner}
      startInLoadingState={true}
    />
  );
};

export default TermsScreen;
