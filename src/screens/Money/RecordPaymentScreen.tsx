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
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FloatingLabelInput } from '../../components/complaints';
import { SubmitButton, VectorIcon } from '../../components/elements';
import {
  MoneyDetailHeader,
  SelectableGridOption,
  SelectableOptionGrid,
  SelectedFlatSummary,
} from '../../components/money';
import { SCREENPARAMS } from '../../navigations/types';
import { RECORD_PAYMENT_SCREEN } from '../../navigations/url';
import { COLORS } from '../../utils/font';
import { hp, wp } from '../../utils/helper';

const PAYMENT_MODES: SelectableGridOption[] = [
  { id: 'cash', label: 'Cash' },
  { id: 'cheque', label: 'Cheque' },
  { id: 'upi', label: 'UPI to society account' },
  { id: 'bank_transfer', label: 'Bank transfer' },
];

const RecordPaymentScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<SCREENPARAMS>>();
  const route =
    useRoute<RouteProp<SCREENPARAMS, typeof RECORD_PAYMENT_SCREEN>>();
  const flat = route.params?.flat;

  const rawFlat = flat?.flatNumber || 'B-204';
  const flatNumber = rawFlat.startsWith('Flat ') ? rawFlat : `Flat ${rawFlat}`;
  const residentName = flat?.residentName || 'Rahul Sharma';
  const outstandingAmount = flat?.amountDue || '₹2,500';
  const numericDefault = outstandingAmount.replace(/[^0-9.,]/g, '') || '2,500';

  const [amountReceived, setAmountReceived] = useState(numericDefault);
  const [paymentMode, setPaymentMode] = useState<string>('cash');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [dateReceived, setDateReceived] = useState('');

  const handleSave = () => {
    if (!amountReceived.trim()) {
      Alert.alert('Missing amount', 'Please enter the amount received.');
      return;
    }
    Alert.alert(
      'Payment recorded',
      `Receipt of ₹${amountReceived} sent for ${flatNumber}.`,
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
            title="Record payment"
            onBackPress={() => navigation.goBack()}
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          <SelectedFlatSummary
            flatNumber={flatNumber}
            subtitle={`Tower B · ${residentName}`}
            outstandingAmount={outstandingAmount}
          />

          <FloatingLabelInput
            label="Amount received*"
            value={amountReceived}
            onChangeText={setAmountReceived}
            prefix="₹"
            keyboardType="numeric"
            containerStyle={styles.fieldSpacing}
          />

          <SelectableOptionGrid
            title="Payment Mode"
            required
            options={PAYMENT_MODES}
            selectedId={paymentMode}
            onSelect={setPaymentMode}
            containerStyle={styles.modeSpacing}
          />

          <FloatingLabelInput
            label="Cheque or reference number"
            value={referenceNumber}
            onChangeText={setReferenceNumber}
            placeholder="Enter reference number"
            containerStyle={styles.fieldSpacing}
          />

          <FloatingLabelInput
            label="Date received*"
            value={dateReceived}
            onChangeText={setDateReceived}
            placeholder="DD / MM / YYYY"
            rightIcon={
              <VectorIcon
                type="Feather"
                name="calendar"
                size={wp(4.8)}
                color={COLORS.darkText}
              />
            }
            containerStyle={styles.fieldSpacing}
          />

          <SubmitButton
            title="Save and send receipt"
            onPress={handleSave}
            containerStyle={styles.submitSpacing}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RecordPaymentScreen;

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
  fieldSpacing: {
    marginTop: hp(2.2),
  },
  modeSpacing: {
    marginTop: hp(2.6),
  },
  submitSpacing: {
    marginTop: hp(2.2),
  },
});
