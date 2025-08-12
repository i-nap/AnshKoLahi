import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function CategoryInfoScreen() {
  const router = useRouter();
  const { category } = useLocalSearchParams();
  
  const handleChatBot = () => {
    router.push('./messaging');
  };

  const getCategoryInfo = (categoryName: string) => {
    switch (categoryName) {
      case 'Mental Health':
        return {
          title: 'Mental Health',
          icon: '🧠',
          description: `#Understanding Mental Health
Mental health is about how we think, feel, and cope with life's challenges. It influences our relationships, productivity, and overall happiness. Good mental health helps us handle stress, make decisions, and enjoy life. Poor mental health can affect anyone — it's not a sign of weakness. Breaking the stigma is the first step toward building a healthier community.

#Why Awareness Matters
Many people believe mental health problems are rare or that they only affect certain individuals, but the truth is they are common and treatable. According to global studies, millions of people experience mental health challenges every year. With awareness, we can replace myths with facts and ensure more people get help early.

#Signs & Symptoms
Recognizing early warning signs can help prevent bigger problems. Common symptoms include:

• Persistent sadness or irritability
• Withdrawal from social activities
• Extreme mood changes
• Difficulty sleeping or concentrating
• Changes in appetite or energy levels

If these symptoms last for weeks or interfere with daily life, professional support is important.

#Types of Mental Health Disorders
• Anxiety Disorders – Constant worry, restlessness, or panic attacks
• Depression – Persistent sadness, loss of interest in activities
• PTSD – Flashbacks and anxiety after traumatic events
• Bipolar Disorder – Extreme highs and lows in mood
• OCD – Repetitive thoughts and compulsive actions

#Prevention & Self-Care
Taking care of your mental health every day can prevent future issues:

• Practice relaxation techniques like deep breathing and meditation
• Get enough sleep and maintain a consistent routine
• Eat a balanced diet and stay physically active
• Spend time on hobbies and connect with loved ones

#Treatment & Support
If you or someone you know is struggling, help is available:

• Therapists & Counselors – Offer emotional guidance
• Psychologists – Provide talk therapy and coping strategies
• Psychiatrists – Can prescribe medication if needed

Treatment may include Cognitive Behavioral Therapy (CBT), group therapy, medication, or mindfulness practices.`,
          backgroundColor: '#E8F5E8',
          titleColor: '#2E7D32',
          textColor: '#1B5E20'
        };
      case 'Sexual Health':
        return {
          title: 'Sexual Health',
          icon: '⚤',
          description: `#Understanding Sexual Health
Sexual health is not just about preventing diseases — it's about physical, emotional, and social well-being in relation to sexuality. It includes healthy relationships, safe practices, and respect for your own and others' boundaries. Good sexual health empowers people to make informed decisions and protects them from risks.

#Why Awareness Matters
Lack of knowledge about sexual health can lead to unintended pregnancies, sexually transmitted infections (STIs), and unhealthy relationships. Comprehensive education helps individuals make responsible choices, challenge harmful myths, and promote respect and equality.

#Key Topics in Sexual Health
• Safe Sex Practices – Use of protection like condoms to prevent STIs and pregnancies
• Consent – Clear, enthusiastic agreement before any sexual activity
• STI Awareness – Symptoms, prevention, and treatment options
• Healthy Relationships – Respect, trust, and open communication
• Family Planning – Birth control methods and reproductive choices

#Prevention & Self-Care
• Always use barrier protection
• Get regular health checkups and STI screenings
• Communicate openly with partners about boundaries and history
• Avoid peer pressure and respect personal comfort levels
• Learn about available contraceptive methods

#Treatment & Support
If you have concerns about sexual health, seek help from:

• Gynecologists & Urologists – Specialized medical care
• Sexual Health Clinics – Confidential testing and counseling
• Therapists – Emotional and psychological support`,
          backgroundColor: '#FFF3E0',
          titleColor: '#E65100',
          textColor: '#BF360C'
        };
      case 'Drug Addiction':
        return {
          title: 'Drug Addiction',
          icon: '💉',
          description: `#Understanding Drug Abuse
Drug abuse occurs when someone uses substances like alcohol, prescription medication, or illegal drugs in a harmful way. It affects both physical and mental health, often leading to addiction, relationship problems, and legal issues.

#Why Awareness Matters
Substance abuse is a global problem that destroys lives, families, and communities. Awareness helps prevent addiction, encourages early intervention, and reduces stigma toward those seeking help.

#Commonly Abused Substances
• Alcohol – Legal but dangerous when misused
• Nicotine – Found in cigarettes and vaping products
• Prescription Drugs – Painkillers, sedatives, stimulants
• Illegal Drugs – Cannabis, heroin, cocaine, methamphetamine

#Signs & Symptoms
• Sudden changes in behavior or mood
• Poor performance at school or work
• Financial problems and borrowing money often
• Neglecting personal hygiene
• Withdrawal from family and friends

#Prevention & Self-Care
• Stay informed about the risks of substance use
• Build strong support systems with friends and family
• Engage in healthy activities like sports and hobbies
• Avoid peer pressure situations
• Learn coping strategies for stress

#Treatment & Support
• Rehabilitation Centers – Structured programs for recovery
• Counseling & Therapy – To address emotional triggers
• Support Groups – Like Narcotics Anonymous or Alcoholics Anonymous

Recovery is possible. One step at a time. Your future is worth fighting for.`,
          backgroundColor: '#FFEBEE',
          titleColor: '#C62828',
          textColor: '#B71C1C'
        };
      default:
        return {
          title: 'Health Information',
          icon: '❓',
          description: 'Information about this health category is being updated.',
          backgroundColor: '#F5F5F5',
          titleColor: '#616161',
          textColor: '#424242'
        };
    }
  };

  const categoryInfo = getCategoryInfo(category as string);

  const handleBackPress = () => {
    router.back();
  };

  const renderFormattedContent = (text: string, titleColor: string, textColor: string) => {
    const lines = text.split('\n');
    const elements: React.ReactElement[] = [];
    let key = 0;

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      if (trimmedLine === '') {
        // Add spacing for empty lines
        elements.push(
          <View key={key++} style={styles.spacer} />
        );
      } else if (trimmedLine.startsWith('#')) {
        // Header - lines starting with #
        elements.push(
          <Text key={key++} style={[styles.sectionHeading, { color: titleColor }]}>
            {trimmedLine.substring(1)}
          </Text>
        );
      } else if (trimmedLine.startsWith('•')) {
        // Bullet point - lines starting with •
        elements.push(
          <View key={key++} style={styles.bulletContainer}>
            <Text style={[styles.bulletPoint, { color: textColor }]}>•</Text>
            <Text style={[styles.bulletText, { color: textColor }]}>
              {trimmedLine.substring(1).trim()}
            </Text>
          </View>
        );
      } else if (trimmedLine.length > 0) {
        // Regular paragraph
        elements.push(
          <Text key={key++} style={[styles.descriptionText, { color: textColor }]}>
            {trimmedLine}
          </Text>
        );
      }
    });

    return elements;
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: categoryInfo.backgroundColor }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>AAROGYA</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Category Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.categoryIcon}>{categoryInfo.icon}</Text>
        </View>

        {/* Main Title */}
        <Text style={[styles.mainTitle, { color: categoryInfo.titleColor }]}>
          What is {categoryInfo.title}?
        </Text>

        {/* Description Card */}
        <View style={styles.descriptionCard}>
          {renderFormattedContent(categoryInfo.description, categoryInfo.titleColor, categoryInfo.textColor)}
        </View>

        {/* Additional Resources Section */}
        <View style={styles.resourcesSection}>
          <Text style={[styles.resourcesTitle, { color: categoryInfo.titleColor }]}>
            Need Help?
          </Text>
          
          <TouchableOpacity style={[styles.resourceButton, styles.chatButton]} onPress={handleChatBot}>
            <Text style={styles.resourceButtonIcon}>🤖</Text>
            <Text style={styles.resourceButtonText}>Chat with Health Bot</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.resourceButton, styles.emergencyButton]}>
            <Text style={styles.resourceButtonIcon}>📞</Text>
            <Text style={styles.resourceButtonText}>Emergency Contact</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 30,
  },
  backButton: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A4A4A',
  },
  placeholder: {
    width: 40,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryIcon: {
    fontSize: 80,
    marginBottom: 10,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 40,
  },
  descriptionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 25,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 10,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    lineHeight: 26,
  },
  bulletContainer: {
    flexDirection: 'row',
    marginBottom: 6,
    paddingRight: 10,
  },
  bulletPoint: {
    fontSize: 16,
    marginRight: 10,
    marginTop: 2,
  },
  bulletText: {
    fontSize: 16,
    lineHeight: 22,
    flex: 1,
  },
  spacer: {
    height: 8,
  },
  resourcesSection: {
    marginTop: 10,
  },
  resourcesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  resourceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chatButton: {
    backgroundColor: '#B2DFDB',
  },
  emergencyButton: {
    backgroundColor: '#FFCDD2',
  },
  resourceButtonIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  resourceButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
});
