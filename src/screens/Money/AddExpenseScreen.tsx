import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FloatingLabelInput } from '../../components/complaints';
import {
  CustomDropdown,
  DropdownItem,
  SubmitButton,
  VectorIcon,
} from '../../components/elements';
import {
  InvoiceUploadBox,
  MoneyDetailHeader,
  SelectableGridOption,
  SelectableOptionGrid,
} from '../../components/money';
import { SCREENPARAMS } from '../../navigations/types';
import { COLORS } from '../../utils/font';
import { hp, wp } from '../../utils/helper';

const EXPENSE_CATEGORIES: DropdownItem[] = [
  { id: 'lift_amc', name: 'Lift and AMC' },
  { id: 'security', name: 'Security' },
  { id: 'housekeeping', name: 'Housekeeping' },
  { id: 'electricity', name: 'Electricity' },
  { id: 'repairs', name: 'Repairs & Maintenance' },
  { id: 'other', name: 'Other' },
];

const PAYMENT_MODES: SelectableGridOption[] = [
  { id: 'cash', label: 'Cash' },
  { id: 'cheque', label: 'Cheque' },
  { id: 'upi', label: 'UPI to society account' },
  { id: 'bank_transfer', label: 'Bank transfer' },
];

const AddExpenseScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<SCREENPARAMS>>();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<string | number | null>(null);
  const [amount, setAmount] = useState('');
  const [paidTo, setPaidTo] = useState('');
  const [billDate, setBillDate] = useState('');
  const [invoiceFileName, setInvoiceFileName] = useState<string | undefined>();
  const [paymentMode, setPaymentMode] = useState<string>('cash');
  const [note, setNote] = useState('');

  const handleAttachInvoice = () => {
    setInvoiceFileName('Lift_repair_invoice.pdf');
  };

  const handleSubmit = () => {
    if (!title.trim() || !amount.trim() || !paidTo.trim()) {
      Alert.alert(
        'Missing details',
        'Please fill in the expense title, amount, and payee.',
      );
      return;
    }

    Alert.alert(
      'Submitted for approval',
      `Expense "${title}" (₹${amount}) has been submitted for approval.`,
      [{ text: 'OK', onPress: () => navigation.goBack() }],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.headerWrapper}>
          <MoneyDetailHeader
            title="Add Expense"
            onBackPress={() => navigation.goBack()}
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          <FloatingLabelInput
            label="What is it for? *"
            value={title}
            onChangeText={setTitle}
            placeholder="For example Lift repair"
          />

          <CustomDropdown
            label="Category"
            required
            data={EXPENSE_CATEGORIES}
            value={category}
            onChange={setCategory}
            placeholder="Select category"
            containerStyle={styles.dropdownSpacing}
            rightIcon={
              <VectorIcon
                type="Feather"
                name="chevron-down"
                size={wp(4.8)}
                color={COLORS.darkText}
              />
            }
          />

          <FloatingLabelInput
            label="Amount (rupees) *"
            value={amount}
            onChangeText={setAmount}
            prefix="₹"
            placeholder="Enter amount"
            keyboardType="numeric"
            containerStyle={styles.fieldSpacing}
          />

          <FloatingLabelInput
            label="Paid to *"
            value={paidTo}
            onChangeText={setPaidTo}
            placeholder="Search vendor, staff or enter name"
            rightIcon={
              <VectorIcon
                type="Feather"
                name="search"
                size={wp(4.6)}
                color={COLORS.darkText}
              />
            }
            containerStyle={styles.fieldSpacing}
          />

          <FloatingLabelInput
            label="Bill date *"
            value={billDate}
            onChangeText={setBillDate}
            placeholder="DD / MM / YYYY"
            rightIcon={
              <VectorIcon
                type="Feather"
                name="calendar"
                size={wp(4.6)}
                color={COLORS.darkText}
              />
            }
            containerStyle={styles.fieldSpacing}
          />

          <InvoiceUploadBox
            fileName={invoiceFileName}
            onPress={handleAttachInvoice}
            containerStyle={styles.sectionSpacing}
          />

          <SelectableOptionGrid
            title="Payment Mode"
            required
            options={PAYMENT_MODES}
            selectedId={paymentMode}
            onSelect={setPaymentMode}
            containerStyle={styles.sectionSpacing}
          />

          <FloatingLabelInput
            label="Note (optional)"
            value={note}
            onChangeText={setNote}
            placeholder="Add any additional details..."
            multiline
            containerStyle={styles.sectionSpacing}
          />

          <SubmitButton
            title="Submit for approval"
            onPress={handleSubmit}
            containerStyle={styles.submitSpacing}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddExpenseScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  flex: {
    flex: 1,
  },
  headerWrapper: {
    paddingHorizontal: wp(5),
  },
  scrollContent: {
    paddingHorizontal: wp(5),
    paddingTop: hp(1.2),
    paddingBottom: hp(4),
  },
  dropdownSpacing: {
    marginTop: hp(2.2),
    marginBottom: 0,
  },
  fieldSpacing: {
    marginTop: hp(2),
  },
  sectionSpacing: {
    marginTop: hp(2.4),
  },
  submitSpacing: {
    marginTop: hp(2.2),
  },
});
