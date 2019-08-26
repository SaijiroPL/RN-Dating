import React from "react";
import { WebView } from "react-native";


const TermsScreen: React.FC = () => {

  return (
          <WebView
            source={{uri: 'https://github.com/facebook/react-native'}}
            style={{marginTop: 20}}
          />
  );
};

export default TermsScreen;
