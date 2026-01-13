import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { alphabetQuiz } from "./alphabetQuiz";
import { numberQuiz } from "./numberQuiz";

export default function HomeScreen({ navigation }: any) { // <-- receive navigation here
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("./Images/logo.png")}
          style={styles.logo}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Camera')}
        >
          <Text style={styles.buttonText}>Detect Gesture.</Text>
        </TouchableOpacity>



        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Dashboard')} // now works
        >
          <Text style={styles.buttonText}>Learn With Us?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
              navigation.navigate('Help')}>
          <Text style={styles.buttonText}>Help</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Want to know more about us?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AboutUs')}>
            <Text style={styles.footerLink}>Click Here</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBEA',
    alignItems: 'center',
    paddingTop: 150,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 190,
    height: 220,
    marginBottom: 12,
  },
  appName: {
    letterSpacing: 4,
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  buttonsContainer: {
    width: '85%',
    gap: 16,
  },
  button: {
    backgroundColor: '#FBBF24',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111827',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#374151',
  },
  footerLink: {
    fontSize: 12,
    color: '#2563EB',
    marginTop: 4,
    textDecorationLine: 'underline',
  },
});