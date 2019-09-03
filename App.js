import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import LoginScreen from './components/LoginScreen'
import MessagesScreen from './components/MessagesScreen'

export default function App() {
  return (
    <Navigation />
  );
}

const Navigation = createAppContainer(
  createSwitchNavigator({
    Login: LoginScreen,
    App: MessagesScreen,
  },
    {
      initialRouteName: 'Login',
    }
  )
);
