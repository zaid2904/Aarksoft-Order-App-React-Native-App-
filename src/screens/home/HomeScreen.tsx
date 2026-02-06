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
import { HomeStackParamList, Product } from '../../types/navigation';
import { ProductCard } from '../../components/product/ProductCard';
import { AppInput } from '../../components/common/AppInput';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { FONTS } from '../../constants/fonts';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'HomeMain'
>;

type HomeScreenRouteProp = RouteProp<HomeStackParamList, 'HomeMain'>;

interface Props {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Chicken Masala',
    unit: '1Unit',
    packs: 120,
    price: 160,
    image: '',
  },
  {
    id: '2',
    name: 'Chaat Masala',
    unit: '1Unit',
    packs: 120,
    price: 56,
    image: '',
  },
  {
    id: '3',
    name: 'Fish masala',
    unit: '1Unit',
    packs: 120,
    price: 200,
    image: '',
  },
  {
    id: '4',
    name: 'Chicken Masala',
    unit: '1Unit',
    packs: 120,
    price: 150,
    image: '',
  },
  {
    id: '5',
    name: 'Mutton Masala',
    unit: '1Unit',
    packs: 100,
    price: 180,
    image: '',
  },
  {
    id: '6',
    name: 'Garam Masala',
    unit: '1Unit',
    packs: 150,
    price: 120,
    image: '',
  },
];

export const HomeScreen: React.FC<Props> = ({ navigation, route }) => {
  const { customer: contextCustomer, area: contextArea } = useUser();
  const customer = route.params?.customer || contextCustomer || 'Guest';
  const area = route.params?.area || contextArea || 'Unknown';
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(MOCK_PRODUCTS);
  const { cartItems, updateQuantity, getTotalItems } = useCart();

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredProducts(MOCK_PRODUCTS);
    } else {
      const filtered = MOCK_PRODUCTS.filter(product =>
        product.name.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredProducts(filtered);
    }
  };

  const getProductQuantity = (productId: string): number => {
    const item = cartItems.find(item => item.id === productId);
    return item?.quantity || 0;
  };

  const handleIncrement = (product: Product) => {
    const currentQuantity = getProductQuantity(product.id);
    updateQuantity(product.id, currentQuantity + 1, product);
  };

  const handleDecrement = (productId: string) => {
    const currentQuantity = getProductQuantity(productId);
    if (currentQuantity > 0) {
      updateQuantity(productId, currentQuantity - 1);
    }
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard
      name={item.name}
      unit={item.unit}
      packs={item.packs}
      price={item.price}
      quantity={getProductQuantity(item.id)}
      onIncrement={() => handleIncrement(item)}
      onDecrement={() => handleDecrement(item.id)}
      image={item.image}
    />
  );

  const cartItemCount = getTotalItems();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.userName}>{customer}</Text>
            <Text style={styles.orderingFor}>Ordering for : {area} ▼</Text>
          </View>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => navigation.navigate('Cart')}
            activeOpacity={0.7}
          >
            <Text style={styles.cartIcon}>🛒</Text>
            {cartItemCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartItemCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <AppInput
            placeholder="Search Products"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Select items</Text>

        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id}
          renderItem={renderProduct}
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
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  searchContainer: {
    marginTop: SPACING.xs,
  },
  userName: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  orderingFor: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.white,
  },
  cartButton: {
    position: 'relative',
    backgroundColor: COLORS.white,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartIcon: {
    fontSize: 24,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: COLORS.error,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xs,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  listContent: {
    paddingBottom: SPACING.lg,
  },
});
