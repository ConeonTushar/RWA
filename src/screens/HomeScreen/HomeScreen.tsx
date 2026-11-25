import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';
import VectorIcon from '../../components/elements/VectorIcon';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingText}>Welcome back,</Text>
            <Text style={styles.societyName}>Green Valley Society</Text>
          </View>
          <View style={styles.notificationBtn}>
            <VectorIcon
              type="MaterialCommunityIcons"
              name="bell-outline"
              size={24}
              color={COLORS.darkText}
            />
          </View>
        </View>

        {/* Quick Stats Card */}
        <View style={styles.statsCard}>
          <Text style={styles.cardTitle}>Society Overview</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>142</Text>
              <Text style={styles.statLabel}>Flats</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>18</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>4</Text>
              <Text style={styles.statLabel}>Alerts</Text>
            </View>
          </View>
        </View>

        {/* Recent Updates */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Notices</Text>
          <View style={styles.noticeCard}>
            <View style={styles.noticeIcon}>
              <VectorIcon
                type="MaterialCommunityIcons"
                name="bullhorn-outline"
                size={22}
                color={COLORS.greenPrimary}
              />
            </View>
            <View style={styles.noticeContent}>
              <Text style={styles.noticeHeading}>Monthly Maintenance Due</Text>
              <Text style={styles.noticeSub}>Due date is 30th November</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
    paddingBottom: hp(4),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(2.5),
  },
  greetingText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.textSecondary,
  },
  societyName: {
    fontFamily: FONTS.BOLD_OUTFIT,
    fontSize: FONTSIZE.h4,
    color: COLORS.darkText,
    marginTop: 2,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.lightGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsCard: {
    backgroundColor: COLORS.lightGrey,
    borderRadius: hp(1.8),
    padding: wp(4.5),
    marginBottom: hp(2.5),
  },
  cardTitle: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
    marginBottom: hp(1.5),
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: COLORS.cardBorder,
  },
  statNumber: {
    fontFamily: FONTS.BOLD_OUTFIT,
    fontSize: FONTSIZE.h5,
    color: COLORS.greenPrimary,
  },
  statLabel: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  section: {
    marginTop: hp(1),
  },
  sectionTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.l2,
    color: COLORS.darkText,
    marginBottom: hp(1.5),
  },
  noticeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: hp(1.4),
    padding: wp(4),
  },
  noticeIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.badgeGreenBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3.5),
  },
  noticeContent: {
    flex: 1,
  },
  noticeHeading: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
  },
  noticeSub: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});
