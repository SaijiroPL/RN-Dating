import { Facebook } from 'expo';
import firebase from 'firebase';
import Constants from 'expo-constants';

/** Firebase 初期化 */
firebase.initializeApp(Constants.manifest.extra.firebase);

/**
 * Facebook ログイン認証
 * @author kotatanaka
 */
export const facebookLogin = async () => {
  const { appId } = Constants.manifest.extra.facebook;

  try {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      appId,
      { permissions: ['public_profile'] },
    );

    if (type === 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);

      return firebase
        .auth()
        .signInWithCredential(credential)
        .catch((error) => console.log(`Facebook SignIn Error: ${error}`));
    }
    console.log('Facebook SignIn Cancelled.');

    return { cancelled: true, error: false };
  } catch (e) {
    console.log(`Facebook Auth Error: ${e}`);

    return { cancelled: true, error: true };
  }
};
