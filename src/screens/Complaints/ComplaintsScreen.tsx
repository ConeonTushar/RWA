import React, { useMemo, useState } from 'react';
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';
import {
  ComplaintCard,
  ComplaintFilterTabItem,
  ComplaintFilterTabs,
  ComplaintItemData,
  ComplaintStatsSummary,
  ComplaintsHeader,
} from '../../components/complaints';
import VectorIcon from '../../components/elements/VectorIcon';
import {
  COMPLAINT_DETAIL_SCREEN,
  COMPLAINT_SUMMARY_SCREEN,
  NOTIFICATIONS_SCREEN,
} from '../../navigations/url';

const DEFAULT_SLA_METRICS = [
  {
    label: 'Response time',
    statusLabel: 'Responded',
    statusVariant: 'success' as const,
    progress: 1,
    caption: 'Response received',
  },
  {
    label: 'Resolution time',
    statusLabel: 'Overdue',
    statusVariant: 'overdue' as const,
    progress: 1,
    caption: 'Resolution deadline crossed',
  },
];

const DEFAULT_TIMELINE = [
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
];

const DEFAULT_COMMENTS = [
  {
    id: 'c-1',
    type: 'internal' as const,
    author: 'Facility Manager',
    timestamp: '18 Nov · 11:30 AM',
    message:
      'Technician has inspected the lift. Replacement part is required.',
  },
];

const MOCK_COMPLAINTS: ComplaintItemData[] = [
  {
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
    slaMetrics: DEFAULT_SLA_METRICS,
    timeline: DEFAULT_TIMELINE,
    comments: DEFAULT_COMMENTS,
  },
  {
    id: 'cmp-2',
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
    slaMetrics: DEFAULT_SLA_METRICS,
    timeline: DEFAULT_TIMELINE,
    comments: DEFAULT_COMMENTS,
  },
  {
    id: 'cmp-3',
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
    slaMetrics: DEFAULT_SLA_METRICS,
    timeline: DEFAULT_TIMELINE,
    comments: DEFAULT_COMMENTS,
  },
  {
    id: 'cmp-4',
    ticketId: '#CMP-1025',
    title: 'Basement water seepage',
    category: 'Plumbing',
    location: 'Tower A',
    flat: 'A-104',
    assignedTo: 'Maintenance Team',
    statusLabel: 'In progress',
    statusVariant: 'in_progress',
    reportedText: 'Reported 1 day ago',
    filterCategory: 'expected',
    description:
      'Water seepage noticed near the basement pillar B2. Plumber inspection scheduled for today afternoon.',
    reportedBy: 'Sneha Patel',
    visibility: 'Public',
    upvotes: 7,
    mediaCount: 2,
    slaMetrics: DEFAULT_SLA_METRICS,
    timeline: DEFAULT_TIMELINE,
    comments: DEFAULT_COMMENTS,
  },
  {
    id: 'cmp-5',
    ticketId: '#CMP-1026',
    title: 'Intercom line disconnected',
    category: 'Electrical',
    location: 'Tower C',
    flat: 'C-501',
    assignedTo: 'Security Desk',
    statusLabel: 'Open',
    statusVariant: 'open',
    reportedText: 'Reported 5 hours ago',
    filterCategory: 'waiting',
    description:
      'Flat C-501 intercom is not connecting to the main gate security desk since morning.',
    reportedBy: 'Amit Verma',
    visibility: 'Private',
    upvotes: 1,
    mediaCount: 0,
    slaMetrics: DEFAULT_SLA_METRICS,
    timeline: DEFAULT_TIMELINE,
    comments: DEFAULT_COMMENTS,
  },
];

const FILTER_TABS: ComplaintFilterTabItem[] = [
  { id: 'inside', label: 'Inside' },
  { id: 'expected', label: 'Expected' },
  { id: 'waiting', label: 'Waiting' },
];

const ComplaintsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState<string>('inside');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);

  const filteredComplaints = useMemo(() => {
    return MOCK_COMPLAINTS.filter((item) => {
      const matchesTab = item.filterCategory === activeTab;
      if (!matchesTab) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.ticketId.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.flat.toLowerCase().includes(q) ||
        item.assignedTo.toLowerCase().includes(q)
      );
    });
  }, [activeTab, searchQuery]);

  const handleAnalyticsPress = () => {
    navigation.navigate(COMPLAINT_SUMMARY_SCREEN);
  };

  const handleNotificationPress = () => {
    navigation.navigate(NOTIFICATIONS_SCREEN);
  };

  const handleComplaintPress = (item: ComplaintItemData) => {
    navigation.navigate(COMPLAINT_DETAIL_SCREEN, { item });
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
      >
        {/* Top Header */}
        <ComplaintsHeader
          onAnalyticsPress={handleAnalyticsPress}
          onSearchPress={() => {
            setIsSearchVisible((prev) => !prev);
            if (isSearchVisible) setSearchQuery('');
          }}
          onNotificationPress={handleNotificationPress}
        />

        {/* Expandable Search Input */}
        {isSearchVisible && (
          <View style={styles.searchBarContainer}>
            <VectorIcon
              type="Feather"
              name="search"
              size={wp(4.4)}
              color={COLORS.textSecondary}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by ticket, issue, tower or flat..."
              placeholderTextColor={COLORS.placeholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setSearchQuery('')}
              >
                <VectorIcon
                  type="Feather"
                  name="x"
                  size={wp(4.4)}
                  color={COLORS.textSecondary}
                />
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Stats Summary Cards */}
        <ComplaintStatsSummary
          openCount={3}
          inProgressCount={2}
          overdueCount={1}
          containerStyle={styles.statsContainer}
        />

        {/* Filter Chips */}
        <ComplaintFilterTabs
          tabs={FILTER_TABS}
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          containerStyle={styles.filterTabsContainer}
        />

        {/* Section Header */}
        <Text style={styles.sectionHeader}>ALL COMPLAINTS</Text>

        {/* Complaint Cards List */}
        <View style={styles.listContainer}>
          {filteredComplaints.length > 0 ? (
            filteredComplaints.map((item) => (
              <ComplaintCard
                key={item.id}
                item={item}
                onPress={handleComplaintPress}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No complaints found</Text>
              <Text style={styles.emptySubtitle}>
                Try switching the filter tab or adjusting your search query.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ComplaintsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingHorizontal: wp(5),
    paddingTop: Platform.OS === 'ios' ? hp(1) : hp(2.5),
    paddingBottom: hp(13),
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGrey,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: wp(3),
    paddingHorizontal: wp(3.5),
    height: hp(5.2),
    marginTop: hp(1),
  },
  searchInput: {
    flex: 1,
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
    marginLeft: wp(2.5),
    paddingVertical: 0,
  },
  statsContainer: {
    marginTop: hp(1.8),
  },
  filterTabsContainer: {
    marginTop: hp(2.4),
  },
  sectionHeader: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.darkText,
    letterSpacing: 0.4,
    marginTop: hp(2),
    marginBottom: hp(1.4),
  },
  listContainer: {
    gap: hp(1.6),
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(6),
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: wp(4),
    backgroundColor: COLORS.lightGrey,
  },
  emptyTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
  },
  emptySubtitle: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.5),
    textAlign: 'center',
    paddingHorizontal: wp(8),
  },
});
