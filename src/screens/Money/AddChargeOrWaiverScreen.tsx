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
import {
  CustomDropdown,
  DropdownItem,
  SubmitButton,
  VectorIcon,
} from '../../components/elements';
import {
  MoneyDetailHeader,
  SelectableGridOption,
  SelectableOptionGrid,
  SelectedFlatSummary,
} from '../../components/money';
import { SCREENPARAMS } from '../../navigations/types';
import { ADD_CHARGE_OR_WAIVER_SCREEN } from '../../navigations/url';
import { COLORS } from '../../utils/font';
import { hp, wp } from '../../utils/helper';

const ENTRY_TYPES: SelectableGridOption[] = [
  { id: 'charge', label: 'Charge' },
  { id: 'waiver', label: 'Waiver' },
];

const REASON_OPTIONS: DropdownItem[] = [
  { id: 'late_fee', name: 'Late Fee' },
  { id: 'maintenance_adj', name: 'Maintenance Adjustment' },
  { id: 'repair_charge', name: 'Common Area Repair' },
  { id: 'penalty_waiver', name: 'Penalty Waiver' },
  { id: 'goodwill_waiver', name: 'Goodwill Waiver' },
];

const AddChargeOrWaiverScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<SCREENPARAMS>>();
  const route =
    useRoute<RouteProp<SCREENPARAMS, typeof ADD_CHARGE_OR_WAIVER_SCREEN>>();
  const flat = route.params?.flat;

  const rawFlat = flat?.flatNumber || 'B-204';
  const flatNumber = rawFlat.startsWith('Flat ') ? rawFlat : `Flat ${rawFlat}`;
  const residentName = flat?.residentName || 'Rahul Sharma';
  const outstandingAmount = flat?.amountDue || '₹2,500';
  const numericDefault = outstandingAmount.replace(/[^0-9.,]/g, '') || '2,500';

  const [entryType, setEntryType] = useState<string>('charge');
  const [reason, setReason] = useState<string | number | null>('late_fee');
  const [amount, setAmount] = useState(numericDefault);
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    if (!amount.trim()) {
      Alert.alert('Missing amount', 'Please enter an amount.');
      return;
    }
    const actionLabel = entryType === 'charge' ? 'Charge added' : 'Waiver applied';
    Alert.alert(
      actionLabel,
      `${actionLabel} of ₹${amount} for ${flatNumber}.`,
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
            title="Add charge or waiver"
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

          <SelectableOptionGrid
            title="Type"
            required
            options={ENTRY_TYPES}
            selectedId={entryType}
            onSelect={setEntryType}
            containerStyle={styles.typeSpacing}
          />

          <CustomDropdown
            label="Reason"
            required
            data={REASON_OPTIONS}
            value={reason}
            onChange={setReason}
            placeholder="Select reason"
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
            label="Amount *"
            value={amount}
            onChangeText={setAmount}
            prefix="₹"
            keyboardType="numeric"
            containerStyle={styles.fieldSpacing}
          />

          <FloatingLabelInput
            label="Note"
            value={note}
            onChangeText={setNote}
            placeholder="Add a note"
            multiline
            containerStyle={styles.fieldSpacing}
          />

          <SubmitButton
            title="Submit"
            onPress={handleSubmit}
            containerStyle={styles.submitSpacing}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddChargeOrWaiverScreen;

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
  typeSpacing: {
    marginTop: hp(2.4),
  },
  dropdownSpacing: {
    marginTop: hp(2.4),
    marginBottom: 0,
  },
  fieldSpacing: {
    marginTop: hp(2.2),
  },
  submitSpacing: {
    marginTop: hp(2.4),
  },
});
