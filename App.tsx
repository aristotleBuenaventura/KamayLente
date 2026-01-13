// App.tsx
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import Dashboard from './screens/Dashboard';
import ProfileScreen from './screens/ProfileScreen';
import MyProgressScreen from './screens/MyProgressScreen';
import LessonScreen from './screens/LessonScreen';
import QuizScreen from './screens/QuizScreen';
import { ProgressProvider } from './screens/ProgressContext';
import { QuizProgressProvider } from './screens/QuizProgressContext';
import QuizProgressScreen from './screens/QuizProgressScreen';
import AboutUs from './screens/AboutUs';
import Help from './screens/Help';
import CameraScreen from './screens/CameraScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ProgressProvider>
      <QuizProgressProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Lesson" component={LessonScreen} />
            <Stack.Screen name="QuizScreen" component={QuizScreen} />
            <Stack.Screen name="MyProgressScreen" component={MyProgressScreen} />
            <Stack.Screen name="QuizProgressScreen" component={QuizProgressScreen} />
            <Stack.Screen name="AboutUs" component={AboutUs} />
            <Stack.Screen name="Help" component={Help} />
          </Stack.Navigator>
        </NavigationContainer>
      </QuizProgressProvider>
    </ProgressProvider>
  );
}
