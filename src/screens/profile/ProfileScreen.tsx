import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import {
  User,
  Phone,
  Mail,
  Building2,
  MapPin,
  LogOut,
} from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabParamList } from '../../types/navigation';
import { AppButton } from '../../components/common/AppButton';
import { useAuth } from '../../navigation/RootNavigator';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { FONTS } from '../../constants/fonts';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  MainTabParamList,
  'Profile'
>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

export const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <User size={48} color={COLORS.primary} />
          </View>
          <Text style={styles.userName}>Alif Salesman</Text>
          <Text style={styles.userCompany}>Indian Seals</Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Phone size={20} color={COLORS.primary} />
            </View>
            <Text style={styles.infoText}>985456251</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Mail size={20} color={COLORS.primary} />
            </View>
            <Text style={styles.infoText}>alifsalesman@gmail.com</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Building2 size={20} color={COLORS.primary} />
            </View>
            <Text style={styles.infoText}>Indian sales</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <MapPin size={20} color={COLORS.primary} />
            </View>
            <Text style={styles.infoText}>Fatepura vadodara</Text>
          </View>
        </View>

        <AppButton
          title="Logout"
          onPress={handleLogout}
          variant="danger"
          style={styles.logoutButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  content: {
    padding: SPACING.md,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.lightGray,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  userName: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  userCompany: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
  },
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.lightGreen,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  infoText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textPrimary,
    flex: 1,
  },
  logoutButton: {
    marginTop: SPACING.lg,
  },
});
