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
import {
  ExpenseRecordCard,
  ExpenseRecordItem,
  MoneyDetailHeader,
  MoneyStatItem,
  MoneyStatsGrid,
  ReportingPeriodCard,
} from '../../components/money';
import { SCREENPARAMS } from '../../navigations/types';
import { EXPENSE_APPROVAL_SCREEN } from '../../navigations/url';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';

const REPORTING_PERIODS = [
  'November 2026',
  'October 2026',
  'September 2026',
  'August 2026',
];

const EXPENSE_STATS: MoneyStatItem[] = [
  { id: 'this_month', label: 'This month', value: '1.28L' },
  { id: 'pending', label: 'Pending', value: '32K' },
];

const MOCK_EXPENSES: ExpenseRecordItem[] = [
  {
    id: 'exp-1',
    title: 'Lift motor repair',
    category: 'Lift and AMC',
    billDate: '18 Nov 2026',
    amount: '₹18,000',
    status: 'Pending',
    paidTo: 'ABC Lift Services',
    paymentMode: 'Bank transfer',
    submittedBy: 'Treasurer',
    invoiceName: 'Lift repair invoice.pdf',
  },
  {
    id: 'exp-2',
    title: 'Lift motor repair',
    category: 'Lift and AMC',
    billDate: '18 Nov 2026',
    amount: '₹18,000',
    status: 'Pending',
    paidTo: 'ABC Lift Services',
    paymentMode: 'Bank transfer',
    submittedBy: 'Treasurer',
    invoiceName: 'Lift repair invoice.pdf',
  },
];

const ExpenseSummaryScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<SCREENPARAMS>>();
  const [selectedPeriod, setSelectedPeriod] = useState('November 2026');
  const [periodModalVisible, setPeriodModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerWrapper}>
        <MoneyDetailHeader
          title="Expense summary"
          onBackPress={() => navigation.goBack()}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ReportingPeriodCard
          selectedPeriod={selectedPeriod}
          onPress={() => setPeriodModalVisible(true)}
          containerStyle={styles.periodSpacing}
        />

        <MoneyStatsGrid stats={EXPENSE_STATS} containerStyle={styles.statsSpacing} />

        <Text style={styles.sectionTitle}>EXPENSE RECORDS</Text>

        {MOCK_EXPENSES.map((item, index) => (
          <ExpenseRecordCard
            key={item.id}
            item={item}
            showDivider={index < MOCK_EXPENSES.length - 1}
            onPress={() =>
              navigation.navigate(EXPENSE_APPROVAL_SCREEN, { expense: item })
            }
          />
        ))}
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

export default ExpenseSummaryScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerWrapper: {
    paddingHorizontal: wp(5),
  },
  scrollContent: {
    paddingHorizontal: wp(5),
    paddingBottom: hp(4),
  },
  periodSpacing: {
    marginTop: hp(1.2),
  },
  statsSpacing: {
    marginTop: hp(1.8),
  },
  sectionTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
    color: COLORS.darkText,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginTop: hp(2.8),
    marginBottom: hp(0.6),
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
