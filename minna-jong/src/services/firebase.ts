import firebase from 'firebase';
import { firebaseConfig } from 'firebase/config';

export const initializeFirebase = () => {
  firebase.initializeApp(firebaseConfig);
};

export const getUserInfoByTwitter = async () => {
  const provider = new firebase.auth.TwitterAuthProvider();
  firebase.auth().languageCode = 'ja';
  const result = await firebase.auth().signInWithPopup(provider);
  console.log(result);
  const userInfo = result.additionalUserInfo;
  if (
    userInfo !== null &&
    userInfo !== undefined &&
    userInfo.profile !== null
  ) {
    return {
      userName: (userInfo.profile as any).name as string,
      screenName: (userInfo.profile as any).screen_name as string,
      userId: (userInfo.profile as any).id_str as string,
      iconUrl: ((userInfo.profile as any)
        .profile_image_url_https as string).replace('_normal', ''),
    };
  }
  throw Error('ログインしましたがユーザー情報を取得できませんでした.');
};
