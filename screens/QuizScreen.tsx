import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function QuizScreen() {
  const route = useRoute<any>();
  const quiz = route.params?.quiz; // ✅ CORRECT SOURCE

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  // 🔒 HARD GUARD (prevents crash)
  if (!quiz || !Array.isArray(quiz.questions)) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red", textAlign: "center" }}>
          Quiz data is missing
        </Text>
      </View>
    );
  }

  const question = quiz.questions[index];

  // 🔒 Index safety
  if (!question) {
    return (
      <View style={styles.container}>
        <Text>No question found</Text>
      </View>
    );
  }

  const onSelect = (choiceId: string) => {
    setSelected(choiceId);

    setTimeout(() => {
      setSelected(null);
      if (index < quiz.questions.length - 1) {
        setIndex(index + 1);
      }
    }, 600);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{quiz.title}</Text>
      <Text style={styles.progress}>
        {index + 1} / {quiz.questions.length}
      </Text>

      {question.choices.map((c: any) => (
        <TouchableOpacity
          key={c.id}
          style={[
            styles.choice,
            selected === c.id &&
              (c.id === question.correctChoiceId
                ? styles.correct
                : styles.wrong),
          ]}
          onPress={() => onSelect(c.id)}
        >
          <Text style={styles.choiceText}>{c.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBEA",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  progress: {
    textAlign: "center",
    marginBottom: 20,
  },
  choice: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
  },
  choiceText: {
    fontSize: 18,
    textAlign: "center",
  },
  correct: {
    backgroundColor: "#C8E6C9",
  },
  wrong: {
    backgroundColor: "#FFCDD2",
  },
});

