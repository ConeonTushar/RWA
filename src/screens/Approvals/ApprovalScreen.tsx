import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  Platform,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';
import {
  ApprovalHeader,
  ApprovalStatsSummary,
  ApprovalFilterTabs,
  ApprovalSectionHeader,
  ApprovalRequestCard,
  ApprovalItemData,
  FilterTabItem,
} from '../../components/approvals';
import VectorIcon from '../../components/elements/VectorIcon';
import {
  NOTIFICATIONS_SCREEN,
  RESIDENT_REQUEST_DETAIL_SCREEN,
  VENDOR_REQUEST_DETAIL_SCREEN,
  PERMISSION_REQUEST_DETAIL_SCREEN,
  BOOKING_APPROVAL_DETAIL_SCREEN,
} from '../../navigations/url';

// Mock approvals dataset matching the design
const MOCK_APPROVALS: ApprovalItemData[] = [
  // Resident Requests
  {
    id: 'res-1',
    category: 'residents',
    title: 'Rahul Sharma',
    subtitle: 'Flat B-204 · Family member',
    badgeLabel: 'Waiting 2 days',
    badgeVariant: 'urgent',
    detailText: 'Requested role: Family member',
    showDetailBullet: true,
    submittedText: 'Submitted 17 Nov · 10:30 AM',
  },
  {
    id: 'res-2',
    category: 'residents',
    title: 'Rahul Sharma',
    subtitle: 'Flat B-204 · Family member',
    badgeLabel: 'Waiting 2 days',
    badgeVariant: 'urgent',
    detailText: 'Requested role: Family member',
    showDetailBullet: true,
    submittedText: 'Submitted 17 Nov · 10:30 AM',
  },
  {
    id: 'res-3',
    category: 'residents',
    title: 'Pooja Verma',
    subtitle: 'Flat A-102 · Tenant',
    badgeLabel: 'Waiting 2 days',
    badgeVariant: 'urgent',
    detailText: 'Requested role: Tenant',
    showDetailBullet: true,
    submittedText: 'Submitted 19 Nov · 08:30 AM',
  },

  // Permissions
  {
    id: 'perm-1',
    category: 'permissions',
    title: 'Renovation request',
    subtitle: 'Flat C-401 · 22-25 Nov',
    badgeLabel: 'Awaiting approval',
    badgeVariant: 'warning',
    detailText: 'Secretary and committee approvals completed',
    showDetailBullet: false,
    submittedText: 'Submitted 18 Nov · 04:15 PM',
  },
  {
    id: 'perm-2',
    category: 'permissions',
    title: 'Clubhouse booking',
    subtitle: 'Flat D-105 · 28 Nov, 6 PM - 10 PM',
    badgeLabel: 'Awaiting approval',
    badgeVariant: 'warning',
    detailText: 'Payment received · Awaiting final approval',
    showDetailBullet: false,
    submittedText: 'Submitted 19 Nov · 11:00 AM',
  },
  {
    id: 'perm-3',
    category: 'permissions',
    title: 'EV Charger Installation',
    subtitle: 'Parking Slot P-12 · Tower B',
    badgeLabel: 'Awaiting approval',
    badgeVariant: 'warning',
    detailText: 'Electrical safety clearance submitted',
    showDetailBullet: false,
    submittedText: 'Submitted 19 Nov · 02:40 PM',
  },

  // Vendors
  {
    id: 'ven-1',
    category: 'vendors',
    title: 'CleanPro Services',
    subtitle: 'Housekeeping and cleaning · Registered vendor',
    badgeLabel: 'Waiting 1 day',
    badgeVariant: 'urgent',
    detailText: 'Housekeeping pass requested',
    showDetailBullet: true,
    submittedText: 'Submitted 18 Nov · 02:00 PM',
  },
  {
    id: 'ven-2',
    category: 'vendors',
    title: 'Apex Elevator AMC',
    subtitle: 'Tower A & B Lift inspection pass',
    badgeLabel: 'Awaiting approval',
    badgeVariant: 'warning',
    detailText: 'Scheduled maintenance visit for 26 Nov',
    showDetailBullet: false,
    submittedText: 'Submitted 19 Nov · 09:15 AM',
  },
];

const ApprovalScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);

  // Dynamic filter tab items with live counts
  const filterTabs: FilterTabItem[] = useMemo(() => {
    const residentCount = MOCK_APPROVALS.filter(
      (item) => item.category === 'residents'
    ).length;
    const vendorCount = MOCK_APPROVALS.filter(
      (item) => item.category === 'vendors'
    ).length;
    const permissionCount = MOCK_APPROVALS.filter(
      (item) => item.category === 'permissions'
    ).length;
    const totalCount = MOCK_APPROVALS.length;

    return [
      { id: 'all', label: 'All', count: totalCount },
      { id: 'residents', label: 'Residents', count: residentCount },
      { id: 'vendors', label: 'Vendors', count: vendorCount },
      { id: 'permissions', label: 'Permissions', count: permissionCount },
    ];
  }, []);

  // Filter items according to active tab and search query
  const filteredItems = useMemo(() => {
    let items = MOCK_APPROVALS;

    if (activeTab !== 'all') {
      items = items.filter((item) => item.category === activeTab);
    }

    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          (item.detailText && item.detailText.toLowerCase().includes(q))
      );
    }

    return items;
  }, [activeTab, searchQuery]);

  // Separate filtered items into sections
  const residentRequests = useMemo(
    () => filteredItems.filter((item) => item.category === 'residents'),
    [filteredItems]
  );

  const permissionRequests = useMemo(
    () => filteredItems.filter((item) => item.category === 'permissions'),
    [filteredItems]
  );

  const vendorRequests = useMemo(
    () => filteredItems.filter((item) => item.category === 'vendors'),
    [filteredItems]
  );

  const handleNotificationPress = () => {
    navigation.navigate(NOTIFICATIONS_SCREEN);
  };

  const handleToggleSearch = () => {
    setIsSearchVisible((prev) => {
      if (prev) {
        setSearchQuery('');
      }
      return !prev;
    });
  };

  const handleItemPress = (item: ApprovalItemData) => {
    if (item.category === 'vendors') {
      navigation.navigate(VENDOR_REQUEST_DETAIL_SCREEN, { item });
    } else if (item.category === 'permissions') {
      const lower = item.title.toLowerCase();
      if (lower.includes('clubhouse') || lower.includes('booking')) {
        navigation.navigate(BOOKING_APPROVAL_DETAIL_SCREEN, { item });
      } else {
        navigation.navigate(PERMISSION_REQUEST_DETAIL_SCREEN, { item });
      }
    } else {
      navigation.navigate(RESIDENT_REQUEST_DETAIL_SCREEN, { item });
    }
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
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header */}
        <ApprovalHeader
          title="Approvals"
          subtitle="Review and take action on society requests."
          onSearchPress={handleToggleSearch}
          onNotificationPress={handleNotificationPress}
          hasUnreadNotification={true}
        />

        {/* Collapsible Search Bar */}
        {isSearchVisible && (
          <View style={styles.searchBarContainer}>
            <VectorIcon
              type="Feather"
              name="search"
              size={wp(4.2)}
              color={COLORS.textSecondary}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name, flat or request..."
              placeholderTextColor={COLORS.placeholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
              clearButtonMode="while-editing"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchQuery('')}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <VectorIcon
                  type="Feather"
                  name="x"
                  size={wp(4)}
                  color={COLORS.textSecondary}
                />
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Top Stats Row: Pending approvals & Overdue */}
        <ApprovalStatsSummary
          pendingCount="08"
          overdueCount="02"
          onPendingPress={() => setActiveTab('all')}
          onOverduePress={() => setActiveTab('residents')}
          containerStyle={styles.statsSummary}
        />

        {/* Horizontal Filter Tabs (All, Residents, Vendors, Permissions) */}
        <ApprovalFilterTabs
          tabs={filterTabs}
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          containerStyle={styles.filterTabs}
        />

        {/* Section 1: RESIDENT REQUESTS */}
        {residentRequests.length > 0 && (
          <View style={styles.sectionContainer}>
            <ApprovalSectionHeader title="RESIDENT REQUESTS" />
            {residentRequests.map((item, index) => (
              <ApprovalRequestCard
                key={item.id}
                item={item}
                showDivider={
                  index < residentRequests.length - 1 ||
                  permissionRequests.length > 0 ||
                  vendorRequests.length > 0
                }
                onPress={() => handleItemPress(item)}
              />
            ))}
          </View>
        )}

        {/* Section 2: PERMISSION */}
        {permissionRequests.length > 0 && (
          <View style={styles.sectionContainer}>
            <ApprovalSectionHeader title="PERMISSION" />
            {permissionRequests.map((item, index) => (
              <ApprovalRequestCard
                key={item.id}
                item={item}
                showDivider={
                  index < permissionRequests.length - 1 ||
                  vendorRequests.length > 0
                }
                onPress={() => handleItemPress(item)}
              />
            ))}
          </View>
        )}

        {/* Section 3: VENDOR REQUESTS */}
        {vendorRequests.length > 0 && (
          <View style={styles.sectionContainer}>
            <ApprovalSectionHeader title="VENDOR REQUESTS" />
            {vendorRequests.map((item, index) => (
              <ApprovalRequestCard
                key={item.id}
                item={item}
                showDivider={index < vendorRequests.length - 1}
                onPress={() => handleItemPress(item)}
              />
            ))}
          </View>
        )}

        {/* Empty state when search or tab filter has no results */}
        {filteredItems.length === 0 && (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <VectorIcon
                type="MaterialCommunityIcons"
                name="clipboard-check-outline"
                size={wp(10)}
                color={COLORS.greenPrimary}
              />
            </View>
            <Text style={styles.emptyTitle}>No Requests Found</Text>
            <Text style={styles.emptySubtitle}>
              There are no pending requests matching your current filter.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ApprovalScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingHorizontal: wp(5),
    paddingTop: hp(1),
    paddingBottom: hp(14), // Room for bottom navigation bar
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGrey,
    borderRadius: wp(3),
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    paddingHorizontal: wp(3.5),
    paddingVertical: Platform.OS === 'ios' ? hp(1) : hp(0.5),
    marginTop: hp(1),
    marginBottom: hp(0.5),
  },
  searchIcon: {
    marginRight: wp(2),
  },
  searchInput: {
    flex: 1,
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.darkText,
    padding: 0,
  },
  statsSummary: {
    marginTop: hp(1.8),
  },
  filterTabs: {
    marginTop: hp(2.2),
    marginBottom: hp(1),
  },
  sectionContainer: {
    marginTop: hp(1.5),
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(8),
  },
  emptyIconCircle: {
    width: wp(16),
    height: wp(16),
    borderRadius: wp(8),
    backgroundColor: COLORS.badgeGreenBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(1.5),
  },
  emptyTitle: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
  },
  emptySubtitle: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: hp(0.5),
    paddingHorizontal: wp(8),
  },
});
