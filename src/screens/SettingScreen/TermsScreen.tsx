import React from "react";
import { WebView } from "react-native";

// from app
import { WEB_ENDPOINT } from "app/src/constants/Url";
import { LoadingSpinner } from "app/src/components/Spinners";

/**
 * 利用規約画面
 * @author itsukiyamada
 */
const TermsScreen: React.FC = () => {
  return (
    <WebView
      source={{ uri: WEB_ENDPOINT.TERMS }}
      style={{ marginTop: 20 }}
      renderLoading={() => LoadingSpinner}
      startInLoadingState={true}
    />
  );
};

export default TermsScreen;
