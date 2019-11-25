import React, { useContext } from 'react';
import { ApplicationContext } from 'states/Application';

const UserCard: React.FC = () => {
  const { userName, screenName, userId, iconUrl, dispatch } = useContext(
    ApplicationContext,
  );

  if (userName === '') {
    const authByTwitter = () => dispatch({ type: 'AuthUser', message: '' });

    return (
      <button type="button" onClick={authByTwitter}>
        Twitterでログイン
      </button>
    );
  }

  return (
    <>
      <h2>ユーザー名：{userName}</h2>
      <h2>スクリーンネーム：{screenName}</h2>
      <h2>ユーザーID：{userId}</h2>
      <h2>アイコン：</h2>
      <img src={iconUrl} alt={userName} />
    </>
  );
};

export default UserCard;
