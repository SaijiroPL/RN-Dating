import React from "react";
import { useNavigation } from "react-navigation-hooks";
import { Container, Content } from "native-base";

// from app
import ImageGrid from "app/src/components/contents/ImageGrid";
import CompleteFooterButton from "app/src/components/buttons/CompleteFooterButton";

/**
 * デートスポット厳選画面
 * @author kotatanaka
 */
const SelectSpotScreen: React.FC = () => {
  const { navigate } = useNavigation();

  const onCompleteButtonPress = () => {
    navigate("arrange");
  };

  return (
    <Container>
      <Content>
        <ImageGrid />
      </Content>
      <CompleteFooterButton title="次へ" onPress={onCompleteButtonPress} />
    </Container>
  );
};

export default SelectSpotScreen;
