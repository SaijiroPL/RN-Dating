import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { Button, Text, View } from "native-base";
// import { AntDesign } from "@expo/vector-icons";

// from app
import { COLOR } from "app/src/constants";
import { appTextStyle } from "app/src/styles";

interface Props {
  spot: string;
  addspot: boolean;
  onaddspot: (id: string) => Promise<boolean>;
  reload: () => Promise<void>;
}

/**
 * スポット追加ボタン
 * @author itsukiyamada
 */
export const AddSpotButton: React.FC<Props> = (props: Props) => {
  const { spot, addspot, onaddspot, reload } = props;

  /** スポット追加 */
  const addspot = useCallback(async (): Promise<void> => {
    const result = await onAddspot(spot);
    if (result) {
      reload();
    }
  }, [spot]);

  // スポット追加ボタン
  return (
    <Button small rounded light color={COLOR.textTintColor} onPress={addspot}>
      {/* <AntDesign
        name="pluscircleo"
        size={15}
        style={{ color: COLOR.tintColor, marginLeft: 15 }}
      /> */}
      <Text style={appTextStyle.standardLightText}>＋ 追加</Text>
    </Button>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  unfollowButton: {
    backgroundColor: COLOR.tintColor
  }
});
