import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { FONTS } from '../../constants/fonts';

interface CustomerCardProps {
  name: string;
  phone?: string;
  lastOrderDate?: string;
  totalOrders?: number;
  onPress: () => void;
}

export const CustomerCard: React.FC<CustomerCardProps> = ({
  name,
  phone,
  lastOrderDate,
  totalOrders,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>🏪</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        {phone && (
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📞</Text>
            <Text style={styles.phone}>{phone}</Text>
          </View>
        )}
        {(lastOrderDate || totalOrders !== undefined) && (
          <View style={styles.statsRow}>
            {totalOrders !== undefined && (
              <View style={styles.statBadge}>
                <Text style={styles.statText}>📦 {totalOrders} orders</Text>
              </View>
            )}
            {lastOrderDate && (
              <View style={styles.statBadge}>
                <Text style={styles.statText}>📅 {lastOrderDate}</Text>
              </View>
            )}
          </View>
        )}
      </View>
      <View style={styles.arrow}>
        <Text style={styles.arrowIcon}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.lightGreen,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textPrimary,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  infoIcon: {
    fontSize: 12,
    marginRight: SPACING.xs,
  },
  phone: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  statBadge: {
    backgroundColor: COLORS.lightGreen,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.primary,
    fontWeight: '500',
  },
  arrow: {
    marginLeft: SPACING.sm,
  },
  arrowIcon: {
    fontSize: 24,
    color: COLORS.gray,
    fontWeight: '300',
  },
});
