import { useRouter } from 'expo-router';
import React from 'react';
import {
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  FlatList,
  GestureHandlerRootView,
  ScrollView,
  TextInput,
} from 'react-native-gesture-handler';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  showYesNoButtons?: boolean;
  subCategoryKey?: string;
}

// Helper function to make phone calls
const makePhoneCall = (phoneNumber: string) => {
  // Remove any non-digit characters except + and -
  const cleanNumber = phoneNumber.replace(/[^\d+-]/g, '');
  const phoneUrl = `tel:${cleanNumber}`;
  
  Linking.canOpenURL(phoneUrl)
    .then((supported) => {
      if (supported) {
        return Linking.openURL(phoneUrl);
      } else {
        console.log('Phone calling is not supported on this device');
      }
    })
    .catch((err) => console.error('Error opening phone app:', err));
};

// Component to render text with clickable phone numbers
const MessageTextWithClickableNumbers = ({ text, style }: { text: string; style: any }) => {
  // Regex to match phone numbers (various formats)
  const phoneRegex = /(\b\d{1}-\d{3}-\d{3}-\d{4}\b|\b\d{3}\b|\b\d{1}-\d{3}-\d{3}-\d{3}\b|\b\d{10}\b)/g;
  
  const parts = text.split(phoneRegex);
  
  return (
    <Text style={style}>
      {parts.map((part, index) => {
        if (phoneRegex.test(part)) {
          return (
            <Text
              key={index}
              style={[style, styles.phoneLink]}
              onPress={() => makePhoneCall(part)}
            >
              {part}
            </Text>
          );
        }
        return part;
      })}
    </Text>
  );
};

// Helpline numbers by category
const HELPLINES = {
  mental: "• Mental Health Crisis Line: 1-800-273-8255\n• National Suicide Prevention Lifeline: 988\n• Crisis Text Line: Text HOME to 741741",
  sexual: "• Sexual Health Support: 1-800-230-7526\n• RAINN National Sexual Assault Hotline: 1-800-656-4673\n• Planned Parenthood: 1-800-230-PLAN",
  drug: "• SAMHSA National Helpline: 1-800-662-4357\n• Narcotics Anonymous: 1-818-773-9999\n• Drug & Alcohol Treatment: 1-800-662-HELP"
};

// Detailed information for each sub-category
const DETAILED_INFO = {
  mental: {
    'Anxiety': "Anxiety disorders are among the most common mental health conditions. Here's what you should know:\n\n" +
      "Symptoms may include:\n• Excessive worry or fear\n• Restlessness or feeling on edge\n• Difficulty concentrating\n• Physical symptoms like rapid heartbeat\n\n" +
      "Treatment options:\n• Cognitive Behavioral Therapy (CBT)\n• Medication when recommended by a doctor\n• Mindfulness and relaxation techniques\n• Regular exercise and healthy lifestyle\n\n" +
      "Remember: Anxiety is treatable, and you don't have to face it alone.",
    
    'Depression': "Depression is a serious but treatable mental health condition. Understanding it better can help:\n\n" +
      "Common symptoms:\n• Persistent sadness or empty mood\n• Loss of interest in activities\n• Changes in appetite or sleep\n• Feelings of worthlessness or guilt\n\n" +
      "Treatment approaches:\n• Professional counseling or therapy\n• Medication if recommended\n• Support groups\n• Lifestyle changes and self-care\n\n" +
      "Important: If you're having thoughts of self-harm, please reach out for immediate help.",
    
    'Stress Management': "Effective stress management involves multiple strategies:\n\n" +
      "Immediate techniques:\n• Deep breathing exercises\n• Progressive muscle relaxation\n• Mindfulness meditation\n• Physical activity\n\n" +
      "Long-term strategies:\n• Time management and prioritization\n• Setting healthy boundaries\n• Regular sleep schedule\n• Building a support network\n\n" +
      "When to seek help: If stress interferes with daily life or relationships.",
    
    'Sleep Issues': "Quality sleep is essential for mental and physical health:\n\n" +
      "Common sleep problems:\n• Difficulty falling asleep (insomnia)\n• Frequent waking during the night\n• Early morning awakening\n• Non-restorative sleep\n\n" +
      "Sleep hygiene tips:\n• Consistent sleep schedule\n• Comfortable sleep environment\n• Limit screen time before bed\n• Avoid caffeine late in the day\n\n" +
      "When to see a doctor: Persistent sleep problems lasting more than 2 weeks.",
    
    'Other Mental Health': "Mental health encompasses many conditions and experiences:\n\n" +
      "Remember:\n• Mental health is just as important as physical health\n• Treatment is available and effective\n• Recovery is possible\n• You are not alone\n\n" +
      "Resources available:\n• Licensed therapists and counselors\n• Support groups\n• Online therapy platforms\n• Mental health apps\n\n" +
      "Take the first step by reaching out to a mental health professional."
  },
  
  sexual: {
    'Protection & Safe Practices': "Comprehensive sexual health protection information:\n\n" +
      "Barrier methods:\n• Condoms (male and female)\n• Dental dams for oral contact\n• Consistent and correct use is key\n\n" +
      "Other considerations:\n• Regular STI testing\n• Open communication with partners\n• Understanding consent\n• Birth control options\n\n" +
      "Where to get supplies:\n• Pharmacies\n• Health clinics\n• College health centers\n• Many are available for free at community health centers.",
    
    'Testing & Checkups': "Regular sexual health testing is important for everyone:\n\n" +
      "What to expect:\n• Confidential testing process\n• Various testing methods available\n• Results typically within a few days\n• Treatment available if needed\n\n" +
      "Common tests:\n• HIV, Chlamydia, Gonorrhea\n• Syphilis, Hepatitis B\n• HPV screening (for certain individuals)\n\n" +
      "Testing locations:\n• Health departments\n• Planned Parenthood\n• Community health centers\n• Private healthcare providers",
    
    'Relationship Concerns': "Healthy relationships require ongoing attention:\n\n" +
      "Key elements:\n• Open and honest communication\n• Mutual respect and trust\n• Healthy boundaries\n• Shared decision-making\n\n" +
      "Warning signs to watch for:\n• Controlling behavior\n• Lack of respect for boundaries\n• Pressure or coercion\n• Isolation from friends/family\n\n" +
      "Resources:\n• Relationship counseling\n• Support groups\n• Educational workshops\n• Online resources and assessments",
    
    'Consent & Safety': "Consent and safety are fundamental rights:\n\n" +
      "Understanding consent:\n• Must be freely given\n• Can be withdrawn at any time\n• Requires clear communication\n• Cannot be given under influence\n\n" +
      "Safety planning:\n• Trust your instincts\n• Communicate boundaries clearly\n• Have support systems in place\n• Know your rights\n\n" +
      "If you're in danger:\n• Contact local emergency services\n• Reach out to trusted friends/family\n• Contact domestic violence hotlines\n• Create a safety plan with professionals",
    
    'Other Sexual Health': "Sexual health encompasses physical, emotional, and social well-being:\n\n" +
      "Components include:\n• Physical health and safety\n• Emotional well-being\n• Respectful relationships\n• Access to information and services\n\n" +
      "Professional resources:\n• Gynecologists and urologists\n• Sexual health counselors\n• Certified sex educators\n• Healthcare providers\n\n" +
      "Remember: Your sexual health is an important part of your overall well-being."
  },
  
  drug: {
    'Addiction Help': "Addiction is a complex but treatable condition:\n\n" +
      "Understanding addiction:\n• It's a chronic disease affecting brain function\n• Recovery is possible with proper support\n• Relapse doesn't mean failure\n• Professional help improves outcomes\n\n" +
      "Treatment options:\n• Inpatient rehabilitation programs\n• Outpatient counseling\n• Medication-assisted treatment\n• Support group meetings (AA, NA)\n\n" +
      "First steps:\n• Acknowledge the problem\n• Reach out for professional help\n• Build a support network\n• Consider treatment options",
    
    'Withdrawal Support': "Withdrawal can be challenging and potentially dangerous:\n\n" +
      "What to expect:\n• Physical and emotional symptoms\n• Symptoms vary by substance\n• Timeline varies by individual\n• Medical supervision recommended\n\n" +
      "Types of support:\n• Medical detox programs\n• Withdrawal medications\n• 24/7 medical monitoring\n• Emotional support and counseling\n\n" +
      "Safety first:\n• Don't attempt withdrawal alone\n• Seek medical evaluation\n• Consider inpatient programs\n• Have emergency contacts ready",
    
    'Safe Usage Information': "Harm reduction focuses on minimizing risks:\n\n" +
      "Basic principles:\n• Use clean supplies\n• Never share needles or equipment\n• Know your limits\n• Have someone nearby who can help\n\n" +
      "Risk reduction:\n• Test substances when possible\n• Start with smaller amounts\n• Avoid mixing substances\n• Stay hydrated and nourished\n\n" +
      "Resources:\n• Needle exchange programs\n• Naloxone (Narcan) training\n• Harm reduction centers\n• Mobile health units",
    
    'Relapse Prevention': "Relapse is common but preventable with the right strategies:\n\n" +
      "Warning signs:\n• Increased stress or triggers\n• Isolation from support\n• Skipping meetings or therapy\n• Romanticizing past use\n\n" +
      "Prevention strategies:\n• Regular counseling or therapy\n• Attend support group meetings\n• Develop healthy coping skills\n• Build a strong support network\n\n" +
      "If relapse occurs:\n• Don't give up on recovery\n• Reach out for help immediately\n• Learn from the experience\n• Adjust your recovery plan",
    
    'Other Substance Concern': "Substance use affects people differently:\n\n" +
      "Common concerns:\n• Prescription drug misuse\n• Alcohol problems\n• Smoking cessation\n• Behavioral addictions\n\n" +
      "Getting help:\n• Speak with a healthcare provider\n• Contact addiction specialists\n• Join support groups\n• Consider counseling options\n\n" +
      "Remember:\n• Help is available for any substance concern\n• Treatment can be tailored to your needs\n• Recovery is a personal journey\n• You deserve support and compassion"
  }
};

// Main categories and their empathetic bot replies
const CATEGORIES = [
  {
    label: 'Mental Health 🧠',
    key: 'mental',
    botReply:
      "Thank you for trusting me with your mental health concerns. Mental well-being is a fundamental part of living a fulfilling life, and it's okay to seek help and support whenever you need it.\n" +
      "Whether you're feeling overwhelmed, anxious, or just not quite yourself, sharing your feelings is a brave first step. Please tell me a bit about how you've been feeling lately, and I will do my best to guide you toward helpful resources, coping strategies, or professional assistance.\n" +
      "If at any moment you feel like you might hurt yourself or are in immediate danger, please reach out to your local crisis helpline or emergency services without delay.",
  },
  {
    label: 'Sexual Health ❤️',
    key: 'sexual',
    botReply:
      "I want you to know that your sexual health and well-being are important, and it's completely normal to have questions or concerns.\n" +
      "You deserve to feel safe, informed, and respected in all aspects of your sexual health. Whether your questions are about protection, testing, relationships, or personal safety, I'm here to listen and help connect you with reliable information and support.\n" +
      "If you ever feel unsafe or uncertain, please don't hesitate to contact a trusted health provider or helpline for confidential assistance.",
  },
  {
    label: 'Drug & Substance Use 💊',
    key: 'drug',
    botReply:
      "Thank you for taking the courageous step to talk about drug or substance use concerns. This can be a difficult and deeply personal topic, but remember that support is available, and recovery is possible.\n" +
      "No matter where you are in your journey—whether you're seeking information, struggling with usage, or looking for help to quit—you deserve compassion and understanding.\n" +
      "Please know that your information is kept confidential here, and if you are feeling unwell, overwhelmed, or in immediate danger, it's important to seek urgent medical attention or contact emergency services.",
  },
];

// Sub-category replies with deeper empathy and encouragement
const SUB_CATEGORIES: Record<string, { label: string; botReply: string }[]> = {
  mental: [
    {
      label: 'Anxiety',
      botReply:
        "Anxiety can feel overwhelming, making even everyday tasks seem challenging. It's okay to experience these feelings—many people do.\n" +
        "Practices like deep breathing, mindfulness, and grounding exercises can bring relief, but sometimes professional support is needed.\n\n" +
        "Would you like more detailed information about anxiety and treatment options?",
    },
    {
      label: 'Depression',
      botReply:
        "Depression can cast a heavy shadow on your life, causing sadness, fatigue, and loss of interest in things you once loved.\n" +
        "Reaching out is a sign of incredible strength, and support is available.\n\n" +
        "Would you like more detailed information about depression and available support?",
    },
    {
      label: 'Stress Management',
      botReply:
        "Stress is a natural part of life, but when it builds up, it can affect your health and happiness.\n" +
        "Taking small steps like organizing your time, exercising, and practicing relaxation techniques can make a big difference.\n\n" +
        "Would you like more detailed information about stress management techniques?",
    },
    {
      label: 'Sleep Issues',
      botReply:
        "Struggling with sleep can impact your mood, energy, and overall well-being.\n" +
        "Creating a calming bedtime routine and reducing screen time can help, but persistent sleep problems might require professional attention.\n\n" +
        "Would you like more detailed information about improving sleep quality?",
    },
    {
      label: 'Other Mental Health',
      botReply:
        "Mental health is broad and personal. Whatever you're facing, sharing your story helps me provide the right kind of support.\n\n" +
        "Would you like more detailed information about mental health resources and support options?",
    },
  ],
  sexual: [
    {
      label: 'Protection & Safe Practices',
      botReply:
        "Practicing safe sex is essential to protect your health and your partner's.\n" +
        "Using condoms, dental dams, and getting regular health checkups are great ways to stay safe.\n\n" +
        "Would you like more detailed information about protection methods and safe practices?",
    },
    {
      label: 'Testing & Checkups',
      botReply:
        "Regular sexual health testing is an important step in caring for yourself, even if you feel well.\n" +
        "Many clinics offer confidential testing and counseling.\n\n" +
        "Would you like more detailed information about testing procedures and where to get tested?",
    },
    {
      label: 'Relationship Concerns',
      botReply:
        "Healthy relationships are built on communication, respect, and boundaries.\n" +
        "If you're facing challenges or need advice on intimacy or setting boundaries, I'm here to listen and support.\n\n" +
        "Would you like more detailed information about building healthy relationships?",
    },
    {
      label: 'Consent & Safety',
      botReply:
        "Your right to consent and safety in any relationship is paramount.\n" +
        "If you or someone you know feels unsafe or unsure, reaching out to trusted services can provide protection and guidance.\n\n" +
        "Would you like more detailed information about consent and safety resources?",
    },
    {
      label: 'Other Sexual Health',
      botReply:
        "Sexual health covers a wide range of topics.\n\n" +
        "Would you like more detailed information about sexual health resources and support?",
    },
  ],
  drug: [
    {
      label: 'Addiction Help',
      botReply:
        "Facing addiction is incredibly challenging, but remember, help and hope are available.\n" +
        "Treatment programs, counseling, and peer support groups can provide the assistance you need.\n\n" +
        "Would you like more detailed information about addiction treatment and recovery resources?",
    },
    {
      label: 'Withdrawal Support',
      botReply:
        "Withdrawal can be a difficult and sometimes dangerous process.\n" +
        "Having medical supervision and support makes a big difference in safety and comfort.\n\n" +
        "Would you like more detailed information about withdrawal support and medical assistance?",
    },
    {
      label: 'Safe Usage Information',
      botReply:
        "If you or someone you know uses substances, practicing harm reduction can reduce risks.\n\n" +
        "Would you like more detailed information about harm reduction and safety practices?",
    },
    {
      label: 'Relapse Prevention',
      botReply:
        "Relapse is a common part of recovery, but it can be managed with planning and support.\n" +
        "Identifying triggers, building healthy routines, and staying connected with support networks are vital strategies.\n\n" +
        "Would you like more detailed information about relapse prevention strategies?",
    },
    {
      label: 'Other Substance Concern',
      botReply:
        "Substance use affects many areas of life, and every situation is unique.\n\n" +
        "Would you like more detailed information about substance use support and resources?",
    },
  ],
};

export default function MessagingScreen() {
  const router = useRouter();
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm the Connect Health bot. Please choose a category to get started:",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = React.useState('');
  const [selectedCategoryKey, setSelectedCategoryKey] = React.useState<string | null>(null);
  const flatListRef = React.useRef<FlatList<Message>>(null);

  React.useEffect(() => {
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
  };

  const selectCategory = (category: typeof CATEGORIES[number]) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: category.label,
      isUser: true,
      timestamp: new Date(),
    };
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: category.botReply,
      isUser: false,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage, botMessage]);
    setSelectedCategoryKey(category.key);
  };

  const selectSubCategory = (subCat: { label: string; botReply: string }) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: subCat.label,
      isUser: true,
      timestamp: new Date(),
    };
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: subCat.botReply,
      isUser: false,
      timestamp: new Date(),
      showYesNoButtons: true,
      subCategoryKey: subCat.label,
    };
    setMessages(prev => [...prev, userMessage, botMessage]);
  };

  const handleYesResponse = (messageId: string, subCategoryKey: string) => {
    // Remove yes/no buttons from the message
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, showYesNoButtons: false } : msg
    ));

    // Add user "Yes" message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: "Yes, I'd like more information",
      isUser: true,
      timestamp: new Date(),
    };

    // Get detailed information
    const categoryKey = selectedCategoryKey as keyof typeof DETAILED_INFO;
    const detailedInfo = DETAILED_INFO[categoryKey]?.[subCategoryKey as keyof typeof DETAILED_INFO[typeof categoryKey]];
    const helplineInfo = HELPLINES[categoryKey];

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: detailedInfo + "\n\n" + "Emergency Helplines:\n" + helplineInfo + "\n\nRemember, seeking help is a sign of strength, and you are never alone on this journey.",
      isUser: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
  };

  const handleNoResponse = (messageId: string) => {
    // Remove yes/no buttons from the message
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, showYesNoButtons: false } : msg
    ));

    // Add user "No" message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: "No, thank you",
      isUser: true,
      timestamp: new Date(),
    };

    // Add helpline information only
    const categoryKey = selectedCategoryKey as keyof typeof HELPLINES;
    const helplineInfo = HELPLINES[categoryKey];

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: "Here are some helpful contact numbers if you need immediate support:\n\n" + helplineInfo + "\n\nRemember, help is always available when you need it.",
      isUser: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.isUser ? styles.userMessageWrapper : styles.systemMessageWrapper
    ]}>
      <View style={[styles.messageBubble, item.isUser ? styles.userMessageBubble : styles.systemMessageBubble]}>
        <MessageTextWithClickableNumbers 
          text={item.text}
          style={item.isUser ? styles.userMessageText : styles.systemMessageText}
        />
        <Text style={[
          styles.timestamp,
          !item.isUser && styles.systemTimestamp
        ]}>
          {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
      
      {/* Yes/No Buttons */}
      {item.showYesNoButtons && (
        <View style={styles.yesNoContainer}>
          <Pressable
            style={({ pressed }) => [styles.yesButton, { opacity: pressed ? 0.7 : 1 }]}
            onPress={() => handleYesResponse(item.id, item.subCategoryKey!)}
          >
            <Text style={styles.yesButtonText}>Yes</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.noButton, { opacity: pressed ? 0.7 : 1 }]}
            onPress={() => handleNoResponse(item.id)}
          >
            <Text style={styles.noButtonText}>No</Text>
          </Pressable>
        </View>
      )}
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <Pressable
            style={({ pressed }) => [styles.backButton, { opacity: pressed ? 0.7 : 1 }]}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Chat Bot</Text>
          <View style={{ width: 50 }} />
        </View>

        <KeyboardAvoidingView
          style={styles.keyboardAvoidingContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            style={styles.messagesList}
            contentContainerStyle={styles.messagesListContent}
          />

          <View style={styles.inputArea}>
            {/* Main Category Buttons */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickMessagesContainer}>
              {CATEGORIES.map((cat, index) => (
                <Pressable
                  key={index}
                  style={({ pressed }) => [styles.quickMessageButton, { opacity: pressed ? 0.7 : 1 }]}
                  onPress={() => selectCategory(cat)}
                >
                  <Text style={styles.quickMessageText}>{cat.label}</Text>
                </Pressable>
              ))}
            </ScrollView>

            {/* Sub-Category Buttons */}
            {selectedCategoryKey && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickMessagesContainer}>
                {SUB_CATEGORIES[selectedCategoryKey].map((subCat, index) => (
                  <Pressable
                    key={index}
                    style={({ pressed }) => [styles.quickMessageButton, { opacity: pressed ? 0.7 : 1 }]}
                    onPress={() => selectSubCategory(subCat)}
                  >
                    <Text style={styles.quickMessageText}>{subCat.label}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            )}

            {/* User Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Type a message..."
                placeholderTextColor="#999"
              />
              <Pressable
                style={({ pressed }) => [
                  styles.sendButton,
                  !inputText.trim() && styles.sendButtonDisabled,
                  { opacity: pressed ? 0.7 : 1 }
                ]}
                onPress={() => sendMessage(inputText)}
                disabled={!inputText.trim()}
              >
                <Text style={styles.sendButtonText}>➤</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messagesList: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  messagesListContent: {
    padding: 16,
  },
  messageContainer: {
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessageWrapper: {
    alignSelf: 'flex-end',
  },
  systemMessageWrapper: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 18,
  },
  userMessageBubble: {
    backgroundColor: '#007AFF',
  },
  systemMessageBubble: {
    backgroundColor: '#E5E5EA',
  },
  userMessageText: {
    color: 'white',
    fontSize: 16,
  },
  systemMessageText: {
    color: 'black',
    fontSize: 16,
  },
  phoneLink: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: '#007AFF', // Blue color for phone numbers
  },
  timestamp: {
    fontSize: 10,
    color: '#FFFFFF99',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  systemTimestamp: {
    color: '#00000099',
  },
  yesNoContainer: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },
  yesButton: {
    backgroundColor: '#34C759',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 16,
  },
  noButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 16,
  },
  yesButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  noButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  inputArea: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: 'white',
  },
  quickMessagesContainer: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  quickMessageButton: {
    backgroundColor: '#F0F2F5',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
  },
  quickMessageText: {
    color: '#007AFF',
    fontSize: 13,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F0F2F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#B0C4DE',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});