import React from "react";
import { StyleSheet, View, Button, Image } from "react-native";
import { ImagePicker, Permissions } from "expo";

export default class App extends React.Component {
  state = {
    hasCameraRollPermission: null,
    photo: null
  };

  async componentWillMount() {
    // カメラロールに対するPermissionを許可
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraRollPermission: status === "granted" });
  }

  render() {
    let { hasCameraRollPermission, photo } = this.state;

    return (
      <View style={styles.container}>
        {hasCameraRollPermission && photo && (
          <Image style={styles.image} source={{ uri: photo.uri }} />
        )}
        <Button
          title={"open Image Picker."}
          onPress={async () => {
            // Image Pickerを起動する
            let result = await ImagePicker.launchImageLibraryAsync();
            console.log(result);
            this.setState({ photo: result });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
