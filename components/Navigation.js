import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from './LoginScreen';
import MessagesScreen from './MessagesScreen';

export default Navigation = createAppContainer(
  createSwitchNavigator({
    Login: LoginScreen,
    App: MessagesScreen,
  },
    {
      initialRouteName: 'Login',
    }
  )
);
