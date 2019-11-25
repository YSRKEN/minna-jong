import { useState, createContext } from 'react';
import { getUserInfoByTwitter } from 'services/firebase';

export type ActionType = 'AuthUser';

export interface Action {
  type: ActionType;
  message: string;
}

interface ApplicationState {
  userName: string;
  screenName: string;
  userId: string;
  iconUrl: string;
  dispatch: (action: Action) => void;
}

export const useStore = (): ApplicationState => {
  const [userName, setUserName] = useState('');
  const [screenName, setScreenName] = useState('');
  const [userId, setUserId] = useState('');
  const [iconUrl, setIconUrl] = useState('');

  const authByTwitter = async () => {
    try {
      const userInfo = await getUserInfoByTwitter();
      setUserName(userInfo.userName);
      setScreenName(userInfo.screenName);
      setUserId(userInfo.userId);
      setIconUrl(userInfo.iconUrl);
    } catch (error) {
      console.log(error);
      window.alert('ログインできませんでした.');
    }
  };

  const dispatch = (action: Action) => {
    switch (action.type) {
      case 'AuthUser':
        authByTwitter();
        break;
      default:
        break;
    }
  };

  return {
    userName,
    screenName,
    userId,
    iconUrl,
    dispatch,
  };
};

export const ApplicationContext = createContext<ApplicationState>(
  {} as ApplicationState,
);
