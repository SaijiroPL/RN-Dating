import { useEffect, useState } from "react";
import { Platform } from "react-native";
// FIXME expo-image-picker と expo-permissions からのインポートに置き換えたい
import { ImagePicker, Permissions } from "expo";

/**
 * 画像アップロードフック
 * @author kotatanaka
 */
export const useUploadImage = () => {
  /** カメラロールに対するパーミッションの有無 */
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  /** 選択画像 */
  const [image, setImage] = useState(null);

  useEffect(() => {
    getPermissionAsync();
  }, []);

  /** パーミッションの許可 */
  const getPermissionAsync = async () => {
    if (Platform.OS === "ios") {
      try {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        setHasPermission(status === "granted");
      } catch (err) {
        console.log(err);
      }
    }
  };

  /** カメラロールから画像の選択 */
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { hasPermission, image, pickImage };
};
