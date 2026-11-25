import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../utils/font';
import { hp, wp } from '../../utils/helper';
import {
  HomeHeader,
  SosAlertCard,
  StatsGrid,
  ExpensesBannerCard,
  QuickActions,
  RecentActivitySection,
  ActivityItem,
} from '../../components/home';
import {
  APPROVAL_TAB,
  COMPLAINTS_TAB,
  MONEY_TAB,
  NOTIFICATIONS_SCREEN,
  SOS_MONITOR_SCREEN,
} from '../../navigations/url';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const handleNotificationPress = () => {
    navigation.navigate(NOTIFICATIONS_SCREEN);
  };

  const handleSosPress = () => {
    navigation.navigate(SOS_MONITOR_SCREEN);
  };

  const handleActivityPress = (activity: ActivityItem) => {
    Alert.alert(activity.title, `${activity.subtitle}\nTime: ${activity.time}`);
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
        {/* Header: Greeting, User & Society name, Notifications */}
        <HomeHeader
          greeting="GOOD MORNING"
          userName="Welcome back, President"
          societyName="Green Valley Residency"
          onNotificationPress={handleNotificationPress}
          hasUnreadNotification={true}
        />

        {/* SOS Emergency Alert Card */}
        <SosAlertCard
          title="SOS FROM B-402"
          description="Emergency alert received. Tap to respond."
          onPress={handleSosPress}
        />

        {/* 2x2 Stats Grid: Approvals, Complaints, Dues, Visitors */}
        <StatsGrid
          pendingApprovals="08"
          openComplaints="12"
          duesCollected="₹8.4L"
          duesTotal="₹10L total"
          visitorsToday="24"
          onPressPendingApprovals={() => navigation.navigate(APPROVAL_TAB)}
          onPressOpenComplaints={() => navigation.navigate(COMPLAINTS_TAB)}
          onPressDues={() => navigation.navigate(MONEY_TAB)}
        />

        {/* Dark Expenses Waiting Banner */}
        <ExpensesBannerCard
          title="Expenses waiting for you"
          subtitle="Pending expense approvals"
          count="03"
          onPress={() => navigation.navigate(APPROVAL_TAB)}
        />

        {/* Quick Actions: post, emergency, approve, record */}
        <QuickActions
          title="QUICK ACTIONS"
          onPressPost={() =>
            Alert.alert('Post', 'Create a new notice or update.')
          }
          onPressEmergency={handleSosPress}
          onPressApprove={() => navigation.navigate(APPROVAL_TAB)}
          onPressRecord={() => navigation.navigate(MONEY_TAB)}
        />

        {/* Recent Activity Feed */}
        <RecentActivitySection
          title="RECENT ACTIVITY"
          onItemPress={handleActivityPress}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingHorizontal: wp(5),
    paddingBottom: hp(4),
    gap: hp(1.8),
  },
});
