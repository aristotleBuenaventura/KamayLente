// App.tsx
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import Dashboard from './screens/Dashboard';
import ProfileScreen from './screens/ProfileScreen';
import MyProgressScreen from './screens/MyProgressScreen';
import LessonScreen from './screens/LessonScreen'; // NEW dynamic screen
import QuizScreen from './screens/QuizScreen';
import { ProgressProvider } from './screens/ProgressContext';

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
          <Stack.Screen name="Lesson" component={LessonScreen} />
          <Stack.Screen name="QuizScreen" component={QuizScreen} />
          <Stack.Screen name="MyProgressScreen" component={MyProgressScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProgressProvider>
  );
}
