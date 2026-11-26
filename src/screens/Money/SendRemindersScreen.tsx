import React, { useMemo, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  AudienceOption,
  ConfirmRemindersModal,
  MoneyDetailHeader,
  ReminderAudienceSelector,
  ReminderChannelOption,
  ReminderChannelsCard,
  ReminderMessagePreview,
  ReminderScheduleOption,
  ReminderScheduleSelector,
  ReminderTemplateCard,
  ReminderTemplateOption,
} from '../../components/money';
import { SubmitButton } from '../../components/elements';
import { SCREENPARAMS } from '../../navigations/types';
import { SEND_REMINDERS_SCREEN } from '../../navigations/url';
import { COLORS } from '../../utils/font';
import { hp, wp } from '../../utils/helper';

const TEMPLATES: ReminderTemplateOption[] = [
  {
    id: 'friendly',
    label: 'Friendly reminder',
    previewBody:
      'Dear Resident,\n\nThis is a friendly reminder that your society maintenance dues are pending. Kindly clear the outstanding amount at your earliest convenience.\n\nThank you, Society Management',
  },
  {
    id: 'overdue',
    label: 'Overdue reminder',
    previewBody:
      'Dear Resident,\n\nYour society maintenance dues are now overdue. Please clear the pending balance promptly to avoid late fee charges.\n\nThank you, Society Management',
  },
  {
    id: 'final',
    label: 'Final notice',
    previewBody:
      'Dear Resident,\n\nThis is a final notice regarding your pending society maintenance dues. Kindly settle the outstanding amount immediately.\n\nThank you, Society Management',
  },
];

const INITIAL_CHANNELS: ReminderChannelOption[] = [
  { id: 'push', label: 'Notify the resident', enabled: true },
  { id: 'sms', label: 'SMS', enabled: false },
  { id: 'whatsapp', label: 'WhatsApp', enabled: false },
];

const CHANNEL_DISPLAY_NAMES: Record<ReminderChannelOption['id'], string> = {
  push: 'Push',
  sms: 'SMS',
  whatsapp: 'WhatsApp',
};

const SendRemindersScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<SCREENPARAMS>>();
  const route =
    useRoute<RouteProp<SCREENPARAMS, typeof SEND_REMINDERS_SCREEN>>();

  const selectedCount = route.params?.selectedCount ?? 2;
  const overdueCount = route.params?.overdueCount ?? 18;

  const [audience, setAudience] =
    useState<AudienceOption['id']>('selected_flats');
  const [templateId, setTemplateId] = useState<string>('friendly');
  const [channels, setChannels] =
    useState<ReminderChannelOption[]>(INITIAL_CHANNELS);
  const [schedule, setSchedule] = useState<ReminderScheduleOption>('now');
  const [confirmVisible, setConfirmVisible] = useState(false);

  const audienceOptions: AudienceOption[] = useMemo(
    () => [
      {
        id: 'selected_flats',
        title: 'Selected flats',
        subtitle: `${selectedCount} flats selected from Dues by Flat`,
      },
      {
        id: 'all_overdue',
        title: 'All overdue flats',
        subtitle: 'Send to every flat with overdue dues',
        linkText: `${overdueCount} overdue flats`,
      },
    ],
    [selectedCount, overdueCount],
  );

  const activeTemplate = useMemo(
    () => TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[0],
    [templateId],
  );

  const enabledChannels = useMemo(
    () => channels.filter((c) => c.enabled),
    [channels],
  );

  const handleToggleChannel = (id: ReminderChannelOption['id']) => {
    setChannels((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item,
      ),
    );
  };

  const handleOpenConfirm = () => {
    if (enabledChannels.length === 0) {
      Alert.alert('Select a channel', 'Enable at least one delivery channel.');
      return;
    }
    setConfirmVisible(true);
  };

  const handleConfirmSend = () => {
    setConfirmVisible(false);
    const targetCount =
      audience === 'selected_flats' ? selectedCount : overdueCount;
    Alert.alert(
      'Reminders sent',
      `Payment reminders scheduled for ${targetCount} flats.`,
      [{ text: 'OK', onPress: () => navigation.goBack() }],
    );
  };

  const targetCount =
    audience === 'selected_flats' ? selectedCount : overdueCount;
  const recipientsLabel =
    audience === 'selected_flats' ? 'Selected flats' : 'All overdue flats';
  const channelsLabel =
    enabledChannels.map((c) => CHANNEL_DISPLAY_NAMES[c.id]).join(', ') || 'None';
  const scheduleLabel = schedule === 'now' ? 'Now' : 'Schedule';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerWrapper}>
        <MoneyDetailHeader
          title="Send reminders"
          onBackPress={() => navigation.goBack()}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ReminderAudienceSelector
          options={audienceOptions}
          selectedId={audience}
          onSelect={setAudience}
        />

        <ReminderTemplateCard
          templates={TEMPLATES}
          selectedId={templateId}
          onSelect={setTemplateId}
          containerStyle={styles.sectionSpacing}
        />

        <ReminderMessagePreview
          message={activeTemplate.previewBody}
          containerStyle={styles.sectionSpacing}
        />

        <ReminderChannelsCard
          channels={channels}
          onToggleChannel={handleToggleChannel}
          containerStyle={styles.sectionSpacing}
        />

        <ReminderScheduleSelector
          selected={schedule}
          onSelect={setSchedule}
          containerStyle={styles.sectionSpacing}
        />

        <SubmitButton
          title="Send reminders"
          onPress={handleOpenConfirm}
          containerStyle={styles.submitSpacing}
        />
      </ScrollView>

      <ConfirmRemindersModal
        visible={confirmVisible}
        flatCountText={`${targetCount} flats`}
        recipientsLabel={recipientsLabel}
        channelsLabel={channelsLabel}
        scheduleLabel={scheduleLabel}
        onConfirm={handleConfirmSend}
        onCancel={() => setConfirmVisible(false)}
      />
    </SafeAreaView>
  );
};

export default SendRemindersScreen;

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
  sectionSpacing: {
    marginTop: hp(2.4),
  },
  submitSpacing: {
    marginTop: hp(2),
  },
});
