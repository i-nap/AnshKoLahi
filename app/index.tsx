import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import * as Linking from 'expo-linking';

export default function HomeScreen() {
  const router = useRouter();

  const handleChatBot = () => {
    router.push('./messaging');
  };

  const handleEmergencyCall = () => {
    Linking.openURL('tel:0987654321');
  };

  const handleCategoryPress = (categoryName: string) => {
    router.push({
      pathname: '/category-info',
      params: { category: categoryName }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        
        <Text style={styles.logo}>AAROGYA</Text>
        
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Hello ,</Text>
          <Text style={styles.greetingText}>How may we help you today?</Text>
        </View>

        <View style={styles.searchBarContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchBar}
            placeholder="Search"
            placeholderTextColor="#A0A0A0"
          />
        </View>

        <Text style={styles.categoriesTitle}>Catagories</Text>

        <View style={styles.categoriesRow}>
          <TouchableOpacity 
            style={styles.categoryCard} 
            activeOpacity={0.7}
            onPress={() => handleCategoryPress('Mental Health')}
          >
            <Text style={styles.categoryImage}>🧠</Text>
            <Text style={styles.categoryLabel}>Mental Health</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.categoryCard} 
            activeOpacity={0.7}
            onPress={() => handleCategoryPress('Sexual Health')}
          >
            <Text style={styles.categoryImage}>⚤</Text>
            <Text style={styles.categoryLabel}>Sexual Health</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.categoryCard} 
            activeOpacity={0.7}
            onPress={() => handleCategoryPress('Drug Addiction')}
          >
            <Text style={styles.categoryImage}>💉</Text>
            <Text style={styles.categoryLabel}>Drug Addiction</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.chatBotCard} activeOpacity={0.8} onPress={handleChatBot}>
          <Text style={styles.cardIcon}>🤖</Text>
          <View style={styles.cardTextContainer}>
            <Text style={styles.chatBotTitle}>Chat Bot</Text>
            <Text style={styles.chatBotSubtitle}>Chat with Health Bot</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.emergencyCard} activeOpacity={0.8} onPress={handleEmergencyCall}>
          <Text style={styles.cardIcon}>📞</Text>
          <View style={styles.cardTextContainer}>
            <Text style={styles.emergencyTitle}>Emergency contact</Text>
            <Text style={styles.emergencyNumber}>0987654321</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F6F2', // Changed background color to off-white/beige
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  logo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A4A4A',
    marginTop: 20,
    marginBottom: 25,
  },
  greetingContainer: {
    width: '100%',
    alignSelf: 'flex-start',
    marginBottom: 25,
  },
  greetingText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  searchBarContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    height: 50,
    paddingLeft: 45,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchIcon: {
    position: 'absolute',
    left: 15,
    fontSize: 20,
    color: '#A0A0A0',
    zIndex: 1, // Ensure icon is on top of the TextInput
  },
  categoriesTitle: {
    width: '100%',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D9C92', // Teal color from the image
    marginBottom: 15,
  },
  categoriesRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryCard: {
    backgroundColor: '#E0F2F1', // Light mint/teal color from the image
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '31%',
    aspectRatio: 1, // Makes the card a perfect square
    padding: 10,
  },
  categoryImage: {
    fontSize: 40,
    marginBottom: 5,
  },
  categoryLabel: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  // Re-used styles for main action cards
  cardIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  cardTextContainer: {
    flex: 1,
  },
  // Chat Bot Card
  chatBotCard: {
    width: '100%',
    backgroundColor: '#B2DFDB', // Lighter teal from the image
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 15,
  },
  chatBotTitle: {
    fontSize: 20,
    color: '#004D40', // Darker teal for text
    fontWeight: 'bold',
  },
  chatBotSubtitle: {
    fontSize: 14,
    color: '#004D40',
  },
  // Emergency Card
  emergencyCard: {
    width: '100%',
    backgroundColor: '#FFCDD2', // Salmon/pink color from the image
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  emergencyTitle: {
    fontSize: 20,
    color: '#C62828', // Darker red/pink for text
    fontWeight: 'bold',
  },
  emergencyNumber: {
    fontSize: 14,
    color: '#C62828',
    fontWeight: '500',
    marginTop: 2,
  },
});