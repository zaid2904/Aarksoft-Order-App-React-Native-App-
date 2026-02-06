import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../types/navigation';
import { AppButton } from '../../components/common/AppButton';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { FONTS } from '../../constants/fonts';

type OrderSuccessScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'OrderSuccess'
>;

interface Props {
  navigation: OrderSuccessScreenNavigationProp;
}

export const OrderSuccessScreen: React.FC<Props> = ({ navigation }) => {
  const handleViewOrders = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'HomeMain' as any,
          params: { screen: 'Orders' },
        },
      ],
    });
  };

  const handleContinue = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeMain' as any }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successCard}>
          <View style={styles.iconContainer}>
            <Text style={styles.successIcon}>✅</Text>
          </View>
          <Text style={styles.successTitle}>Order successful</Text>
        </View>

        <View style={styles.buttonContainer}>
          <AppButton
            title="View Orders"
            onPress={handleViewOrders}
            variant="outline"
            style={styles.button}
          />
          <AppButton
            title="Continue"
            onPress={handleContinue}
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  successCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.xxl,
    alignItems: 'center',
    marginBottom: SPACING.xl,
    width: '100%',
    maxWidth: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.lightGreen,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  successIcon: {
    fontSize: 40,
  },
  successTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  button: {
    marginBottom: SPACING.md,
  },
});
