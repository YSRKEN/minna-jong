import React, { useState } from 'react';
import firebase from 'firebase';
import {firebaseConfig} from 'firebase/config';

firebase.initializeApp(firebaseConfig);

const App: React.FC = () => {
  const [userName, setUserName] = useState('');

  const onClickLoginByTwitter = () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().languageCode = 'ja';
    firebase.auth().signInWithPopup(provider).then(result => {
      if (result.credential !== null) {
        const credential: firebase.auth.OAuthCredential = result.credential;
        const accessToken = credential.accessToken;
        const secret = credential.secret;
        const user = result.user;
        console.log(credential);
        console.log(accessToken);
        console.log(secret);
        console.log(user);
        if (user !== null) {
          window.alert(`ログイン完了。\naccessToken=${accessToken}\nsecret=${secret}\nuser=${user.displayName}`);
          if (user.displayName !== null) {
            setUserName(user.displayName);
          }
        }
      } else {
        window.alert('アクセストークンを取得できませんでした');
      }
    }).catch(function(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
      console.log(errorCode);
      console.log(errorMessage);
      console.log(email);
      console.log(credential);
      window.alert(`エラー発生。\nrrorCode=${errorCode}\nrrorMessage=${errorMessage}email=${email}`);
    });
  };

  return (
    <div>
      <h1>ミンナジャン</h1>
      {
        userName === ''
        ? <button type="button" onClick={onClickLoginByTwitter}>Twitterでログイン</button>
        : <h2>ユーザー名：{userName}</h2>
      }
    </div>
  );
}

export default App;
