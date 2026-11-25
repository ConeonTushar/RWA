import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';
import VectorIcon from '../../components/elements/VectorIcon';
import { SOS_MONITOR_SCREEN, APPROVAL_TAB } from '../../navigations/url';
import { SCREENPARAMS } from '../../navigations/types';

export type NotificationType = 'emergency' | 'request' | 'general';

export interface NotificationItem {
  id: string;
  section: 'TODAY' | 'YESTERDAY';
  title: string;
  category: string;
  description: string;
  timestamp: string;
  isUnread: boolean;
  type: NotificationType;
  badge?: string;
  targetScreen?: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    section: 'TODAY',
    title: 'SOS from Flat B-204',
    category: 'Emergency alert',
    description:
      'An emergency alert has been raised. Please review and respond.',
    timestamp: '10:42 AM',
    isUnread: true,
    type: 'emergency',
    badge: 'Urgent',
    targetScreen: SOS_MONITOR_SCREEN,
  },
  {
    id: 'notif-2',
    section: 'TODAY',
    title: 'New resident request',
    category: 'Request',
    description:
      'A resident request from Flat A-302 is waiting for your review.',
    timestamp: '10:15 AM',
    isUnread: true,
    type: 'request',
    targetScreen: APPROVAL_TAB,
  },
  {
    id: 'notif-3',
    section: 'YESTERDAY',
    title: 'New resident request',
    category: 'Request',
    description:
      'A resident request from Flat A-302 is waiting for your review.',
    timestamp: '10:15 AM',
    isUnread: true,
    type: 'request',
    targetScreen: APPROVAL_TAB,
  },
  {
    id: 'notif-4',
    section: 'YESTERDAY',
    title: 'New resident request',
    category: 'Request',
    description:
      'A resident request from Flat A-302 is waiting for your review.',
    timestamp: '10:15 AM',
    isUnread: true,
    type: 'request',
    targetScreen: APPROVAL_TAB,
  },
  {
    id: 'notif-5',
    section: 'YESTERDAY',
    title: 'Maintenance payment verified',
    category: 'Payment',
    description:
      'Payment of ₹4,500 from Flat C-101 has been verified successfully.',
    timestamp: '09:30 AM',
    isUnread: true,
    type: 'general',
  },
  {
    id: 'notif-6',
    section: 'YESTERDAY',
    title: 'Vendor entry logged',
    category: 'Security',
    description: 'Pest control service provider checked in at Gate 1.',
    timestamp: '08:45 AM',
    isUnread: false,
    type: 'general',
  },
  {
    id: 'notif-7',
    section: 'YESTERDAY',
    title: 'Monthly meeting scheduled',
    category: 'Notice',
    description: 'RWA General Body Meeting scheduled for this Sunday at 6 PM.',
    timestamp: '08:00 AM',
    isUnread: false,
    type: 'general',
  },
  {
    id: 'notif-8',
    section: 'YESTERDAY',
    title: 'Lift maintenance completed',
    category: 'Facility',
    description: 'Tower B Lift 1 routine servicing has been completed.',
    timestamp: '07:30 AM',
    isUnread: false,
    type: 'general',
  },
];

type FilterType = 'all' | 'unread' | 'emergency';

const NotificationsScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<SCREENPARAMS>>();
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    INITIAL_NOTIFICATIONS,
  );
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const unreadCount = useMemo(
    () => notifications.filter(n => n.isUnread).length,
    [notifications],
  );

  const emergencyCount = useMemo(
    () => notifications.filter(n => n.type === 'emergency').length,
    [notifications],
  );

  const totalCount = notifications.length;

  const filteredNotifications = useMemo(() => {
    switch (activeFilter) {
      case 'unread':
        return notifications.filter(n => n.isUnread);
      case 'emergency':
        return notifications.filter(n => n.type === 'emergency');
      case 'all':
      default:
        return notifications;
    }
  }, [activeFilter, notifications]);

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(item => ({
        ...item,
        isUnread: false,
      })),
    );
  };

  const handleNotificationPress = (item: NotificationItem) => {
    // Mark clicked item as read
    setNotifications(prev =>
      prev.map(n => (n.id === item.id ? { ...n, isUnread: false } : n)),
    );

    if (item.targetScreen === SOS_MONITOR_SCREEN) {
      navigation.navigate(SOS_MONITOR_SCREEN, { alertId: item.id });
    } else if (item.targetScreen) {
      navigation.navigate(item.targetScreen as any);
    }
  };

  const todayItems = filteredNotifications.filter(n => n.section === 'TODAY');
  const yesterdayItems = filteredNotifications.filter(
    n => n.section === 'YESTERDAY',
  );

  const renderNotificationCard = (
    item: NotificationItem,
    isLastInSection: boolean,
  ) => {
    return (
      <View key={item.id}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleNotificationPress(item)}
          style={styles.cardContainer}
        >
          {/* Top header row: Left rounded icon box + Right title/badge */}
          <View style={styles.cardTopRow}>
            {/* Rounded square avatar / icon box */}
            <View style={styles.iconBox}>
              {item.type === 'emergency' ? (
                <VectorIcon
                  type="MaterialIcons"
                  name="warning-amber"
                  size={wp(5)}
                  color={COLORS.sosRed}
                />
              ) : null}
            </View>

            <View style={styles.cardHeaderInfo}>
              <View style={styles.cardTitleRow}>
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                {item.badge && (
                  <View style={styles.urgentBadge}>
                    <Text style={styles.urgentBadgeText}>{item.badge}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.cardCategory}>{item.category}</Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.cardDescription}>{item.description}</Text>

          {/* Timestamp and unread status */}
          <Text style={styles.cardFooter}>
            {item.timestamp}
            {item.isUnread ? ' · Unread' : ''}
          </Text>
        </TouchableOpacity>

        {/* Dashed separator between notifications */}
        {!isLastInSection && <View style={styles.dashedDivider} />}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        {...(Platform.OS === 'android'
          ? { backgroundColor: COLORS.white }
          : {})}
      />

      {/* Header bar: '< Notifications' on left, 'Mark all as read' on right */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          style={styles.headerLeft}
        >
          <VectorIcon
            type="Feather"
            name="chevron-left"
            size={wp(5.5)}
            color={COLORS.darkText}
          />
          <Text style={styles.headerTitle}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleMarkAllAsRead}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.markAllText}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Chips Bar */}
      <View style={styles.filterBar}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveFilter('all')}
          style={[
            styles.filterChip,
            activeFilter === 'all'
              ? styles.filterChipActive
              : styles.filterChipInactive,
          ]}
        >
          <Text
            style={[
              styles.filterChipText,
              activeFilter === 'all'
                ? styles.filterChipTextActive
                : styles.filterChipTextInactive,
            ]}
          >
            All {totalCount}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveFilter('unread')}
          style={[
            styles.filterChip,
            activeFilter === 'unread'
              ? styles.filterChipActive
              : styles.filterChipInactive,
          ]}
        >
          <Text
            style={[
              styles.filterChipText,
              activeFilter === 'unread'
                ? styles.filterChipTextActive
                : styles.filterChipTextInactive,
            ]}
          >
            Unread {unreadCount}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveFilter('emergency')}
          style={[
            styles.filterChip,
            activeFilter === 'emergency'
              ? styles.filterChipActive
              : styles.filterChipInactive,
          ]}
        >
          <Text
            style={[
              styles.filterChipText,
              activeFilter === 'emergency'
                ? styles.filterChipTextActive
                : styles.filterChipTextInactive,
            ]}
          >
            Emergency {emergencyCount}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notification Lists by Section */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {todayItems.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>TODAY</Text>
            {todayItems.map((item, index) =>
              renderNotificationCard(item, index === todayItems.length - 1),
            )}
          </View>
        )}

        {yesterdayItems.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>YESTERDAY</Text>
            {yesterdayItems.map((item, index) =>
              renderNotificationCard(item, index === yesterdayItems.length - 1),
            )}
          </View>
        )}

        {filteredNotifications.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No notifications in this filter
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    paddingTop: hp(1),
    paddingBottom: hp(1.5),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
    marginLeft: wp(1.5),
  },
  markAllText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    textDecorationLine: 'underline',
  },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
    gap: wp(2.5),
  },
  filterChip: {
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(0.55),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterChipActive: {
    backgroundColor: COLORS.badgeGreenBg,
    borderWidth: 1,
    borderColor: '#C6E7D2',
  },
  filterChipInactive: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
  },
  filterChipText: {
    fontSize: FONTSIZE.xsmall,
  },
  filterChipTextActive: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    color: COLORS.greenPrimary,
  },
  filterChipTextInactive: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    color: COLORS.textSecondary,
  },
  scrollContent: {
    paddingHorizontal: wp(5),
    paddingBottom: hp(4),
  },
  sectionContainer: {
    marginTop: hp(2),
  },
  sectionHeader: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
    color: COLORS.darkText,
    letterSpacing: 0.8,
    marginTop: hp(1),
    marginBottom: hp(1.8),
  },
  cardContainer: {
    paddingVertical: hp(0.5),
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.8),
  },
  iconBox: {
    width: wp(10.5),
    height: wp(10.5),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    backgroundColor: COLORS.white,
  },
  cardHeaderInfo: {
    flex: 1,
    marginLeft: wp(3),
    justifyContent: 'center',
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
    flex: 1,
    marginRight: wp(2),
  },
  urgentBadge: {
    backgroundColor: COLORS.badgeUrgentBg,
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.2),
    borderRadius: 10,
  },
  urgentBadgeText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.vtiny,
    color: COLORS.badgeUrgentText,
  },
  cardCategory: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.2),
  },
  cardDescription: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    lineHeight: 15,
    marginBottom: hp(0.6),
  },
  cardFooter: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.darkText,
  },
  dashedDivider: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.inputBorder,
    marginVertical: hp(1.8),
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(8),
  },
  emptyText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.textSecondary,
  },
});
