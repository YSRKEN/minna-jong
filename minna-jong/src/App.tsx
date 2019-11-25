import React from 'react';
import { useStore, ApplicationContext } from 'states/Application';
import UserCard from 'containers/UserCard';
import { initializeFirebase } from 'services/firebase';

initializeFirebase();

const App: React.FC = () => {
  const state = useStore();

  return (
    <ApplicationContext.Provider value={state}>
      <div>
        <h1>ミンナジャン</h1>
        <UserCard />
      </div>
    </ApplicationContext.Provider>
  );
};

export default App;
