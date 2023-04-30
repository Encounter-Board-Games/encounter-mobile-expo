import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// eslint-disable-next-line max-len
import * as HomeScreen from '../screens/Home/Home';
import * as SearchScreen from '../screens/Search/Search';
import * as MyOrders from '../screens/Orders/MyOrders';
import * as SettingsScreen from '../screens/Settings/Settings';
import { RootState } from '../types/globals';
import { registerRedirectComponent } from '../store/actions/shared';
import Tab from './TabBarNav';

const HomeStack = createBottomTabNavigator();

function HomeStackScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  React.useEffect(() => {
    registerRedirectComponent((screen: string) => {
      navigation.navigate(screen);
    });
  }, []);

  return (
    <HomeStack.Navigator tabBar={(props) => <Tab {...props} />}>
      <HomeStack.Screen name="Início" component={HomeScreen} />
      <HomeStack.Screen name="Busca" component={SearchScreen} />
      <HomeStack.Screen
        name={translation('menu.orders')}
        component={MyOrders}
      />
      <HomeStack.Screen name="Perfil" component={SettingsScreen} />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
