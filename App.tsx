// App.tsx
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import Dashboard from './screens/Dashboard';
import ProfileScreen from './screens/ProfileScreen';
import Alphabets from './screens/Alphabets';
import Numbers from './screens/Numbers';
import MyProgressScreen from './screens/MyProgressScreen';
import { ProgressProvider } from './screens/ProgressContext';
import QuizScreen from './screens/QuizScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
   <ProgressProvider>
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Alphabets" component={Alphabets} />
        <Stack.Screen name="Numbers" component={Numbers} />
        <Stack.Screen name="QuizScreen" component={QuizScreen} />
        <Stack.Screen name="MyProgressScreen" component={MyProgressScreen} />
      </Stack.Navigator>
    </NavigationContainer>
   </ProgressProvider>
  );
}
