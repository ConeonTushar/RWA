import React from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  DashedDivider,
  FlatLedgerSummaryCard,
  LedgerActionRow,
  LedgerActionsCard,
  MoneyDetailHeader,
  MonthlyLedgerEntry,
  MonthlyLedgerItem,
} from '../../components/money';
import { SCREENPARAMS } from '../../navigations/types';
import {
  ADD_CHARGE_OR_WAIVER_SCREEN,
  FLAT_LEDGER_SCREEN,
  RECORD_PAYMENT_SCREEN,
} from '../../navigations/url';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';

const DEFAULT_LEDGER_ENTRIES: MonthlyLedgerEntry[] = [
  {
    id: 'nov-2026',
    month: 'November 2026',
    status: 'Part paid',
    maintenanceCharge: '₹3,000',
    paymentReceived: '- ₹2,000',
    balanceLabel: 'November Balance',
    balanceAmount: '₹1,000',
  },
  {
    id: 'oct-2026',
    month: 'October 2026',
    status: 'Part paid',
    maintenanceCharge: '₹3,000',
    paymentReceived: '- ₹2,000',
    balanceLabel: 'October Balance',
    balanceAmount: '₹1,500',
  },
];

const FlatLedgerScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<SCREENPARAMS>>();
  const route = useRoute<RouteProp<SCREENPARAMS, typeof FLAT_LEDGER_SCREEN>>();
  const flat = route.params?.flat;

  const flatNumber = flat?.flatNumber || 'A-101';
  const residentName = flat?.residentName || 'Amit Sharma';
  const status = flat?.status || 'Part paid';
  const outstandingBalance = flat?.amountDue || '₹2,500';

  const ledgerActions: LedgerActionRow[] = [
    {
      id: 'record_payment',
      title: 'Record payment',
      subtitle: 'For Treasurer',
      onPress: () => navigation.navigate(RECORD_PAYMENT_SCREEN, { flat }),
    },
    {
      id: 'add_charge_waiver',
      title: 'Add charge or waiver',
      onPress: () => navigation.navigate(ADD_CHARGE_OR_WAIVER_SCREEN, { flat }),
    },
    {
      id: 'send_statement',
      title: 'Send statement',
      onPress: () =>
        Alert.alert(
          'Send statement',
          `Statement sent to ${residentName} (${flatNumber}).`,
        ),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerWrapper}>
        <MoneyDetailHeader
          title="Flat ledger"
          onBackPress={() => navigation.goBack()}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <FlatLedgerSummaryCard
          flatNumber={flatNumber}
          residentName={residentName}
          status={status}
          outstandingBalance={outstandingBalance}
        />

        {/* Monthly Ledger Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>MONTHLY LEDGER</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              Alert.alert('Monthly ledger', 'Viewing full ledger history.')
            }
          >
            <Text style={styles.viewAllText}>view all</Text>
          </TouchableOpacity>
        </View>

        {/* Monthly Entries */}
        {DEFAULT_LEDGER_ENTRIES.map((entry) => (
          <MonthlyLedgerItem key={entry.id} entry={entry} showDivider />
        ))}

        {/* Running Balance Row */}
        <View style={styles.runningBalanceRow}>
          <Text style={styles.runningBalanceLabel}>Running balance</Text>
          <Text style={styles.runningBalanceValue}>{outstandingBalance}</Text>
        </View>

        <DashedDivider />

        {/* Bottom Actions Card */}
        <LedgerActionsCard
          actions={ledgerActions}
          containerStyle={styles.actionsCardSpacing}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FlatLedgerScreen;

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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(2.4),
    marginBottom: hp(0.4),
  },
  sectionTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
    color: COLORS.darkText,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  viewAllText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
    color: COLORS.textSecondary,
  },
  runningBalanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(2.2),
  },
  runningBalanceLabel: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
  },
  runningBalanceValue: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.badgeUrgentText,
  },
  actionsCardSpacing: {
    marginTop: hp(2.5),
  },
});
