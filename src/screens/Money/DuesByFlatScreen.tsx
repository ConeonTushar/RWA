import React, { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  FlatDueCard,
  FlatDueItem,
  MoneyDetailHeader,
  MoneyFilterChips,
  MoneySearchBar,
} from '../../components/money';
import { SCREENPARAMS } from '../../navigations/types';
import {
  FLAT_LEDGER_SCREEN,
  SEND_REMINDERS_SCREEN,
} from '../../navigations/url';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';

const FILTER_OPTIONS = ['All', 'Paid', 'Part paid', 'Due', 'Overdue'];

const MOCK_FLAT_DUES: FlatDueItem[] = [
  {
    id: '1',
    flatNumber: 'A-101',
    residentName: 'Amit Sharma',
    status: 'Paid',
    amountDue: '₹2,500',
    outstandingLabel: '1 Month Outstanding',
    isOverdue: false,
    vehicleNumber: 'MH12AB1234',
  },
  {
    id: '2',
    flatNumber: 'B-101',
    residentName: 'Amit Sharma',
    status: 'Part paid',
    amountDue: '₹2,500',
    outstandingLabel: '1 Month Outstanding',
    isOverdue: false,
    vehicleNumber: 'MH12CD5678',
  },
  {
    id: '3',
    flatNumber: 'C-101',
    residentName: 'Amit Sharma',
    status: 'Overdue',
    amountDue: '₹7,500',
    outstandingLabel: '3 Month Outstanding',
    isOverdue: true,
    vehicleNumber: 'MH12EF9012',
  },
  {
    id: '4',
    flatNumber: 'D-204',
    residentName: 'Priya Nair',
    status: 'Due',
    amountDue: '₹3,000',
    outstandingLabel: '1 Month Outstanding',
    isOverdue: false,
    vehicleNumber: 'MH12GH3456',
  },
];

const DuesByFlatScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<SCREENPARAMS>>();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredFlats = useMemo(() => {
    return MOCK_FLAT_DUES.filter((item) => {
      const matchesFilter =
        activeFilter === 'All' || item.status === activeFilter;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.flatNumber.toLowerCase().includes(query) ||
        item.residentName.toLowerCase().includes(query) ||
        (item.vehicleNumber && item.vehicleNumber.toLowerCase().includes(query));

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <MoneyDetailHeader
          title="Dues by flat"
          onBackPress={() => navigation.goBack()}
        />

        <MoneySearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFilterPress={() =>
            Alert.alert('Filter', 'Additional block & wing filters.')
          }
          containerStyle={styles.searchSpacing}
        />

        <MoneyFilterChips
          options={FILTER_OPTIONS}
          activeOption={activeFilter}
          onSelectOption={setActiveFilter}
          containerStyle={styles.chipsSpacing}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>FLAT RECORDS</Text>
          <Text style={styles.sectionCount}>
            {filteredFlats.length === MOCK_FLAT_DUES.length
              ? '24 Flats'
              : `${filteredFlats.length} Flats`}
          </Text>
        </View>

        <FlatList
          data={filteredFlats}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item, index }) => (
            <FlatDueCard
              item={item}
              showDivider={index < filteredFlats.length - 1}
              onPress={() =>
                navigation.navigate(FLAT_LEDGER_SCREEN, { flat: item })
              }
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No matching flat records.</Text>
            </View>
          }
        />

        {/* Bottom Outlined Action Button */}
        <View style={styles.footerContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate(SEND_REMINDERS_SCREEN, {
                selectedCount: 2,
                overdueCount: 18,
              })
            }
            style={styles.reminderBtn}
          >
            <Text style={styles.reminderBtnText}>Send reminders</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DuesByFlatScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
  },
  searchSpacing: {
    marginTop: hp(1.2),
  },
  chipsSpacing: {
    marginTop: hp(1.6),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(2.4),
    marginBottom: hp(0.6),
  },
  sectionTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
    color: COLORS.darkText,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  sectionCount: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
    color: COLORS.textSecondary,
  },
  listContent: {
    paddingBottom: hp(2),
  },
  emptyState: {
    paddingVertical: hp(6),
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.textSecondary,
  },
  footerContainer: {
    paddingTop: hp(1),
    paddingBottom: hp(2.5),
    backgroundColor: COLORS.white,
  },
  reminderBtn: {
    width: '100%',
    height: hp(6.2),
    borderRadius: wp(3.5),
    borderWidth: 1,
    borderColor: COLORS.darkText,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reminderBtnText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
  },
});
