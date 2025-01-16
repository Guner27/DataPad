import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './pages/login';
import HomeScreen from './pages/tab/home';
import CategoryScreen from './pages/tab/category';
import ProductsScreen from './pages/tab/products';
import UserEditScreen from './pages/userEdit';
import ProductAddScreen from './pages/productAdd';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="category" component={CategoryScreen} />
      <Tab.Screen name="products" component={ProductsScreen} />
    </Tab.Navigator>
  );
}

function Router(): React.JSX.Element {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={LoginScreen}/>
        <Stack.Screen name="tab" component={MainTabs} options={{ headerShown: false }}/>
        <Stack.Screen name="userEdit" component={UserEditScreen}/>
        <Stack.Screen name="productsAdd" component={ProductAddScreen}/>
        <Tab.Screen name="products" component={ProductsScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
