// MainTabNavigator.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styled from 'styled-components/native';
import HomeStackScreen from './HomeStackScreen';
import { RootStackParamList } from './RootStackParamList';
import CurrentLocation from '../screens/Address/CurrentLocation';
import AddAddress from '../screens/Address/component/AddAddress';
import CuponsScreen from '../screens/Cupons/Cupons';
import BillingScreen from '../screens/Orders/BillingScreen';
import ProductDetails from '../screens/Product/ProductDetails';
import Filter from '../screens/Search/Filter';
import AboutScreen from '../screens/Settings/About';
import SelfUpload from '../screens/User/SelfUpload';
import EditProfileScreen from '../screens/User/User';
import UserSettingsScreen from '../screens/User/UserSetting';
// eslint-disable-next-line max-len
import NotificationsListScreen from '../screens/Notifications/NotificationsList';
import AddressScreen from '../screens/Address/Address';
import PaymentScreen from '../screens/Payment/Payment';
import CreatePaymentScreen from '../screens/Payment/CreatePayment';
import UserScreen from '../screens/User/User';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const Stack = createStackNavigator<RootStackParamList>();

export default function MainTabNavigator() {
  return (
    <NavigationContainer>
      <SafeAreaView>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={HomeStackScreen} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="Filter" component={Filter} />
          <Stack.Screen name="Billing" component={BillingScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen
            name="Notifications"
            component={NotificationsListScreen}
          />
          <Stack.Screen name="Cupons" component={CuponsScreen} />
          <Stack.Screen name="UserSettings" component={UserSettingsScreen} />
          <Stack.Screen name="Address" component={AddressScreen} />
          <Stack.Screen name="Payments" component={PaymentScreen} />
          <Stack.Screen name="CreatePayment" component={CreatePaymentScreen} />
          <Stack.Screen name="CurrentLocation" component={CurrentLocation} />
          <Stack.Screen name="AddNewAddress" component={AddAddress} />
          <Stack.Screen name="SelfUpload" component={SelfUpload} />
          <Stack.Screen name="User" component={UserScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
