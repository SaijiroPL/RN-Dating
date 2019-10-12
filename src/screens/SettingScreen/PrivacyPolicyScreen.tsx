import React from "react";
import { WebView } from "react-native";

// from app
import { WEB_ENDPOINT } from "app/src/constants/Url";
import { LoadingSpinner } from "app/src/components/Spinners";

/**
 * プライバシーポリシー画面
 * @author itsukiyamada
 */
const PrivacypolicyScreen: React.FC = () => {
  return (
    <WebView
      source={{ uri: WEB_ENDPOINT.PRIVACY_POLICY }}
      style={{ marginTop: 20 }}
      renderLoading={() => LoadingSpinner}
      startInLoadingState={true}
    />
  );
};

export default PrivacypolicyScreen;
