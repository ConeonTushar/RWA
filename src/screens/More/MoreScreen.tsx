import React, { useMemo, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';
import {
  MoreHeader,
  MoreMenuItem,
  MoreSearchBar,
  MoreSection,
  MoreSectionData,
} from '../../components/more';
import VectorIcon from '../../components/elements/VectorIcon';
import {
  NOTIFICATIONS_SCREEN,
  REPORTS_SUMMARY_SCREEN,
  SOS_MONITOR_SCREEN,
} from '../../navigations/url';

const MORE_SECTIONS: MoreSectionData[] = [
  {
    id: 'communication',
    title: 'COMMUNICATION',
    items: [
      {
        id: 'notices',
        label: 'Notices',
        iconName: 'bullhorn-outline',
        iconType: 'MaterialCommunityIcons',
      },
      {
        id: 'emergency-alerts',
        label: 'Emergency Alerts',
        iconName: 'alert-circle-outline',
        iconType: 'MaterialCommunityIcons',
      },
      {
        id: 'polls',
        label: 'Polls',
        iconName: 'poll',
        iconType: 'MaterialCommunityIcons',
      },
      {
        id: 'events',
        label: 'Events',
        iconName: 'calendar-star',
        iconType: 'MaterialCommunityIcons',
      },
      {
        id: 'announcements',
        label: 'Announcements',
        iconName: 'message-text-outline',
        iconType: 'MaterialCommunityIcons',
      },
    ],
  },
  {
    id: 'gate-security',
    title: 'GATE & SECURITY',
    items: [
      {
        id: 'visitors',
        label: 'Visitors',
        iconName: 'account-check-outline',
        iconType: 'MaterialCommunityIcons',
      },
      {
        id: 'gate-passes',
        label: 'Gate Passes',
        iconName: 'badge-account-outline',
        iconType: 'MaterialCommunityIcons',
      },
      {
        id: 'delivery-logs',
        label: 'Delivery Logs',
        iconName: 'package-variant-closed',
        iconType: 'MaterialCommunityIcons',
      },
      {
        id: 'staff-entry',
        label: 'Staff Entry',
        iconName: 'card-account-details-outline',
        iconType: 'MaterialCommunityIcons',
      },
      {
        id: 'sos-monitor',
        label: 'SOS Monitor',
        iconName: 'shield-alert-outline',
        iconType: 'MaterialCommunityIcons',
        route: SOS_MONITOR_SCREEN,
        iconColor: COLORS.sosRed,
      },
      {
        id: 'vehicle-entry',
        label: 'Vehicle Entry',
        iconName: 'car-outline',
        iconType: 'MaterialCommunityIcons',
      },
      {
        id: 'guards',
        label: 'Guards',
        iconName: 'shield-account-outline',
        iconType: 'MaterialCommunityIcons',
      },
      {
        id: 'cctv-logs',
        label: 'CCTV & Logs',
        iconName: 'cctv',
        iconType: 'MaterialCommunityIcons',
      },
    ],
  },
  {
    id: 'society-assets',
    title: 'SOCIETY & ASSETS',
    items: [
      {
        id: 'resident-directory',
        label: 'Resident Directory',
        iconName: 'account-group-outline',
        iconType: 'MaterialCommunityIcons',
      },
      {
        id: 'flats-towers',
        label: 'Flats & Towers',
        iconName: 'office-building-outline',
        iconType: 'MaterialCommunityIcons',
      },
      {
        id: 'amenities',
        label: 'Amenities',
        iconName: 'swim',
        iconType: 'MaterialCommunityIcons',
      },
      {
        id: 'parking',
        label: 'Parking',
        iconName: 'parking',
        iconType: 'MaterialCommunityIcons',
      },
      {
        id: 'vendors',
        label: 'Vendors',
        iconName: 'storefront-outline',
        iconType: 'MaterialCommunityIcons',
      },
      {
        id: 'documents',
        label: 'Documents',
        iconName: 'file-document-outline',
        iconType: 'MaterialCommunityIcons',
      },
      {
        id: 'committee',
        label: 'Committee',
        iconName: 'account-tie-outline',
        iconType: 'MaterialCommunityIcons',
      },
      {
        id: 'asset-register',
        label: 'Asset Register',
        iconName: 'clipboard-list-outline',
        iconType: 'MaterialCommunityIcons',
      },
      {
        id: 'reports',
        label: 'Reports',
        iconName: 'chart-box-outline',
        iconType: 'MaterialCommunityIcons',
        route: REPORTS_SUMMARY_SCREEN,
      },
    ],
  },
  {
    id: 'system-support',
    title: 'SYSTEM & SUPPORT',
    items: [
      {
        id: 'society-settings',
        label: 'Society Settings',
        iconName: 'cog-outline',
        iconType: 'MaterialCommunityIcons',
      },
      {
        id: 'help-support',
        label: 'Help & Support',
        iconName: 'help-circle-outline',
        iconType: 'MaterialCommunityIcons',
      },
      {
        id: 'app-preferences',
        label: 'Preferences',
        iconName: 'tune-variant',
        iconType: 'MaterialCommunityIcons',
      },
    ],
  },
];

const MoreScreen = () => {
  const navigation = useNavigation<any>();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSections = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return MORE_SECTIONS;
    }
    return MORE_SECTIONS.map(section => ({
      ...section,
      items: section.items.filter(item =>
        item.label.toLowerCase().includes(query),
      ),
    })).filter(section => section.items.length > 0);
  }, [searchQuery]);

  const handleToggleSearch = () => {
    setIsSearchOpen(prev => {
      if (prev) {
        setSearchQuery('');
      }
      return !prev;
    });
  };

  const handleItemPress = (item: MoreMenuItem) => {
    if (item.route) {
      navigation.navigate(item.route);
      return;
    }
    Alert.alert(item.label, `${item.label} module will be available soon.`);
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <MoreHeader
          title="More"
          subtitle="All society tools & settings."
          hasUnreadNotification
          isSearchActive={isSearchOpen}
          onSearchPress={handleToggleSearch}
          onNotificationPress={() => navigation.navigate(NOTIFICATIONS_SCREEN)}
        />

        {isSearchOpen && (
          <MoreSearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        )}

        {filteredSections.length > 0 ? (
          filteredSections.map(section => (
            <MoreSection
              key={section.id}
              section={section}
              onItemPress={handleItemPress}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <VectorIcon
              type="Feather"
              name="search"
              size={wp(8)}
              color={COLORS.mutedText}
            />
            <Text style={styles.emptyTitle}>No matching tools found</Text>
            <Text style={styles.emptySubtitle}>
              Try searching with a different keyword.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: wp(5),
    paddingTop: hp(1.2),
    paddingBottom: hp(4),
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(8),
  },
  emptyTitle: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
    marginTop: hp(1.5),
  },
  emptySubtitle: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.textSecondary,
    marginTop: hp(0.5),
  },
});
