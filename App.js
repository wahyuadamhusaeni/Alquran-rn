import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DashboardScreen from './screens/Dashboard';
import DetailScreen from './screens/Detail';
import AuthLoadingScreen from './screens/AuthLoadingScreen';


const AppStack = createStackNavigator({ Home: DashboardScreen, Detail: DetailScreen });

export default createAppContainer(createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthLoadingScreen,
  },
  {
    initialRouteName: 'Auth',
  }
));
