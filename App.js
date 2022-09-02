import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import 'react-native-gesture-handler';
import HomeScreen from './app/screens/HomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import ProfileData from './app/screens/ProfileData';
import ProfileScreen from './app/screens/ProfileScreen';
import ValidationScreen from './app/screens/ValidationScreen';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
      // initialRouteName="Profile"
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Validate"
          component={ValidationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProfileData"
          component={ProfileData}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({});

export default App;
