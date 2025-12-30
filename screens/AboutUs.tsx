import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import BottomNav from "./BottomNav";

export default function AboutUs({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* SCROLLABLE CONTENT */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* OUR STORY */}
        <Text style={styles.sectionLabel}>OUR STORY</Text>
        <Text style={styles.title}>Kamay-Lente</Text>
        <View style={styles.underline} />

        <Text style={styles.paragraph}>
          We are a group of 5 Information Technology students from the{" "}
          <Text style={styles.highlight}>
            Technological Institute of the Philippines
          </Text>. We are eager to use technology to address communication gaps
          in the deaf community.
        </Text>

        {/* CAPSTONE PROJECT */}
        <View style={styles.capstoneRow}>
          <View style={styles.dot} />
          <Text style={styles.capstoneLabel}>CAPSTONE PROJECT</Text>
        </View>

        <Text style={styles.paragraph}>
          We developed <Text style={styles.bold}>Kamay-Lente</Text>, a mobile app
          that detects basic Filipino Sign Language gestures in real-time
          utilizing the latest{" "}
          <Text style={styles.highlight}>YOLO11</Text> algorithm.
        </Text>

        {/* OUR MISSION */}
        <Text style={[styles.sectionLabel, { marginTop: 30 }]}>
                  OUR MISSION
                </Text>
        <View style={styles.missionCard}>
          <Text style={styles.missionText}>
            “To make FSL learning convenient and enjoyable for everyone by
            utilizing precise object recognition.”
          </Text>
        </View>

        {/* OUR VALUES */}
        <Text style={[styles.sectionLabel, { marginTop: 30 }]}>
          OUR VALUES
        </Text>

        <View style={styles.valuesRow}>
          <View style={styles.valueCard}>
            <Text style={styles.valueIcon}>🤝</Text>
            <Text style={styles.valueText}>INCLUSIVITY</Text>
          </View>

          <View style={styles.valueCard}>
            <Text style={styles.valueIcon}>👥</Text>
            <Text style={styles.valueText}>COMMUNITY</Text>
          </View>

          <View style={styles.valueCard}>
            <Text style={styles.valueIcon}>💡</Text>
            <Text style={styles.valueText}>INNOVATION</Text>
          </View>
        </View>

        {/* Spacer so content doesn't hide behind BottomNav */}
        <View style={{ height: 90 }} />
      </ScrollView>

      {/* FIXED BOTTOM NAV */}
      <BottomNav navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBEA",
  },

  content: {
    padding: 24,
    paddingTop: 20,
  },

  sectionLabel: {
    color: "#F5A623",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 6,
    marginTop: 20,
  },

  title: {
    fontSize: 35,
    fontWeight: "800",
    color: "#222",
  },

  underline: {
    width: 80,
    height: 4,
    backgroundColor: "#F5A623",
    borderRadius: 2,
    marginVertical: 12,
    marginBottom: 40,
  },

  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    color: "#444",
    marginBottom: 20,
  },

  highlight: {
    color: "#F5A623",
    fontWeight: "700",
  },

  bold: {
    fontWeight: "700",
  },

  capstoneRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#F5A623",
    marginRight: 8,
  },

  capstoneLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#888",
    letterSpacing: 1,
  },

  missionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  missionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#F5A623",
    marginBottom: 8,
  },

  missionText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#333",
    lineHeight: 24,
  },

  valuesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  valueCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 18,
    marginHorizontal: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  valueIcon: {
    fontSize: 24,
    marginBottom: 8,
  },

  valueText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    color: "#333",
  },
});
