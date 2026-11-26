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
import { DetailKeyValueRow } from '../../components/approvals';
import {
  ComplaintCommentItem,
  ComplaintCommentsSection,
  ComplaintDetailActionButtons,
  ComplaintDetailHeader,
  ComplaintItemData,
  ComplaintSlaSection,
  ComplaintTimelineCard,
} from '../../components/complaints';
import { SCREENPARAMS } from '../../navigations/types';
import {
  ASSIGN_COMPLAINT_SCREEN,
  COMPLAINT_DETAIL_SCREEN,
  UPDATE_COMPLAINT_SCREEN,
} from '../../navigations/url';

type RouteProps = RouteProp<SCREENPARAMS, typeof COMPLAINT_DETAIL_SCREEN>;

const FALLBACK_COMPLAINT: ComplaintItemData = {
  id: 'cmp-1',
  ticketId: '#CMP-1024',
  title: 'Lift not working',
  category: 'Lift',
  location: 'Tower B',
  flat: 'B-302',
  assignedTo: 'Facility Manager',
  statusLabel: 'In progress',
  statusVariant: 'in_progress',
  overdueLabel: 'Overdue 1 d',
  reportedText: 'Reported 2 days ago',
  filterCategory: 'inside',
  description:
    'The lift in Tower B has stopped working. Residents are unable to use it, and the issue has not yet been resolved.',
  reportedBy: 'Rahul Sharma',
  visibility: 'Public',
  upvotes: 12,
  mediaCount: 2,
  slaMetrics: [
    {
      label: 'Response time',
      statusLabel: 'Responded',
      statusVariant: 'success',
      progress: 1,
      caption: 'Response received',
    },
    {
      label: 'Resolution time',
      statusLabel: 'Overdue',
      statusVariant: 'overdue',
      progress: 1,
      caption: 'Resolution deadline crossed',
    },
  ],
  timeline: [
    {
      step: 1,
      title: 'Created',
      timestamp: '18 Nov · 09:00 AM',
      actor: 'Rahul Sharma',
    },
    {
      step: 2,
      title: 'Assigned',
      timestamp: '18 Nov · 10:00 AM',
      actor: 'President',
    },
    {
      step: 3,
      title: 'In progress',
      timestamp: '18 Nov · 11:30 AM',
      actor: 'Facility Manager',
    },
  ],
  comments: [
    {
      id: 'c-1',
      type: 'internal',
      author: 'Facility Manager',
      timestamp: '18 Nov · 11:30 AM',
      message:
        'Technician has inspected the lift. Replacement part is required.',
    },
  ],
};

const ComplaintDetailScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProps>();
  const complaint = route.params?.item ?? FALLBACK_COMPLAINT;

  const [comments, setComments] = useState<ComplaintCommentItem[]>(
    complaint.comments
  );

  const handleAddComment = (type: 'internal' | 'resident', message: string) => {
    const newComment: ComplaintCommentItem = {
      id: `c-${Date.now()}`,
      type,
      author: 'You (President)',
      timestamp: 'Just now',
      message,
    };
    setComments((prev) => [...prev, newComment]);
  };

  const handleMediaPress = (index: number) => {
    Alert.alert(
      'Attachment Preview',
      `Viewing attachment ${index + 1} for ${complaint.ticketId}`
    );
  };

  const handleAssign = () => {
    navigation.navigate(ASSIGN_COMPLAINT_SCREEN, { item: complaint });
  };

  const handleUpdateStatus = () => {
    navigation.navigate(UPDATE_COMPLAINT_SCREEN, { item: complaint });
  };

  const handleEscalate = () => {
    Alert.alert(
      'Escalate Complaint',
      `Escalate ${complaint.ticketId} to Managing Committee?`
    );
  };

  const handleMergeDuplicate = () => {
    Alert.alert(
      'Merge Duplicate',
      `Select a duplicate complaint to merge with ${complaint.ticketId}.`
    );
  };

  const handleCloseComplaint = () => {
    Alert.alert(
      'Close Complaint',
      `Are you sure you want to close ${complaint.ticketId}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Close',
          style: 'destructive',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const mediaSlots = Array.from(
    { length: Math.max(complaint.mediaCount, 0) },
    (_, i) => i
  );

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
      >
        {/* Top Back Header */}
        <ComplaintDetailHeader
          title="Complaint details"
          onBackPress={() => navigation.goBack()}
        />

        {/* Ticket Summary */}
        <View style={styles.summarySection}>
          <View style={styles.ticketRow}>
            <Text style={styles.ticketIdText}>{complaint.ticketId}</Text>
            {complaint.overdueLabel ? (
              <Text style={styles.overdueText}>{complaint.overdueLabel}</Text>
            ) : null}
          </View>
          <Text style={styles.titleText}>{complaint.title}</Text>
          <Text style={styles.subtitleText}>
            {complaint.category} · {complaint.location} · Flat {complaint.flat}
          </Text>
        </View>

        {/* Complaint Details & Media */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionLabel}>Complaint Details</Text>
          <Text style={styles.descriptionText}>{complaint.description}</Text>

          {mediaSlots.length > 0 && (
            <View style={styles.mediaRow}>
              {mediaSlots.map((slot) => (
                <TouchableOpacity
                  key={slot}
                  activeOpacity={0.75}
                  onPress={() => handleMediaPress(slot)}
                  style={styles.mediaThumb}
                />
              ))}
            </View>
          )}
        </View>

        <View style={styles.dashedDivider} />

        {/* Metadata Key-Value Rows */}
        <View style={styles.metaSection}>
          <DetailKeyValueRow label="Category" value={complaint.category} />
          <DetailKeyValueRow label="Location" value={complaint.location} />
          <DetailKeyValueRow
            label="Reported by"
            value={complaint.reportedBy}
          />
          <DetailKeyValueRow label="Flat" value={complaint.flat} />
          <DetailKeyValueRow label="Visibility" value={complaint.visibility} />
          <DetailKeyValueRow
            label="Upvotes"
            value={String(complaint.upvotes)}
          />
        </View>

        {/* SLA Progress */}
        <ComplaintSlaSection
          metrics={complaint.slaMetrics}
          containerStyle={styles.sectionSpacing}
        />

        {/* Complaint Timeline */}
        <ComplaintTimelineCard
          steps={complaint.timeline}
          containerStyle={styles.sectionSpacing}
        />

        {/* Comments */}
        <ComplaintCommentsSection
          comments={comments}
          onAddComment={handleAddComment}
          containerStyle={styles.sectionSpacing}
        />

        {/* Bottom Action Buttons */}
        <ComplaintDetailActionButtons
          onAssign={handleAssign}
          onUpdateStatus={handleUpdateStatus}
          onEscalate={handleEscalate}
          onMergeDuplicate={handleMergeDuplicate}
          onCloseComplaint={handleCloseComplaint}
        />
      </ScrollView>
    </View>
  );
};

export default ComplaintDetailScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingHorizontal: wp(5),
    paddingTop: Platform.OS === 'ios' ? hp(1) : hp(2),
    paddingBottom: hp(4),
  },
  summarySection: {
    marginTop: hp(1.2),
  },
  ticketRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(0.8),
  },
  ticketIdText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.darkText,
  },
  overdueText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.badgeUrgentText,
  },
  titleText: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.l2,
    color: COLORS.darkText,
  },
  subtitleText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.3),
  },
  detailsSection: {
    marginTop: hp(2.4),
  },
  sectionLabel: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
    marginBottom: hp(0.8),
  },
  descriptionText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.darkText,
    lineHeight: FONTSIZE.minTiny * 1.45,
  },
  mediaRow: {
    flexDirection: 'row',
    gap: wp(3),
    marginTop: hp(1.6),
  },
  mediaThumb: {
    width: wp(17),
    height: wp(17),
    borderRadius: wp(3),
    backgroundColor: COLORS.avatarBg,
  },
  dashedDivider: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.dashedBorder,
    marginVertical: hp(2),
  },
  metaSection: {
    width: '100%',
  },
  sectionSpacing: {
    marginTop: hp(2.4),
  },
});
