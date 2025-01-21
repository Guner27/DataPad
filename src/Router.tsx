import {DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider} from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './pages/login';
import HomeScreen from './pages/tab/home';
import CategoryScreen from './pages/tab/category';
import ProductsScreen from './pages/tab/products';
import UserEditScreen from './pages/userEdit';
import ProductAddScreen from './pages/productAdd';
import {  Dimensions, Platform, useColorScheme } from 'react-native';
import { Colors } from './constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import Loading from './components/Loading';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const colorScheme = useColorScheme();


  const [isPortrait, setIsPortrait] = useState(true);
  const eventListener = useRef<any>(null); // useRef ile dinleyiciyi sakla

  const updateLayout = () => {
    const { width, height } = Dimensions.get('window');
    setIsPortrait(height > width);
  };
  useEffect(() => {

    eventListener.current = Dimensions.addEventListener('change', updateLayout);
    updateLayout(); // İlk kontrol

    return () => {
      if (eventListener) {
        eventListener.current.remove(); // Dinleyiciyi kaldır
      }
    };
  }, []);
  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
      headerShown: false,
      animation:'none',
      tabBarStyle: Platform.select({
        ios: {
          // Use a transparent background on iOS to show the blur effect
          position: 'absolute',
        },
        default: {
          backgroundColor:Colors[colorScheme ?? 'dark'].tabBarBackground,
          borderTopWidth: 1, // Üst çizgiyi kaldırıyoruz
          borderRightWidth:1,
          borderColor:Colors[colorScheme ?? 'dark'].headerBottomBorder,
        },
      }),
      tabBarPosition:isPortrait ? 'bottom' : 'left',
      tabBarVariant: isPortrait ? 'uikit' : 'material',
      tabBarLabelPosition: isPortrait ? undefined : 'below-icon',
    }}>
      <Tab.Screen name="home" component={HomeScreen} options={{
          title: '',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color }) => <Icon name="home" size={28} color={color}/> }}/>
      <Tab.Screen name="category" component={CategoryScreen} options={{
          title: '',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color }) => <Icon name="server" size={26} color={color}/> }}/>
      <Tab.Screen name="products" component={ProductsScreen} options={{
          title: '',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color }) => <Icon name="shopping-bag" size={26} color={color}/> }}/>
    </Tab.Navigator>
  );
}

function Router(): React.JSX.Element {
  const colorScheme = useColorScheme();
  const userSession = useSelector<any>(s => s.token);
  const isAuthLoading = useSelector<any>(s => s.isALoading);
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <NavigationContainer>

        {isAuthLoading ?
        <Loading/> :
        !userSession ?
        <Stack.Navigator>
        <Stack.Screen name="login" component={LoginScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
        : <>
        <Stack.Navigator>
        <Stack.Screen name="tab" component={MainTabs} options={{ headerShown: false }}/>
        <Stack.Screen name="userEdit" component={UserEditScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="productsAdd" component={ProductAddScreen}/>
        <Tab.Screen name="products" component={ProductsScreen} />
        </Stack.Navigator>
        </>
      }
    </NavigationContainer></ThemeProvider>
  );
}

export default Router;
