import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3209/3209265.png' }}
          style={styles.logo}
        />
        <Text style={styles.appName}>KAMAY-LENTE</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>📷  Detect Gesture.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>✋  Learn With Us?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>❓  Help</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Want to know more about us?</Text>
        <Text style={styles.footerLink}>Click Here</Text>
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
    width: 140,
    height: 140,
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
    fontSize: 16,
    fontWeight: '700',
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