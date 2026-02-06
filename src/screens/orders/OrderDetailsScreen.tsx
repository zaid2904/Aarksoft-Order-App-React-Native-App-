import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { OrdersStackParamList, Order } from '../../types/navigation';
import { Header } from '../../components/common/Header';
import { AppButton } from '../../components/common/AppButton';
import { formatCurrency } from '../../utils/formatCurrency';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { FONTS } from '../../constants/fonts';

type OrderDetailsScreenNavigationProp = NativeStackNavigationProp<
  OrdersStackParamList,
  'OrderDetails'
>;

type OrderDetailsScreenRouteProp = RouteProp<
  OrdersStackParamList,
  'OrderDetails'
>;

interface Props {
  navigation: OrderDetailsScreenNavigationProp;
  route: OrderDetailsScreenRouteProp;
}

const MOCK_ORDER: Order = {
  id: '1',
  date: '2 Jan 2026,7:24 PM',
  customer: 'DAMMADAR',
  phone: '9033837517',
  items: [
    {
      id: '1',
      name: 'Chicken Masala',
      unit: '1Unit',
      packs: 120,
      price: 160,
      quantity: 3,
      image: '',
    },
    {
      id: '2',
      name: 'Chaat Masala',
      unit: '1Unit',
      packs: 120,
      price: 56,
      quantity: 1,
      image: '',
    },
  ],
  totalAmount: 194,
  status: 'Pending',
};

export const OrderDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const [order] = useState<Order>(MOCK_ORDER);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return COLORS.pending;
      case 'Delivered':
        return COLORS.success;
      case 'Cancelled':
        return COLORS.error;
      default:
        return COLORS.textSecondary;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Order Details" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.statusContainer}>
            <Text style={styles.date}>{order.date}</Text>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(order.status) + '20' },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  { color: getStatusColor(order.status) },
                ]}
              >
                {order.status}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.billedToLabel}>Billed to</Text>
          <Text style={styles.customerName}>{order.customer}</Text>
          <Text style={styles.customerPhone}>{order.phone}</Text>

          <View style={styles.divider} />

          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalAmount}>
              {formatCurrency(order.totalAmount)}
            </Text>
          </View>
        </View>

        <Text style={styles.itemsTitle}>Items ({order.items.length})</Text>
        {order.items.map(item => (
          <View key={item.id} style={styles.itemRow}>
            <View style={styles.itemImagePlaceholder}>
              <Text style={styles.itemImageEmoji}>📦</Text>
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>
                {item.quantity} x {formatCurrency(item.price)} ={' '}
                {formatCurrency(item.quantity * item.price)}
              </Text>
            </View>
          </View>
        ))}

        <View style={styles.buttonContainer}>
          <AppButton
            title="Reorder"
            onPress={() => {}}
            variant="primary"
            style={styles.reorderButton}
          />
          <AppButton
            title="Download pdf"
            onPress={() => {}}
            variant="outline"
            style={styles.downloadButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textPrimary,
  },
  statusBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
  },
  statusText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.background,
    marginVertical: SPACING.md,
  },
  billedToLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  customerName: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  customerPhone: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textPrimary,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textPrimary,
  },
  totalAmount: {
    fontSize: FONTS.sizes.xxxl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  itemsTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  itemImagePlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.lightGreen,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  itemImageEmoji: {
    fontSize: 24,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  itemQuantity: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.lg,
  },
  reorderButton: {
    flex: 1,
  },
  downloadButton: {
    flex: 1,
  },
});
