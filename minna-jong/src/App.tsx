import React, { useState } from 'react';
import firebase from 'firebase';
import {firebaseConfig} from 'firebase/config';

firebase.initializeApp(firebaseConfig);

const App: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [screenName, setScreenName] = useState('');
  const [userId, setUserId] = useState('');
  const [iconUrl, setIconUrl] = useState('');

  const onClickLoginByTwitter = () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().languageCode = 'ja';
    firebase.auth().signInWithPopup(provider).then(result => {
      console.log(result);
      const userInfo = result.additionalUserInfo;
      if (userInfo !== null && userInfo !== undefined) {
        const profile = userInfo.profile;
        if (profile !== null) {
          setUserName((profile as any).name);
          setScreenName((profile as any).screen_name);
          setUserId((profile as any).id_str);
          setIconUrl(((profile as any).profile_image_url_https as string).replace('_normal', ''));
        }
      } else {
        window.alert('ログインできませんでした。');
      }
    }).catch((error) => {
      console.log(error);
      window.alert(`ログインできませんでした。`);
    });
  };

  return (
    <div>
      <h1>ミンナジャン</h1>
      {
        userName === ''
        ? <button type="button" onClick={onClickLoginByTwitter}>Twitterでログイン</button>
        : <>
          <h2>ユーザー名：{userName}</h2>
          <h2>スクリーンネーム：{screenName}</h2>
          <h2>ユーザーID：{userId}</h2>
          <h2>アイコン：</h2>
          <img src={iconUrl} />
        </>
      }
    </div>
  );
}

export default App;
