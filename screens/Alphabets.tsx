import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { alphabetData } from './alphabet';

const Alphabet: React.FC = () => {
  const [index, setIndex] = useState(0);
  const item = alphabetData[index];

  const goPrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const goNext = () => {
    if (index < alphabetData.length - 1) {
      setIndex(index + 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Image */}
      <Image source={item.image} style={styles.image} />

      {/* Text */}
      <Text style={styles.text}>
        {item.letter} - {item.text}
      </Text>

      {/* Arrows */}
      <View style={styles.arrowContainer}>
        <TouchableOpacity
          style={[styles.arrowButton, index === 0 && styles.disabled]}
          onPress={goPrev}
          disabled={index === 0}
        >
          <Text style={styles.arrowText}>⬅️</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.arrowButton,
            index === alphabetData.length - 1 && styles.disabled,
          ]}
          onPress={goNext}
          disabled={index === alphabetData.length - 1}
        >
          <Text style={styles.arrowText}>➡️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Alphabet;

const styles = StyleSheet.create({
  container: {
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
});
