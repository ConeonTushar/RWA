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
  MoneyHeader,
  MoneyQuickActions,
  MoneyQuickActionItem,
  MoneyStatItem,
  MoneyStatsGrid,
  ReportingPeriodCard,
} from '../../components/money';
import { SCREENPARAMS } from '../../navigations/types';
import {
  ADD_CHARGE_OR_WAIVER_SCREEN,
  ADD_EXPENSE_SCREEN,
  DUES_BY_FLAT_SCREEN,
  EXPENSE_SUMMARY_SCREEN,
  NOTIFICATIONS_SCREEN,
  RECORD_PAYMENT_SCREEN,
  REPORTS_SUMMARY_SCREEN,
} from '../../navigations/url';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';

const REPORTING_PERIODS = [
  'November 2026',
  'October 2026',
  'September 2026',
  'August 2026',
];

const STATS_BY_PERIOD: Record<string, MoneyStatItem[]> = {
  'November 2026': [
    { id: 'collected', label: 'Collected', value: '₹8.4L' },
    { id: 'pending', label: 'Pending', value: '₹1.6L' },
    { id: 'overdue', label: 'Overdue flats', value: '18' },
    { id: 'expenses', label: 'Expenses this month', value: '₹2.1L' },
  ],
  'October 2026': [
    { id: 'collected', label: 'Collected', value: '₹9.1L' },
    { id: 'pending', label: 'Pending', value: '₹0.9L' },
    { id: 'overdue', label: 'Overdue flats', value: '11' },
    { id: 'expenses', label: 'Expenses this month', value: '₹1.8L' },
  ],
};

const MoneyScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<SCREENPARAMS>>();
  const [selectedPeriod, setSelectedPeriod] = useState<string>('November 2026');
  const [periodModalVisible, setPeriodModalVisible] = useState(false);

  const stats =
    STATS_BY_PERIOD[selectedPeriod] || STATS_BY_PERIOD['November 2026'];

  const quickActions: MoneyQuickActionItem[] = [
    {
      id: 'dues_by_flat',
      title: 'Dues by flat',
      subtitle: 'View flat-wise outstanding amounts',
      onPress: () => navigation.navigate(DUES_BY_FLAT_SCREEN),
    },
    {
      id: 'record_payment',
      title: 'Record payment',
      subtitle: 'Record a received payment',
      onPress: () => navigation.navigate(RECORD_PAYMENT_SCREEN),
    },
    {
      id: 'add_expense',
      title: 'Add expense',
      subtitle: 'Submit an expense entry',
      onPress: () => navigation.navigate(ADD_EXPENSE_SCREEN),
    },
    {
      id: 'add_charge',
      title: 'Add charge or waiver',
      subtitle: 'Add extra dues or waiver',
      onPress: () => navigation.navigate(ADD_CHARGE_OR_WAIVER_SCREEN),
    },
    {
      id: 'reports',
      title: 'Reports',
      subtitle: 'View financial reports',
      onPress: () => navigation.navigate(REPORTS_SUMMARY_SCREEN),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <MoneyHeader
          hasUnreadNotification
          onSearchPress={() => navigation.navigate(DUES_BY_FLAT_SCREEN)}
          onNotificationPress={() =>
            navigation.navigate(NOTIFICATIONS_SCREEN)
          }
        />

        <ReportingPeriodCard
          selectedPeriod={selectedPeriod}
          onPress={() => setPeriodModalVisible(true)}
          containerStyle={styles.periodCardSpacing}
        />

        <MoneyStatsGrid
          stats={stats}
          onPressStat={(item) => {
            if (item.id === 'pending' || item.id === 'overdue') {
              navigation.navigate(DUES_BY_FLAT_SCREEN);
            } else if (item.id === 'expenses') {
              navigation.navigate(EXPENSE_SUMMARY_SCREEN);
            }
          }}
          containerStyle={styles.statsSpacing}
        />

        <MoneyQuickActions
          actions={quickActions}
          containerStyle={styles.actionsSpacing}
        />
      </ScrollView>

      {/* Reporting period picker modal */}
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

export default MoneyScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingHorizontal: wp(5),
    paddingTop: hp(1),
    paddingBottom: hp(13),
  },
  periodCardSpacing: {
    marginTop: hp(1.6),
  },
  statsSpacing: {
    marginTop: hp(2),
  },
  actionsSpacing: {
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
