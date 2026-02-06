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
import { RouteProp } from '@react-navigation/native';
import { AuthStackParamList, Customer } from '../../types/navigation';
import { Header } from '../../components/common/Header';
import { AppInput } from '../../components/common/AppInput';
import { CustomerCard } from '../../components/customer/CustomerCard';
import { useAuth } from '../../navigation/RootNavigator';
import { useUser } from '../../context/UserContext';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { FONTS } from '../../constants/fonts';

type SelectCustomerScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'SelectCustomer'
>;

type SelectCustomerScreenRouteProp = RouteProp<
  AuthStackParamList,
  'SelectCustomer'
>;

interface Props {
  navigation: SelectCustomerScreenNavigationProp;
  route: SelectCustomerScreenRouteProp;
}

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: '1',
    name: 'Niraala',
    phone: '9876543210',
    lastOrderDate: 'Jan 28',
    totalOrders: 45,
  },
  {
    id: '2',
    name: 'A-1 EGG',
    phone: '9876543211',
    lastOrderDate: 'Jan 30',
    totalOrders: 38,
  },
  {
    id: '3',
    name: 'Addars store',
    phone: '9876543212',
    lastOrderDate: 'Jan 25',
    totalOrders: 52,
  },
  {
    id: '4',
    name: 'Aayesha chicken',
    phone: '9876543213',
    lastOrderDate: 'Jan 29',
    totalOrders: 41,
  },
  {
    id: '5',
    name: 'Ahmed chaca',
    phone: '9876543214',
    lastOrderDate: 'Jan 20',
    totalOrders: 35,
  },
  {
    id: '6',
    name: 'Alfa store',
    phone: '9876543215',
    lastOrderDate: 'Jan 31',
    totalOrders: 48,
  },
  {
    id: '7',
    name: 'Ba slams',
    phone: '9876543216',
    lastOrderDate: 'Jan 15',
    totalOrders: 29,
  },
  {
    id: '8',
    name: 'DAMMADAR',
    phone: '9033837517',
    lastOrderDate: 'Jan 30',
    totalOrders: 60,
  },
];

export const SelectCustomerScreen: React.FC<Props> = ({
  navigation,
  route,
}) => {
  const { area } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState(MOCK_CUSTOMERS);
  const { login } = useAuth();
  const { setUserData } = useUser();

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredCustomers(MOCK_CUSTOMERS);
    } else {
      const filtered = MOCK_CUSTOMERS.filter(customer =>
        customer.name.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredCustomers(filtered);
    }
  };

  const handleSelectCustomer = (customer: Customer) => {
    // Store customer and area data
    setUserData(customer.name, area);
    // Trigger login which will navigate to Main
    login();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Select Customer" onBackPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.selectedAreaContainer}>
          <View style={styles.selectedAreaContent}>
            <View style={styles.areaIconContainer}>
              <Text style={styles.areaIcon}>📍</Text>
            </View>
            <View style={styles.areaInfo}>
              <Text style={styles.selectedAreaLabel}>Selected Area</Text>
              <Text style={styles.selectedAreaName}>{area}</Text>
              <Text style={styles.customerCount}>
                {MOCK_CUSTOMERS.length} Customers in {area}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.changeButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.changeButtonText}>Change</Text>
          </TouchableOpacity>
        </View>

        <AppInput
          placeholder="Search Customers"
          value={searchQuery}
          onChangeText={handleSearch}
        />

        <FlatList
          data={filteredCustomers}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <CustomerCard
              name={item.name}
              phone={item.phone}
              lastOrderDate={item.lastOrderDate}
              totalOrders={item.totalOrders}
              onPress={() => handleSelectCustomer(item)}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
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
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
  },
  selectedAreaContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedAreaContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  areaIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.lightGreen,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  areaIcon: {
    fontSize: 24,
  },
  areaInfo: {
    flex: 1,
  },
  selectedAreaLabel: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  selectedAreaName: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  customerCount: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  changeButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
  },
  changeButtonText: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: SPACING.lg,
  },
});
