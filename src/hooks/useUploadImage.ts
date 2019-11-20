import { useEffect, useState } from "react";
import { Platform } from "react-native";
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
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      setHasPermission(status === "granted");
    }
  };

  /** カメラロールから画像の選択 */
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return { hasPermission, image, pickImage };
};
