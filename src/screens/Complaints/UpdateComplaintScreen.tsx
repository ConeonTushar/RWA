import React, { useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';
import {
  ComplaintDetailHeader,
  ComplaintTicketSummary,
  CreateExpenseModal,
  FloatingLabelInput,
  NotifyResidentCard,
} from '../../components/complaints';
import VectorIcon from '../../components/elements/VectorIcon';
import { SCREENPARAMS } from '../../navigations/types';
import { UPDATE_COMPLAINT_SCREEN } from '../../navigations/url';

type RouteProps = RouteProp<SCREENPARAMS, typeof UPDATE_COMPLAINT_SCREEN>;

const STATUS_OPTIONS = [
  {
    id: 'in_progress',
    title: 'In progress',
    description: 'Work has started and is ongoing.',
  },
  {
    id: 'resolved',
    title: 'Resolved',
    description: 'The complaint has been completed.',
  },
  {
    id: 'needs_more_time',
    title: 'Needs more time',
    description: 'More time is required to complete the work.',
  },
];

const UpdateComplaintScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProps>();
  const item = route.params?.item;

  const ticketId = item?.ticketId ?? '#CMP-1024';
  const title = item?.title ?? 'Lift not working';
  const subtitle = item
    ? `${item.category} · ${item.location} · Flat ${item.flat}`
    : 'Lift · Tower B · Flat B-302';

  const [selectedStatus, setSelectedStatus] = useState<string>('in_progress');
  const [note, setNote] = useState('');
  const [cost, setCost] = useState('');
  const [notifyResident, setNotifyResident] = useState(true);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);

  const handleUploadPress = () => {
    Alert.alert(
      'Upload Proof',
      'Select photos or videos under 10 MB to attach.'
    );
  };

  const handleSaveUpdate = () => {
    if (cost.trim().length > 0) {
      setIsExpenseModalVisible(true);
      return;
    }
    Alert.alert('Update Saved', `${ticketId} status has been updated.`, [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  const handleCreateExpense = () => {
    setIsExpenseModalVisible(false);
    Alert.alert(
      'Expense Created',
      `Expense entry of ₹${cost || '2,500'} created for ${ticketId}.`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  const handleSkipExpense = () => {
    setIsExpenseModalVisible(false);
    navigation.goBack();
  };

  return (
    <View style={styles.screen}>
      <StatusBar
        barStyle="dark-content"
        {...(Platform.OS === 'android'
          ? { backgroundColor: COLORS.white }
          : {})}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <ComplaintDetailHeader
          title="Update complaint"
          onBackPress={() => navigation.goBack()}
        />

        <ComplaintTicketSummary
          ticketId={ticketId}
          title={title}
          subtitle={subtitle}
          statusText="In progress"
          statusColor={COLORS.ownerWaitingText}
          containerStyle={styles.summarySpacing}
        />

        {/* Status* */}
        <Text style={styles.sectionLabel}>Status*</Text>
        <View style={styles.statusList}>
          {STATUS_OPTIONS.map((opt) => {
            const isSelected = selectedStatus === opt.id;
            return (
              <TouchableOpacity
                key={opt.id}
                activeOpacity={0.8}
                onPress={() => setSelectedStatus(opt.id)}
                style={[
                  styles.statusCard,
                  isSelected
                    ? styles.statusCardSelected
                    : styles.statusCardDefault,
                ]}
              >
                <Text style={styles.statusTitle}>{opt.title}</Text>
                <Text style={styles.statusDescription}>{opt.description}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Note to assignee */}
        <FloatingLabelInput
          label="Note to assignee"
          value={note}
          onChangeText={setNote}
          placeholder="What needs to be done"
          multiline
          containerStyle={styles.fieldSpacing}
        />

        {/* Proof Photos / Videos */}
        <Text style={styles.sectionLabel}>Proof Photos / Videos</Text>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={handleUploadPress}
          style={styles.uploadBox}
        >
          <VectorIcon
            type="Feather"
            name="upload"
            size={wp(5.5)}
            color={COLORS.darkText}
          />
          <Text style={styles.uploadTitle}>Upload Photos / Videos</Text>
          <Text style={styles.uploadSubtitle}>Recommended under 10 mb</Text>
        </TouchableOpacity>

        {/* Cost (optional) */}
        <FloatingLabelInput
          label="Cost (optional)"
          value={cost}
          onChangeText={setCost}
          placeholder="Enter cost"
          prefix="₹"
          keyboardType="numeric"
          containerStyle={styles.fieldSpacing}
        />

        {/* Notify the resident */}
        <NotifyResidentCard
          enabled={notifyResident}
          onToggle={() => setNotifyResident((prev) => !prev)}
          containerStyle={styles.fieldSpacing}
        />

        {/* Save update CTA */}
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Save update"
          activeOpacity={0.8}
          onPress={handleSaveUpdate}
          style={styles.primaryBtn}
        >
          <Text style={styles.primaryBtnText}>Save update</Text>
        </TouchableOpacity>
      </ScrollView>

      <CreateExpenseModal
        visible={isExpenseModalVisible}
        amount={cost}
        onCreateExpense={handleCreateExpense}
        onSkip={handleSkipExpense}
      />
    </View>
  );
};

export default UpdateComplaintScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingHorizontal: wp(5),
    paddingTop: Platform.OS === 'ios' ? hp(1) : hp(2),
    paddingBottom: hp(5),
  },
  summarySpacing: {
    marginTop: hp(1.2),
  },
  sectionLabel: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
    marginTop: hp(2.2),
    marginBottom: hp(1.2),
  },
  statusList: {
    gap: hp(1.4),
  },
  statusCard: {
    borderRadius: wp(4),
    borderWidth: 1,
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(1.8),
  },
  statusCardSelected: {
    borderColor: COLORS.badgeGreenText,
    backgroundColor: COLORS.applicantMintEnd,
  },
  statusCardDefault: {
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.white,
  },
  statusTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
  },
  statusDescription: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.4),
  },
  fieldSpacing: {
    marginTop: hp(2.2),
  },
  uploadBox: {
    width: '100%',
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.white,
    paddingVertical: hp(2.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadTitle: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
    marginTop: hp(1),
  },
  uploadSubtitle: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.placeholder,
    marginTop: hp(0.3),
  },
  primaryBtn: {
    width: '100%',
    height: hp(5.8),
    borderRadius: wp(3.5),
    backgroundColor: COLORS.darkBtn,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(3),
  },
  primaryBtnText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.white,
  },
});
