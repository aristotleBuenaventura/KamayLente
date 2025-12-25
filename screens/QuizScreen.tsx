import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function QuizScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const quiz = route.params?.quiz;

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!quiz || !quiz.questions) {
    return (
      <View style={styles.container}>
        <Text>Quiz data missing</Text>
      </View>
    );
  }

  const question = quiz.questions[index];

  const isCorrect = selected === question.correctChoiceId;

  const onCheck = () => {
    setChecked(true);
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const onNext = () => {
    setChecked(false);
    setSelected(null);

    if (index < quiz.questions.length - 1) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  };

  const onRetry = () => {
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setScore(0);
    setStreak(0);
    setFinished(false);
  };

  /* =========================
     🎉 END SCREEN
  ========================= */
  if (finished) {
    const perfect = score === quiz.questions.length;

    return (
      <View style={[styles.container, styles.results]}>
        <Text style={styles.resultTitle}>
          {perfect ? "🎉 Congratulations!" : "😅 Try Again"}
        </Text>

        <Text style={styles.resultText}>
          Your Score: {score} / {quiz.questions.length}
        </Text>

        {perfect && (
          <Text style={styles.perfectText}>
            Perfect Score! Amazing job 👏
          </Text>
        )}

        <TouchableOpacity
          style={styles.checkButton}
          onPress={onRetry}
        >
          <Text style={styles.checkButtonText}>
            {perfect ? "Play Again" : "Try Again"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.exitText}>Exit</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /* =========================
     🧠 QUIZ UI
  ========================= */
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Dashboard')}
          style={styles.closeButton}
          activeOpacity={0.7}
        >
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>


        <View style={styles.streak}>
          <Text style={styles.streakText}>🔥 {streak}</Text>
        </View>
      </View>

      {/* Progress */}
      <Text style={styles.progressText}>
        QUESTION {index + 1} OF {quiz.questions.length}
      </Text>

      <View style={styles.progressBarBg}>
        <View
          style={[
            styles.progressBarFill,
            {
              width: `${((index + 1) / quiz.questions.length) * 100}%`,
            },
          ]}
        />
      </View>

      {/* Question */}
      <Text style={styles.questionText}>
        What does this sign mean?
      </Text>

      {/* Image */}
      <View style={styles.imageCard}>
        {question.image && (
          <Image source={question.image} style={styles.image} />
        )}
      </View>

      {/* Choices */}
      {question.choices.map((c: any, i: number) => {
        const letter = String.fromCharCode(65 + i);

        const correct =
          checked && c.id === question.correctChoiceId;
        const wrong =
          checked && selected === c.id && !correct;

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
        onPress={checked ? onNext : onCheck}
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
    marginTop: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  close: {
    fontSize: 24,
    color: "#333",
  },

  streak: {
    backgroundColor: "#FFE7C2",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  streakText: {
    fontWeight: "700",
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
  },

  choiceText: {
    fontSize: 16,
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
  },

    results: {
      flex: 1,
      justifyContent: 'center', // vertical center
      alignItems: 'center',     // horizontal center
    },

    resultTitle: {
      fontSize: 28,
      fontWeight: '800',
      textAlign: 'center',
      marginBottom: 10,
    },



  resultText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },

  perfectText: {
    textAlign: "center",
    marginBottom: 20,
    color: "#4CAF50",
    fontWeight: "700",
  },

  exitText: {
    textAlign: "center",
    marginTop: 14,
    color: "#777",
  },
  closeButton: {
    width: 40,
    height: 40,
  },
  closeText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
