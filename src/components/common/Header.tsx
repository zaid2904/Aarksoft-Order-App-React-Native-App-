import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { FONTS } from '../../constants/fonts';

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  rightIcon?: React.ReactNode;
  showBack?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onBackPress,
  rightIcon,
  showBack = true,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {showBack && onBackPress && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBackPress}
            activeOpacity={0.7}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    minHeight: 56,
  },
  backButton: {
    marginRight: SPACING.md,
    padding: SPACING.xs,
  },
  backIcon: {
    fontSize: FONTS.sizes.xxl,
    color: COLORS.textPrimary,
  },
  title: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    color: COLORS.textPrimary,
    flex: 1,
  },
  rightIcon: {
    marginLeft: SPACING.md,
  },
});
