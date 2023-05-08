import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/Home';
import SearchScreen from '../screens/search/Search';
import MyOrders from '../screens/orders/MyOrders';
import SettingsScreen from '../screens/settings/Settings';
import { registerRedirectComponent } from '../store/actions/shared';
import TabBarNav from './TabBarNav';
import { Theme } from '../theme/theme';

interface HomeStackScreenProps {}

const HomeStack = createBottomTabNavigator();

const HomeStackScreen: React.FC<HomeStackScreenProps> = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    registerRedirectComponent((screen: string) => {
      navigation.navigate(screen);
    });
  }, [navigation]);

  const settingsScreenWrapper = (props: { theme: Theme }) => (
    <SettingsScreen {...props} />
  );

  return (
    <HomeStack.Navigator
      tabBar={(props: BottomTabBarProps) => <TabBarNav {...props} />}
    >
      <HomeStack.Screen name="Início" component={HomeScreen} />
      <HomeStack.Screen name="Busca" component={SearchScreen} />
      <HomeStack.Screen name="Orders" component={MyOrders} />
      <HomeStack.Screen name="Perfil" component={settingsScreenWrapper} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
