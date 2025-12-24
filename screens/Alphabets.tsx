import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { alphabetData } from './alphabet'; // your alphabet data

const BottomNav = ({ navigation }: any) => {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Alphabets')}>
        <Text style={styles.navText}>Learn</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Text style={styles.navText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const Alphabet = ({ navigation }: any) => {
  const [index, setIndex] = useState(0);
  const item = alphabetData[index];

  const goPrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const goNext = () => {
    if (index < alphabetData.length - 1) setIndex(index + 1);
  };

  return (
    <View style={styles.container}>
      {/* Main content */}
      <View style={styles.content}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.text}>
          {item.letter} - {item.text}
        </Text>

        <View style={styles.arrowContainer}>
          <TouchableOpacity
            style={[styles.arrowButton, index === 0 && styles.disabled]}
            onPress={goPrev}
            disabled={index === 0}
          >
            <Text style={styles.arrowText}>⬅️</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.arrowButton, index === alphabetData.length - 1 && styles.disabled]}
            onPress={goNext}
            disabled={index === alphabetData.length - 1}
          >
            <Text style={styles.arrowText}>➡️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom navigation */}
      <BottomNav navigation={navigation} />
    </View>
  );
};

export default Alphabet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  text: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: '600',
  },
  arrowContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  arrowButton: {
    marginHorizontal: 30,
    padding: 10,
  },
  arrowText: {
    fontSize: 32,
  },
  disabled: {
    opacity: 0.3,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 15, color: '#6B7280' },
});
