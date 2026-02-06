import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList, Area } from '../../types/navigation';
import { Header } from '../../components/common/Header';
import { AppInput } from '../../components/common/AppInput';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { FONTS } from '../../constants/fonts';

type SelectAreaScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'SelectArea'
>;

interface Props {
  navigation: SelectAreaScreenNavigationProp;
}

const MOCK_AREAS: Area[] = [
  { id: '1', name: 'Baska', customerCount: 45 },
  { id: '2', name: 'Bodeli', customerCount: 38 },
  { id: '3', name: 'Gorwa', customerCount: 52 },
  { id: '4', name: 'Halol', customerCount: 41 },
  { id: '5', name: 'Jetalpur', customerCount: 35 },
  { id: '6', name: 'Karjan', customerCount: 48 },
  { id: '7', name: 'Naswadi', customerCount: 29 },
  { id: '8', name: 'Ratanpur', customerCount: 44 },
  { id: '9', name: 'Tandalja', customerCount: 60 },
  { id: '10', name: 'Dammdar', customerCount: 55 },
];

export const SelectAreaScreen: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAreas, setFilteredAreas] = useState(MOCK_AREAS);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredAreas(MOCK_AREAS);
    } else {
      const filtered = MOCK_AREAS.filter(area =>
        area.name.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredAreas(filtered);
    }
  };

  const handleSelectArea = (area: Area) => {
    navigation.navigate('SelectCustomer', { area: area.name });
  };

  const renderAreaItem = ({ item }: { item: Area }) => (
    <TouchableOpacity
      style={styles.areaItem}
      onPress={() => handleSelectArea(item)}
      activeOpacity={0.7}
    >
      <View style={styles.areaIconContainer}>
        <Text style={styles.areaIcon}>📍</Text>
      </View>
      <Text style={styles.areaName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Select Area" showBack={false} />
      <View style={styles.content}>
        <AppInput
          placeholder="Search Areas"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <FlatList
          data={filteredAreas}
          keyExtractor={item => item.id}
          renderItem={renderAreaItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
        <Text style={styles.footer}>
          {filteredAreas.length} areas available
        </Text>
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
  listContent: {
    paddingBottom: SPACING.lg,
  },
  areaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  areaIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.lightGreen,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  areaIcon: {
    fontSize: 20,
  },
  areaName: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    flex: 1,
  },
  footer: {
    textAlign: 'center',
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    paddingVertical: SPACING.md,
  },
});
