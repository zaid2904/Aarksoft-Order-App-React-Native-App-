import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OrdersStackParamList, Order } from '../../types/navigation';
import { formatCurrency } from '../../utils/formatCurrency';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { FONTS } from '../../constants/fonts';

type OrderHistoryScreenNavigationProp = NativeStackNavigationProp<
  OrdersStackParamList,
  'OrderHistory'
>;

interface Props {
  navigation: OrderHistoryScreenNavigationProp;
}

const MOCK_ORDERS: Order[] = [
  {
    id: '1',
    date: '30 Dec 2025',
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
  },
  {
    id: '2',
    date: '28 Dec 2025',
    customer: 'Addars store',
    phone: '9876543212',
    items: [
      {
        id: '3',
        name: 'Fish masala',
        unit: '1Unit',
        packs: 120,
        price: 200,
        quantity: 2,
        image: '',
      },
    ],
    totalAmount: 400,
    status: 'Delivered',
  },
];

export const OrderHistoryScreen: React.FC<Props> = ({ navigation }) => {
  const [orders] = useState<Order[]>(MOCK_ORDERS);

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

  const renderOrderItem = ({ item }: { item: Order }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderDate}>{item.date}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) + '20' },
          ]}
        >
          <Text
            style={[styles.statusText, { color: getStatusColor(item.status) }]}
          >
            {item.status}
          </Text>
        </View>
      </View>
      <View style={styles.orderContent}>
        <View style={styles.orderInfo}>
          <Text style={styles.itemCount}>{item.items.length} items</Text>
          <Text style={styles.totalAmount}>Total Amount</Text>
        </View>
        <View style={styles.orderActions}>
          <Text style={styles.amount}>{formatCurrency(item.totalAmount)}</Text>
        </View>
      </View>
      <View style={styles.orderFooter}>
        <TouchableOpacity
          style={styles.viewDetailsButton}
          onPress={() =>
            navigation.navigate('OrderDetails', { orderId: item.id })
          }
          activeOpacity={0.7}
        >
          <Text style={styles.viewDetailsText}>View details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reorderButton} activeOpacity={0.7}>
          <Text style={styles.reorderText}>Reorder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.7}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order history</Text>
      </View>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No orders yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    marginRight: SPACING.sm,
    padding: SPACING.xs,
  },
  backArrow: {
    fontSize: 24,
    color: COLORS.textPrimary,
  },
  headerTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  listContent: {
    padding: SPACING.md,
  },
  orderCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  orderDate: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
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
  orderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  orderInfo: {
    flex: 1,
  },
  itemCount: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  totalAmount: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  orderActions: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.md,
  },
  viewDetailsButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    marginRight: SPACING.sm,
    alignItems: 'center',
  },
  viewDetailsText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    fontWeight: '600',
  },
  reorderButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    marginLeft: SPACING.sm,
    alignItems: 'center',
  },
  reorderText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.white,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
  },
  emptyText: {
    fontSize: FONTS.sizes.lg,
    color: COLORS.textSecondary,
  },
});
