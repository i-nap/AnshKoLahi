import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const EMERGENCY_NUMBERS = ['1234567890', '0987654321'];
const CHAT_BOT_URL = './messaging';

export default function HomeScreen() {
  const router = useRouter();

  const handleEmergencyCall = async (number:any) => {
    try {
      const phoneUrl = `tel:${number}`;
      const canOpen = await Linking.canOpenURL(phoneUrl);
      
      if (canOpen) {
        await Linking.openURL(phoneUrl);
      } else {
        Alert.alert('Error', `Cannot open the phone dialer for ${number}.`);
      }
    } catch {
      Alert.alert('Error', 'Failed to open the phone dialer.');
    }
  };

  const handleMessaging = () => {
    router.push(CHAT_BOT_URL);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{'Connect\nHealth'}</Text>
          <View style={styles.navLinks}>
            <Text style={styles.navLink}>Home</Text>
            <Text style={styles.navLink}>About US</Text>
            <Text style={styles.navLink}>Services</Text>
          </View>
        </View>

        <Image 
          source={require('../assets/images/Untitled.jpg')} 
          style={styles.heroImage}
        />

        <View style={styles.servicesContainer}>
          <ServiceButton icon="🧠" title="Mental Health Support" />
          <ServiceButton icon="⚤" title="Sexual Health Support" />
          <ServiceButton icon="💉" title="Drugs Health Support" />
        </View>

        <View style={styles.mainActionsContainer}>
          <TouchableOpacity style={styles.actionCard} activeOpacity={0.8} onPress={() => handleEmergencyCall(EMERGENCY_NUMBERS[0])}>
            <Text style={styles.actionIcon}>📞</Text>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Emergency Number</Text>
              <Text style={styles.actionSubtitle}>Call : {EMERGENCY_NUMBERS.join(' / ')}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} activeOpacity={0.8} onPress={handleMessaging}>
            <Text style={styles.actionIcon}>🤖</Text>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Chat Bot</Text>
              <Text style={styles.actionSubtitle}>Chat with us online</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>What is Mental Health?</Text>
          <Text style={styles.infoText}>
            Mental health refers to a person&apos;s emotional, psychological, and social well-being. It influences how individuals think, feel, and act, as well as how they cope with stress, relate to others, and make decisions. Good mental health allows people to handle the challenges of life, work productively, and contribute to their communities.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const ServiceButton: React.FC<{ icon: string; title: string }> = ({ icon, title }) => (
  <TouchableOpacity style={styles.serviceButton} activeOpacity={0.8}>
    <Text style={styles.serviceIcon}>{icon}</Text>
    <Text style={styles.serviceTitle}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#F0F2F5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  navLinks: {
    flexDirection: 'row',
    gap: 15,
  },
  navLink: {
    fontSize: 16,
    color: '#333',
  },
  heroImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  servicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginTop: -40, 
  },
  serviceButton: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    aspectRatio: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  serviceIcon: {
    fontSize: 32,
  },
  serviceTitle: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
    color: '#333',
  },
  mainActionsContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
    gap: 15,
  },
  actionCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  actionIcon: {
    fontSize: 36,
    marginRight: 15,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D9534F', 
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  infoContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1C1C1E',
  },
  infoText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
});
