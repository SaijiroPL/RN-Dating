import React from "react";
import { StyleSheet, View, Button, Image } from "react-native";
import { ImagePicker, Permissions } from "expo";
import { LAYOUT, COLOR } from "app/src/constants";

interface Props {
    title: string;
    onPress?: () => void;
    disabled?: boolean;
  }
/**
 * 画像変更ボタン
 * @author kotatanaka
 */
export const  ImagePickerButton: React.FC<Props> = (props: Props) =>  {
    const { disabled, title, onPress } = props;

  state = {
    hasCameraRollPermission: null,
    photo: null
  };

  async componentWillMount() {
    // カメラロールに対するPermissionを許可
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.SetState({ hasCameraRollPermission: status === "granted" });
  };

  const renderImagePickerButton () => {
    let { hasCameraRollPermission, photo } = this.state;

  if (disabled)
  return
    <View style={thisStyle.container}>
      {hasCameraRollPermission && photo && (
        <Image style={thisStyle.image} source={{ uri: photo.uri }} />
        )}
    <Button
      buttonStyle={thisStyle.button}
      title={title}
      onPress={
        async () => {
      onPress
      // Image Pickerを起動する
      let result = await ImagePicker.launchImageLibraryAsync();
      console.log(result);
      this.setState({ photo: result });
          }}
        />
      </View>
  };
};

/** デフォルト値 */
ImagePickerButton.defaultProps = {
    disabled: false
  };

  /** スタイリング */
  const thisStyle = StyleSheet.create({
    button: {
      backgroundColor: COLOR.tintColor,
      width: LAYOUT.window.width * 0.75
    },
    container: {
      alignItems: "center",
      flex: 1,
      justifyContent: "center"
    },
    image: {
      height: "100%",
      width: "100%"
    }
  });
