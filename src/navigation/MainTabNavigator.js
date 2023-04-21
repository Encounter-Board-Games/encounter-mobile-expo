import * as React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector, useDispatch } from "react-redux";
import styled, { withTheme } from "styled-components/native";
import { translation } from "../texts";
import { registerRedirectComponent } from "../store/actions/shared";
import HomeScreen from "../screens/Home/Home";
import SearchScreen from "../screens/Search/Search";
import ProductDetails from "../screens/Product/ProductDetails";
import Filter from "../screens/Search/Filter";
import CuponsScreen from "../screens/Cupons/Cupons";
import MyOrders from "../screens/Orders/MyOrders";
import BillingScreen from "../screens/Orders/BillingScreen";
import EditProfileScreen from "../screens/User/EditProfile";
import NotificationsListScreen from "../screens/Notifications/NotificationsList";
import UserSettingsScreen from "../screens/User/UserSetting";
import SettingsScreen from "../screens/Settings/Settings";
import PaymentScreen from "../screens/Payment/Payment";
import CreatePaymentScreen from "../screens/Payment/CreatePayment";
import AddressScreen from "../screens/Address/Address";
import CurrentLocation from "../screens/Address/CurrentLocation";
import AddAddress from "../screens/Address/component/AddAddress";
import SelfUpload from "../screens/User/SelfUpload";
import CartInfo from "../screens/Cart/components/CartInfo";
import UserScreen from "../screens/User/User";
import CompleteInfos from "../screens/User/CompleteInfos";
import Tutorial from "../screens/Search/Tutorial";
import AboutScreen from "../screens/Settings/About";
import { View, Dimensions } from "react-native";
import Discovery from "../screens/Discovery/Discovery";
import Onboarding from "../screens/Onboarding/Onboarding";
import QuickSearchs from "../screens/QuickSearchs/QuickSearchs";
import RenewCartInfo from "../screens/Cart/components/RenewCartInfo";

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const HomeStack = createBottomTabNavigator();

function HomeStackScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const quickSearchs = useSelector((state) => state.quickSearchs);
  const quickSearch =
    Object.keys(quickSearchs).length == 0
      ? undefined
      : quickSearchs[Object.keys(quickSearchs)[0]];
  const { open: onboardIsOpened = false } = useSelector(
    (state) => state.onboarding
  );
  const { open: discoveryIsOpened = false } = useSelector(
    (state) => state.discovery
  );
  const { tutorial = false } = useSelector((state) => state.filters);

  React.useEffect(() => {
    const navigation = useNavigation();
    registerRedirectComponent((screen) => {
      navigation.navigate(screen);
    });
  }, []);

  return (
    <SafeAreaView>
      <CartInfo />
      {user?.needCompleteInfos && <CompleteInfos />}
      {tutorial && <Tutorial />}
      {quickSearch && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            zIndex: 100,
          }}
        >
          <QuickSearchs quickSearch={quickSearch} />
        </View>
      )}
      {(onboardIsOpened || discoveryIsOpened) && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            zIndex: 100,
          }}
        >
          {discoveryIsOpened ? <Discovery /> : <Onboarding />}
        </View>
      )}

      <HomeStack.Navigator
        initialRouteName="Início"
        tabBar={(props) => <TabNav {...props} />}
      >
        <HomeStack.Screen name="Início" component={HomeScreen} />
        <HomeStack.Screen name="Busca" component={SearchScreen} />
        <HomeStack.Screen
          name={translation("menu.orders")}
          component={MyOrders}
        />
        <HomeStack.Screen name="Perfil" component={SettingsScreen} />
      </HomeStack.Navigator>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

const SettingsStack = createStackNavigator();
const T = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SettingsStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="ProductDetails" component={ProductDetails} />
        <Tab.Screen name="Filter" component={Filter} />
        <Tab.Screen name="Billing" component={BillingScreen} />
        <Tab.Screen name="EditProfile" component={EditProfileScreen} />
        <Tab.Screen name="Notifications" component={NotificationsListScreen} />
        <Tab.Screen name="Cupons" component={CuponsScreen} />
        <Tab.Screen name="UserSettings" component={UserSettingsScreen} />
        <Tab.Screen name="Address" component={AddressScreen} />
        <Tab.Screen name="Payments" component={PaymentScreen} />
        <Tab.Screen name="CreatePayment" component={CreatePaymentScreen} />
        <Tab.Screen name="CurrentLocation" component={CurrentLocation} />
        <Tab.Screen name="AddNewAddress" component={AddAddress} />
        <Tab.Screen name="SelfUpload" component={SelfUpload} />
        <Tab.Screen name="User" component={UserScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
      </SettingsStack.Navigator>
    </NavigationContainer>
  );
}
