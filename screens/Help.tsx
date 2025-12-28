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


// Enable animation for Android
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

      {/* What is Kamay-Lente */}
      <Text style={styles.title}>What is Kamay-Lente?</Text>
      <Text style={styles.description}>
        Kamay-Lente is a mobile app that detects basic Filipino Sign Language (FSL)
        gestures in real time using advanced YOLO11 algorithms. It is designed to
        teach hearing individuals the basics of FSL and bridge communication gaps.
      </Text>

      {/* How It Works */}
      <Text style={styles.sectionTitle}>How It Works</Text>

      <View style={styles.stepCard}>
        <Text style={styles.stepTitle}>🚀 Launch the App</Text>
        <Text style={styles.stepText}>
          Open Kamay-Lente and grant camera permissions to get started.
        </Text>
      </View>

      <View style={styles.stepCard}>
        <Text style={styles.stepTitle}>📸 Focus Camera</Text>
        <Text style={styles.stepText}>
          Point your camera at a hand making an FSL gesture within the frame.
        </Text>
      </View>

      <View style={styles.stepCard}>
        <Text style={styles.stepTitle}>✨ Instant Detection</Text>
        <Text style={styles.stepText}>
          The app will identify the sign and display the correct meaning instantly.
        </Text>
      </View>

      {/* Common Questions */}
      <View style={styles.faqHeader}>
        <Text style={styles.sectionTitle}>Common Questions</Text>
        <TouchableOpacity onPress={() => setViewAll(!viewAll)}>
          <Text style={styles.viewAllText}>
            {viewAll ? "Show Less" : "View All"}
          </Text>
        </TouchableOpacity>
      </View>

      {displayedFAQs.map((faq, index) => (
        <View key={index} style={styles.faqCard}>
          <TouchableOpacity onPress={() => toggleFAQ(index)}>
            <Text style={styles.faqQuestion}>{faq.question}</Text>
          </TouchableOpacity>

          {expandedIndex === index && (
            <Text style={styles.faqAnswer}>{faq.answer}</Text>
          )}
        </View>
      ))}

      {/* Contact Support */}
      <View style={styles.supportBox}>
        <Text style={styles.supportTitle}>Still need help?</Text>
        <Text style={styles.supportText}>
          Our team is ready to assist you with any issues or feedback you might
          have.
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
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  headerImage: {
    width: "100%",
    height: 240,
    borderRadius: 16,
    marginBottom: 16,
    resizeMode: "cover",
    marginTop: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  stepCard: {
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },
  stepText: {
    fontSize: 13,
    color: "#666",
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  viewAllText: {
    color: "#F5B400",
    fontWeight: "600",
  },
  faqCard: {
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: "600",
  },
  faqAnswer: {
    fontSize: 13,
    color: "#555",
    marginTop: 8,
    lineHeight: 18,
  },
  supportBox: {
    backgroundColor: "#FFF5D6",
    borderRadius: 16,
    padding: 18,
    marginTop: 24,
    marginBottom: 30,
    alignItems: "center",
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },
  supportText: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
    marginBottom: 14,
  },
  supportButton: {
    backgroundColor: "#F5B400",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  supportButtonText: {
    color: "#000",
    fontWeight: "700",
  },
});
