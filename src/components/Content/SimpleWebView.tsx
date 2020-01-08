import React from "react";
import { WebView } from "react-native-webview";

// from app
import { LoadingSpinner } from "app/src/components/Spinners";

interface Props {
  uri: string;
}

/**
 * WebView
 * @author kotatanaka
 */
export const SimpleWebView: React.FC<Props> = (props: Props) => {
  const renderLoadingSpinner = (): JSX.Element => LoadingSpinner;

  return (
    <WebView
      source={{ uri: props.uri }}
      style={{ marginTop: 20 }}
      renderLoading={renderLoadingSpinner}
      startInLoadingState
    />
  );
};
