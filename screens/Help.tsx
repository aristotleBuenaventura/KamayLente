import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type FAQ = {
  question: string;
  answer: string;
};

const FAQs: FAQ[] = [
  {
    question: "How accurate is the detection?",
    answer:
      "Kamay-Lente uses an AI-powered model trained on Filipino Sign Language data. Accuracy improves with good lighting and clear hand positioning.",
  },
  {
    question: "Does it work offline?",
    answer:
      "Some features may work offline, but real-time detection requires an internet connection.",
  },
  {
    question: "Can I report incorrect signs?",
    answer:
      "Yes. You can report incorrect detections through the Contact Support section.",
  },
  {
    question: "What devices are supported?",
    answer:
      "Kamay-Lente works on most modern Android and iOS devices with a camera.",
  },
  {
    question: "Is my data stored?",
    answer:
      "No personal video data is stored. Camera input is processed securely in real time.",
  },
];

const Help = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [viewAll, setViewAll] = useState(false);

  const displayedFAQs = viewAll ? FAQs : FAQs.slice(0, 3);

  const toggleFAQ = (index: number) => {
    LayoutAnimation.easeInEaseOut();
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Image */}
      <Image
        source={require("./Images/hand.png")}
        style={styles.headerImage}
      />

      {/* Intro */}
      <Text style={styles.title}>What is Kamay-Lente?</Text>
      <Text style={styles.description}>
        Kamay-Lente is a mobile app that detects basic Filipino Sign Language (FSL)
        gestures in real time using advanced YOLO11 algorithms. It helps bridge
        communication gaps and makes learning FSL accessible to everyone.
      </Text>

      {/* How It Works */}
      <Text style={styles.sectionTitle}>How It Works</Text>

      <View style={styles.stepCard}>
        <View style={styles.stepIcon}>
          <Text style={styles.stepEmoji}>🚀</Text>
        </View>
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>Launch the App</Text>
          <Text style={styles.stepText}>
            Open Kamay-Lente and allow camera access.
          </Text>
        </View>
      </View>

      <View style={styles.stepCard}>
        <View style={styles.stepIcon}>
          <Text style={styles.stepEmoji}>📸</Text>
        </View>
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>Focus the Camera</Text>
          <Text style={styles.stepText}>
            Point your camera at a hand making an FSL gesture.
          </Text>
        </View>
      </View>

      <View style={styles.stepCard}>
        <View style={styles.stepIcon}>
          <Text style={styles.stepEmoji}>✨</Text>
        </View>
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>Instant Detection</Text>
          <Text style={styles.stepText}>
            The app instantly shows the detected sign and meaning.
          </Text>
        </View>
      </View>

      {/* FAQ */}
      <View style={styles.faqHeader}>
        <Text style={styles.sectionTitle}>Common Questions</Text>
        <TouchableOpacity onPress={() => setViewAll(!viewAll)}>
          <Text style={styles.viewAllText}>
            {viewAll ? "Show Less" : "View All"}
          </Text>
        </TouchableOpacity>
      </View>

      {displayedFAQs.map((faq, index) => {
        const isOpen = expandedIndex === index;
        return (
          <View key={index} style={styles.faqCard}>
            <TouchableOpacity
              style={styles.faqRow}
              onPress={() => toggleFAQ(index)}
            >
              <Text style={styles.faqQuestion}>{faq.question}</Text>
              <Text style={styles.chevron}>{isOpen ? "▴" : "▾"}</Text>
            </TouchableOpacity>

            {isOpen && <Text style={styles.faqAnswer}>{faq.answer}</Text>}
          </View>
        );
      })}

      {/* Support */}
      <View style={styles.supportBox}>
        <Text style={styles.supportTitle}>Still need help?</Text>
        <Text style={styles.supportText}>
          Our team is happy to assist you with questions, issues, or feedback.
        </Text>

        <TouchableOpacity style={styles.supportButton}>
          <Text style={styles.supportButtonText}>Contact Support</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Help;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBEA",
    padding: 16,
  },

  headerImage: {
    width: "100%",
    height: 240,
    borderRadius: 20,
    marginBottom: 20,
    resizeMode: "cover",
    marginTop: 30,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#222",
    marginBottom: 10,
  },

  description: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
    color: "#222",
  },

  stepCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },

  stepIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFF3C4",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  stepEmoji: {
    fontSize: 20,
  },

  stepContent: {
    flex: 1,
  },

  stepTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },

  stepText: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },

  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 26,
    marginBottom: 10,
  },

  viewAllText: {
    color: "#F5A623",
    fontWeight: "700",
  },

  faqCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    elevation: 2,
  },

  faqRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  faqQuestion: {
    fontSize: 14,
    fontWeight: "700",
    flex: 1,
    marginRight: 8,
  },

  chevron: {
    fontSize: 18,
    color: "#F5A623",
  },

  faqAnswer: {
    fontSize: 13,
    color: "#555",
    marginTop: 10,
    lineHeight: 18,
  },

  supportBox: {
    backgroundColor: "#FFF3C4",
    borderRadius: 20,
    padding: 22,
    marginTop: 30,
    marginBottom: 40,
    alignItems: "center",
  },

  supportTitle: {
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 8,
  },

  supportText: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
    marginBottom: 16,
  },

  supportButton: {
    backgroundColor: "#F5A623",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },

  supportButtonText: {
    color: "#FFF",
    fontWeight: "800",
    fontSize: 14,
  },
});
