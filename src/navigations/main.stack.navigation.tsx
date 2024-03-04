import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainStackNavigationModel} from 'models';
import {
  AddCategoryScreen,
  DetailCategoryScreen,
  EditCategoryScreen,
  FriendScreen,
  HomeScreen,
  ListCategoriesScreen,
  LoginScreen,
  ProfileScreen,
  SignUpScreen,
  SplashScreen,
} from 'screens';

const Stack = createNativeStackNavigator<MainStackNavigationModel>();
export const MainStackNavigation: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Splash'}
      screenOptions={{
        headerShown: false,
        animation: 'ios',
      }}>
      <Stack.Screen name={'Splash'} component={SplashScreen} />
      <Stack.Screen name={'Login'} component={LoginScreen} />
      <Stack.Screen name={'SignUp'} component={SignUpScreen} />
      <Stack.Screen name={'Home'} component={HomeScreen} />
      <Stack.Screen name={'Friend'} component={FriendScreen} />
      <Stack.Screen name={'Profile'} component={ProfileScreen} />
      <Stack.Screen name={'ListCategories'} component={ListCategoriesScreen} />
      <Stack.Screen name={'AddCategory'} component={AddCategoryScreen} />
      <Stack.Screen name={'EditCategory'} component={EditCategoryScreen} />
      <Stack.Screen name={'DetailCategory'} component={DetailCategoryScreen} />
    </Stack.Navigator>
  );
};
