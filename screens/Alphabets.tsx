import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { alphabetData } from './alphabet';

const Alphabet: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {alphabetData.map((item, index) => (
        <View key={index} style={styles.card}>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.text}>
            {item.letter} - {item.text}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Alphabet;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
  },
  text: {
    marginTop: 8,
    fontSize: 16,
  },
});
