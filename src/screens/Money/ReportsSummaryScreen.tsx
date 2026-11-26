import React, { useState } from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { VectorIcon } from '../../components/elements';
import {
  ComplaintsMiniStatsRow,
  DefaulterItem,
  ExpenseCategoryBreakdownCard,
  ExpenseCategoryStat,
  MiniStatBox,
  MoneyDetailHeader,
  MoneyStatItem,
  MoneyStatsGrid,
  TopDefaultersCard,
} from '../../components/money';
import { SCREENPARAMS } from '../../navigations/types';
import { DUES_BY_FLAT_SCREEN } from '../../navigations/url';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';

const REPORTING_PERIODS = [
  'November 2026',
  'October 2026',
  'September 2026',
  'August 2026',
];

const BILLING_STATS: MoneyStatItem[] = [
  { id: 'billed', label: 'Billed', value: '₹8.5L' },
  { id: 'collected', label: 'Collected', value: '₹6.8L' },
];

const TOP_DEFAULTERS: DefaulterItem[] = [
  { id: '1', flatNumber: 'A-204', amount: '₹18,000' },
  { id: '2', flatNumber: 'B-302', amount: '₹15,000' },
  { id: '3', flatNumber: 'C-105', amount: '₹12,000' },
  { id: '4', flatNumber: 'A-401', amount: '₹11,200' },
  { id: '5', flatNumber: 'D-209', amount: '₹9,500' },
];

const EXPENSE_CATEGORIES: ExpenseCategoryStat[] = [
  { id: 'security', label: 'Security', percentage: 70 },
  { id: 'repairs', label: 'Repairs', percentage: 25 },
  { id: 'housekeeping', label: 'Housekeeping', percentage: 45 },
  { id: 'electricity', label: 'Electricity', percentage: 35 },
  { id: 'other', label: 'Other', percentage: 20 },
];

const COMPLAINT_STATS: MiniStatBox[] = [
  { id: 'open', value: '42', label: 'Open' },
  { id: 'resolved', value: '36', label: 'Resolved' },
  { id: 'avg', value: '2.4d', label: 'Avg. resolution' },
];

const ReportsSummaryScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<SCREENPARAMS>>();
  const [selectedPeriod, setSelectedPeriod] = useState('November 2026');
  const [periodModalVisible, setPeriodModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <MoneyDetailHeader
            title="Reports summary"
            onBackPress={() => navigation.goBack()}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setPeriodModalVisible(true)}
          style={styles.periodPill}
        >
          <Text style={styles.periodPillText}>{selectedPeriod}</Text>
          <VectorIcon
            type="Feather"
            name="chevron-down"
            size={wp(3.8)}
            color={COLORS.darkText}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <MoneyStatsGrid stats={BILLING_STATS} />

        <TopDefaultersCard
          items={TOP_DEFAULTERS}
          onPressSeeAll={() => navigation.navigate(DUES_BY_FLAT_SCREEN)}
          containerStyle={styles.sectionSpacing}
        />

        <ExpenseCategoryBreakdownCard
          categories={EXPENSE_CATEGORIES}
          containerStyle={styles.sectionSpacing}
        />

        <ComplaintsMiniStatsRow
          items={COMPLAINT_STATS}
          containerStyle={styles.sectionSpacing}
        />
      </ScrollView>

      <Modal
        visible={periodModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPeriodModalVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setPeriodModalVisible(false)}
          style={styles.modalOverlay}
        >
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Select reporting period</Text>
            {REPORTING_PERIODS.map((period) => {
              const isSelected = period === selectedPeriod;
              return (
                <TouchableOpacity
                  key={period}
                  activeOpacity={0.75}
                  onPress={() => {
                    setSelectedPeriod(period);
                    setPeriodModalVisible(false);
                  }}
                  style={[
                    styles.periodOption,
                    isSelected && styles.periodOptionSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.periodOptionText,
                      isSelected && styles.periodOptionTextSelected,
                    ]}
                  >
                    {period}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default ReportsSummaryScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
  },
  headerLeft: {
    flex: 1,
    marginRight: wp(2),
  },
  periodPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: wp(5),
    paddingHorizontal: wp(3.2),
    paddingVertical: hp(0.65),
    backgroundColor: COLORS.white,
    gap: wp(1.2),
  },
  periodPillText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
    color: COLORS.darkText,
  },
  scrollContent: {
    paddingHorizontal: wp(5),
    paddingTop: hp(1.4),
    paddingBottom: hp(4),
  },
  sectionSpacing: {
    marginTop: hp(3),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    paddingHorizontal: wp(6),
  },
  modalSheet: {
    backgroundColor: COLORS.white,
    borderRadius: wp(4),
    padding: wp(5),
  },
  modalTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.l2,
    color: COLORS.darkText,
    marginBottom: hp(1.5),
  },
  periodOption: {
    paddingVertical: hp(1.4),
    paddingHorizontal: wp(3.5),
    borderRadius: wp(2.5),
    marginBottom: hp(0.6),
  },
  periodOptionSelected: {
    backgroundColor: COLORS.approvalChipActiveBg,
  },
  periodOptionText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
  },
  periodOptionTextSelected: {
    fontFamily: FONTS.SEMI_OUTFIT,
    color: COLORS.approvalChipActiveText,
  },
});
