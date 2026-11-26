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
import { DetailKeyValueRow } from '../../components/approvals';
import { SubmitButton } from '../../components/elements';
import {
  ApprovalProgressStep,
  ExpenseApprovalProgressCard,
  ExpenseApprovalSummary,
  MoneyDetailHeader,
  SupportingDocumentRow,
} from '../../components/money';
import { SCREENPARAMS } from '../../navigations/types';
import { EXPENSE_APPROVAL_SCREEN } from '../../navigations/url';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';

const APPROVAL_STEPS: ApprovalProgressStep[] = [
  {
    id: 'submitted',
    title: 'Expense submitted',
    subtitle: 'Treasurer · Submitted',
    badgeText: 'Approved',
    badgeTone: 'approved',
  },
  {
    id: 'president',
    title: 'President approval',
    subtitle: 'Needs approval',
    badgeText: 'Pending',
    badgeTone: 'pending',
  },
  {
    id: 'second_signer',
    title: 'Second signer',
    subtitle: "Required if expenses exceeds the society's configured limit",
  },
];

const ExpenseApprovalScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<SCREENPARAMS>>();
  const route =
    useRoute<RouteProp<SCREENPARAMS, typeof EXPENSE_APPROVAL_SCREEN>>();
  const expense = route.params?.expense;

  const amount = expense?.amount || '₹18,000';
  const title = expense?.title || 'Lift motor repair';
  const category = expense?.category || 'Lift and AMC';
  const paidTo = expense?.paidTo || 'ABC Lift Services';
  const billDate = expense?.billDate || '18 Nov 2026';
  const paymentMode = expense?.paymentMode || 'Bank transfer';
  const submittedBy = expense?.submittedBy || 'Treasurer';
  const invoiceName = expense?.invoiceName || 'Lift repair invoice.pdf';

  const detailRows = [
    { label: 'Expense title', value: title },
    { label: 'Category', value: category },
    { label: 'Amount', value: amount },
    { label: 'Paid to', value: paidTo },
    { label: 'Bill date', value: billDate },
    { label: 'Payment mode', value: paymentMode },
    { label: 'Submitted by', value: submittedBy },
  ];

  const handleApprove = () => {
    Alert.alert('Expense approved', `${title} (${amount}) has been approved.`, [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  const handleReject = () => {
    Alert.alert('Expense rejected', `${title} (${amount}) has been rejected.`, [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerWrapper}>
        <MoneyDetailHeader
          title="Expense Approval"
          onBackPress={() => navigation.goBack()}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ExpenseApprovalSummary
          amount={amount}
          title={title}
          submittedDate={billDate}
        />

        <Text style={styles.sectionTitle}>EXPENSE DETAILS</Text>
        <View style={styles.detailsBlock}>
          {detailRows.map((row) => (
            <DetailKeyValueRow
              key={row.label}
              label={row.label}
              value={row.value}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>INVOICE / SUPPORTING DOCUMENTS</Text>
        <SupportingDocumentRow
          fileName={invoiceName}
          onPressView={() =>
            Alert.alert('Invoice preview', `Opening ${invoiceName}`)
          }
        />

        <Text style={styles.sectionTitle}>APPROVAL PROGRESS</Text>
        <ExpenseApprovalProgressCard
          steps={APPROVAL_STEPS}
          containerStyle={styles.progressSpacing}
        />

        <SubmitButton
          title="Approve"
          onPress={handleApprove}
          containerStyle={styles.approveSpacing}
        />

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleReject}
          style={styles.rejectButton}
        >
          <Text style={styles.rejectButtonText}>Reject</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExpenseApprovalScreen;

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
    paddingTop: hp(1),
    paddingBottom: hp(4),
  },
  sectionTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
    color: COLORS.darkText,
    letterSpacing: 0.7,
    textTransform: 'uppercase',
    marginTop: hp(2.4),
    marginBottom: hp(0.8),
  },
  detailsBlock: {
    width: '100%',
  },
  progressSpacing: {
    marginTop: hp(0.4),
  },
  approveSpacing: {
    marginTop: hp(2),
  },
  rejectButton: {
    width: '100%',
    height: hp(6),
    borderRadius: wp(3.5),
    borderWidth: 1.2,
    borderColor: COLORS.darkBtn,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(1.4),
  },
  rejectButtonText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
  },
});
