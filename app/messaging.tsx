import { useRouter } from 'expo-router';
import React from 'react';
import {
    KeyboardAvoidingView,
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
}

const QUICK_MESSAGES = [
  'What are your services?',
  'Book an appointment',
  'Mental health tips',
  'Contact a human',
];

export default function MessagingScreen() {
  const router = useRouter();
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm the Connect Health bot. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = React.useState('');
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

    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thank you for your message. We are connecting you to the right department.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.isUser ? styles.userMessageWrapper : styles.systemMessageWrapper
    ]}>
      <View style={[styles.messageBubble, item.isUser ? styles.userMessageBubble : styles.systemMessageBubble]}>
        <Text style={item.isUser ? styles.userMessageText : styles.systemMessageText}>
          {item.text}
        </Text>
        <Text style={[
          styles.timestamp, 
          !item.isUser && styles.systemTimestamp
        ]}>
          {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
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
          <View style={{width: 50}} />
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
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickMessagesContainer}>
              {QUICK_MESSAGES.map((text, index) => (
                <Pressable
                  key={index}
                  style={({ pressed }) => [styles.quickMessageButton, { opacity: pressed ? 0.7 : 1 }]}
                  onPress={() => sendMessage(text)}
                >
                  <Text style={styles.quickMessageText}>{text}</Text>
                </Pressable>
              ))}
            </ScrollView>
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
  timestamp: {
    fontSize: 10,
    color: '#FFFFFF99',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  systemTimestamp: {
    color: '#00000099',
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
