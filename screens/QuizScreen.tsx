import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useRoute } from "@react-navigation/native";

export default function QuizScreen() {
  const route = useRoute<any>();
  const quiz = route.params?.quiz;

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  if (!quiz || !quiz.questions) {
    return (
      <View style={styles.container}>
        <Text>Quiz data missing</Text>
      </View>
    );
  }

  const question = quiz.questions[index];

  const isCorrect = selected === question.correctChoiceId;

  const nextQuestion = () => {
    setChecked(false);
    setSelected(null);
    if (index < quiz.questions.length - 1) {
      setIndex(index + 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Progress */}
      <Text style={styles.progressText}>
        QUESTION {index + 1} OF {quiz.questions.length}
      </Text>

      <View style={styles.progressBarBg}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${((index + 1) / quiz.questions.length) * 100}%` },
          ]}
        />
      </View>

      {/* Question */}
      <Text style={styles.questionText}>
        What does this sign mean?
      </Text>

      {/* Image Card */}
      <View style={styles.imageCard}>
        {question.image && (
          <Image source={question.image} style={styles.image} />
        )}
      </View>

      {/* Choices */}
      {question.choices.map((c: any, i: number) => {
        const letter = String.fromCharCode(65 + i); // A B C D

        const correct =
          checked && c.id === question.correctChoiceId;
        const wrong =
          checked && selected === c.id && c.id !== question.correctChoiceId;

        return (
          <TouchableOpacity
            key={c.id}
            disabled={checked}
            onPress={() => setSelected(c.id)}
            style={[
              styles.choice,
              selected === c.id && styles.choiceSelected,
              correct && styles.correct,
              wrong && styles.wrong,
            ]}
          >
            <View style={styles.choiceLetter}>
              <Text style={styles.choiceLetterText}>{letter}</Text>
            </View>
            <Text style={styles.choiceText}>{c.label}</Text>
          </TouchableOpacity>
        );
      })}

      {/* Button */}
      <TouchableOpacity
        style={[
          styles.checkButton,
          !selected && { opacity: 0.5 },
        ]}
        disabled={!selected}
        onPress={() => {
          if (!checked) {
            setChecked(true);
          } else {
            nextQuestion();
          }
        }}
      >
        <Text style={styles.checkButtonText}>
          {checked ? "Next" : "Check Answer"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: "#FFFBEA",
     padding: 20,
   },

   progressText: {
     fontSize: 12,
     color: "#777",
     marginBottom: 6,
   },

   progressBarBg: {
     height: 6,
     backgroundColor: "#E6E6E6",
     borderRadius: 3,
     marginBottom: 20,
   },

   progressBarFill: {
     height: 6,
     backgroundColor: "#FFC107",
     borderRadius: 3,
   },

   questionText: {
     fontSize: 22,
     fontWeight: "700",
     marginBottom: 16,
     color: "#1E1E1E",
   },

   imageCard: {
     backgroundColor: "#F3C9A9",
     borderRadius: 16,
     padding: 20,
     alignItems: "center",
     marginBottom: 20,
   },

   image: {
     width: 200,
     height: 200,
     resizeMode: "contain",
   },

   choice: {
     flexDirection: "row",
     alignItems: "center",
     backgroundColor: "#FFFFFF",
     padding: 14,
     borderRadius: 14,
     marginBottom: 12,
     borderWidth: 1,
     borderColor: "#EEE",
   },

   choiceSelected: {
     borderColor: "#FFC107",
   },

   choiceLetter: {
     width: 32,
     height: 32,
     borderRadius: 8,
     backgroundColor: "#F2F2F2",
     alignItems: "center",
     justifyContent: "center",
     marginRight: 12,
   },

   choiceLetterText: {
     fontWeight: "700",
     color: "#555",
   },

   choiceText: {
     fontSize: 16,
     color: "#333",
   },

   correct: {
     backgroundColor: "#E8F5E9",
     borderColor: "#4CAF50",
   },

   wrong: {
     backgroundColor: "#FDECEA",
     borderColor: "#F44336",
   },

   checkButton: {
     backgroundColor: "#FFC107",
     padding: 16,
     borderRadius: 16,
     alignItems: "center",
     marginTop: 10,
   },

   checkButtonText: {
     fontSize: 16,
     fontWeight: "700",
     color: "#1E1E1E",
   },
 });
