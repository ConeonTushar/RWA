import React, { useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';
import {
  ComplaintDetailHeader,
  ComplaintTicketSummary,
  FloatingLabelInput,
  NotifyResidentCard,
} from '../../components/complaints';
import VectorIcon from '../../components/elements/VectorIcon';
import { SCREENPARAMS } from '../../navigations/types';
import { ASSIGN_COMPLAINT_SCREEN } from '../../navigations/url';

type RouteProps = RouteProp<SCREENPARAMS, typeof ASSIGN_COMPLAINT_SCREEN>;

const PRIORITY_OPTIONS = ['Low', 'Normal', 'High', 'Urgent'] as const;
const ASSIGNEE_SUGGESTIONS = [
  'Facility Manager',
  'Apex Elevator AMC',
  'Maintenance Team',
  'Security Desk',
];
const DUE_DATE_SUGGESTIONS = [
  'Today, 6:00 PM',
  'Tomorrow, 12:00 PM',
  '28 Nov 2026',
];

const AssignComplaintScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProps>();
  const item = route.params?.item;

  const ticketId = item?.ticketId ?? '#CMP-1024';
  const title = item?.title ?? 'Lift not working';
  const subtitle = item
    ? `${item.category} · ${item.location} · Flat ${item.flat}`
    : 'Lift · Tower B · Flat B-302';
  const overdueLabel = item?.overdueLabel ?? 'Overdue 1 d';

  const [assignee, setAssignee] = useState('');
  const [showAssigneeList, setShowAssigneeList] = useState(false);
  const [priority, setPriority] = useState<string>('Normal');
  const [dueBy, setDueBy] = useState('');
  const [showDueDateList, setShowDueDateList] = useState(false);
  const [note, setNote] = useState('');
  const [notifyResident, setNotifyResident] = useState(true);

  const handleAssign = () => {
    const target = assignee.trim() || 'Facility Manager';
    Alert.alert(
      'Complaint Assigned',
      `${ticketId} has been assigned to ${target} (${priority} priority).`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
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
          title="Assign complaint"
          onBackPress={() => navigation.goBack()}
        />

        <ComplaintTicketSummary
          ticketId={ticketId}
          title={title}
          subtitle={subtitle}
          statusText={overdueLabel}
          statusColor={COLORS.badgeUrgentText}
          containerStyle={styles.summarySpacing}
        />

        {/* Assign To* */}
        <Text style={styles.fieldLabel}>Assign To*</Text>
        <View style={styles.pillInput}>
          <VectorIcon
            type="Feather"
            name="search"
            size={wp(4.8)}
            color={COLORS.textSecondary}
          />
          <TextInput
            style={styles.pillTextInput}
            placeholder="Select person or vendor"
            placeholderTextColor={COLORS.placeholder}
            value={assignee}
            onChangeText={setAssignee}
            onFocus={() => setShowAssigneeList(true)}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowAssigneeList((prev) => !prev)}
          >
            <VectorIcon
              type="Feather"
              name={showAssigneeList ? 'chevron-up' : 'chevron-down'}
              size={wp(4.5)}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {showAssigneeList && (
          <View style={styles.dropdownBox}>
            {ASSIGNEE_SUGGESTIONS.map((person) => (
              <TouchableOpacity
                key={person}
                activeOpacity={0.7}
                onPress={() => {
                  setAssignee(person);
                  setShowAssigneeList(false);
                }}
                style={styles.dropdownRow}
              >
                <Text style={styles.dropdownText}>{person}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Priority* */}
        <Text style={styles.fieldLabel}>Priority*</Text>
        <View style={styles.priorityRow}>
          {PRIORITY_OPTIONS.map((option) => {
            const isActive = priority === option;
            return (
              <TouchableOpacity
                key={option}
                activeOpacity={0.75}
                onPress={() => setPriority(option)}
                style={[
                  styles.priorityChip,
                  isActive ? styles.priorityChipActive : styles.priorityChipInactive,
                ]}
              >
                <Text
                  style={[
                    styles.priorityText,
                    isActive
                      ? styles.priorityTextActive
                      : styles.priorityTextInactive,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Due By* */}
        <Text style={styles.fieldLabel}>Due By*</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setShowDueDateList((prev) => !prev)}
          style={styles.pillInput}
        >
          <Text
            style={[
              styles.pillPlaceholderText,
              dueBy ? styles.pillValueText : undefined,
            ]}
          >
            {dueBy || 'Select due date'}
          </Text>
          <VectorIcon
            type="Feather"
            name="calendar"
            size={wp(4.8)}
            color={COLORS.textSecondary}
          />
        </TouchableOpacity>

        {showDueDateList && (
          <View style={styles.dropdownBox}>
            {DUE_DATE_SUGGESTIONS.map((dateOpt) => (
              <TouchableOpacity
                key={dateOpt}
                activeOpacity={0.7}
                onPress={() => {
                  setDueBy(dateOpt);
                  setShowDueDateList(false);
                }}
                style={styles.dropdownRow}
              >
                <Text style={styles.dropdownText}>{dateOpt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Note to assignee */}
        <FloatingLabelInput
          label="Note to assignee"
          value={note}
          onChangeText={setNote}
          placeholder="What needs to be done"
          multiline
          containerStyle={styles.noteSpacing}
        />

        {/* Notify the resident */}
        <NotifyResidentCard
          enabled={notifyResident}
          onToggle={() => setNotifyResident((prev) => !prev)}
          containerStyle={styles.notifySpacing}
        />

        {/* Assign CTA */}
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Assign"
          activeOpacity={0.8}
          onPress={handleAssign}
          style={styles.primaryBtn}
        >
          <Text style={styles.primaryBtnText}>Assign</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AssignComplaintScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingHorizontal: wp(5),
    paddingTop: Platform.OS === 'ios' ? hp(6) : hp(2),
    paddingBottom: hp(5),
  },
  summarySpacing: {
    marginTop: hp(1.2),
    marginBottom: hp(1.2),
  },
  fieldLabel: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
    marginTop: hp(2),
    marginBottom: hp(1),
  },
  pillInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: hp(6),
    borderRadius: wp(8),
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingHorizontal: wp(4.5),
    backgroundColor: COLORS.white,
  },
  pillTextInput: {
    flex: 1,
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
    marginLeft: wp(2.5),
    paddingVertical: 0,
  },
  pillPlaceholderText: {
    flex: 1,
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.placeholder,
  },
  pillValueText: {
    color: COLORS.darkText,
  },
  dropdownBox: {
    marginTop: hp(0.8),
    borderRadius: wp(3.5),
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
  },
  dropdownRow: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.3),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  dropdownText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
  },
  priorityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: wp(2),
  },
  priorityChip: {
    flex: 1,
    height: hp(4.8),
    borderRadius: wp(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  priorityChipActive: {
    backgroundColor: COLORS.approvalChipActiveBg,
    borderColor: COLORS.approvalChipActiveText,
  },
  priorityChipInactive: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.cardBorder,
  },
  priorityText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
  },
  priorityTextActive: {
    color: COLORS.approvalChipActiveText,
    fontFamily: FONTS.MEDIUM_OUTFIT,
  },
  priorityTextInactive: {
    color: COLORS.textSecondary,
  },
  noteSpacing: {
    marginTop: hp(2.4),
  },
  notifySpacing: {
    marginTop: hp(2.4),
  },
  primaryBtn: {
    width: '100%',
    height: hp(5.8),
    borderRadius: wp(3.5),
    backgroundColor: COLORS.darkBtn,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(3.5),
  },
  primaryBtnText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.white,
  },
});
