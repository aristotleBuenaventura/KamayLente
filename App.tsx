// App.tsx
import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import Dashboard from './screens/Dashboard';
import ProfileScreen from './screens/ProfileScreen';
import MyProgressScreen from './screens/MyProgressScreen';
import LessonScreen from './screens/LessonScreen';
import QuizScreen from './screens/QuizScreen';
import QuizProgressScreen from './screens/QuizProgressScreen';
import AboutUs from './screens/AboutUs';
import Help from './screens/Help';

import { ProgressProvider } from './screens/ProgressContext';
import { QuizProgressProvider } from './screens/QuizProgressContext';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkKillSwitch = async () => {
      try {
        const res = await fetch(
          'https://drive.google.com/uc?export=download&id=1LO9Ej8N81u4X3ci6CPcXqlLScilWPo22'
        );
        const config = await res.json();

        if (config.appDisabled) {
          setDisabled(true);
          setMessage(config.message || '');
        }
      } catch (err) {
        console.log('Kill switch check failed:', err);
      } finally {
        setLoading(false);
      }
    };

    checkKillSwitch();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Checking app status...</Text>
      </View>
    );
  }

  if (disabled) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}></Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    );
  }

  return (
    <ProgressProvider>
      <QuizProgressProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <Stack.Navigator screenOptions={{ headerShown: false }}>

          </Stack.Navigator>
        </NavigationContainer>
      </QuizProgressProvider>
    </ProgressProvider>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
  },
});
