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
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';
import {
  ComplaintBreakdownCard,
  ComplaintDetailHeader,
  ComplaintStatusBreakdown,
  SummaryBreakdownRow,
  SummaryStatusBarItem,
} from '../../components/complaints';
import VectorIcon from '../../components/elements/VectorIcon';

const PERIODS = ['November 2026', 'October 2026', 'September 2026'];

const STATUS_BREAKDOWN: SummaryStatusBarItem[] = [
  { label: 'Resolved', count: '96', progress: 0.72, color: COLORS.badgeGreenText },
  { label: 'In progress', count: '18', progress: 0.25, color: COLORS.lightPrimary },
  { label: 'Open', count: '08', progress: 0.16, color: COLORS.ownerWaitingText },
  { label: 'Reopened', count: '06', progress: 0.12, color: COLORS.badgeUrgentText },
];

const CATEGORY_BREAKDOWN: SummaryBreakdownRow[] = [
  { label: 'Maintenance', value: 38 },
  { label: 'Water', value: 32 },
  { label: 'Lift', value: 24 },
  { label: 'Security', value: 18 },
  { label: 'Other', value: 16 },
];

const SLA_BREAKDOWN: SummaryBreakdownRow[] = [
  { label: 'Within SLA', value: '82%' },
  { label: 'Outside SLA', value: '18%' },
];

const OVERDUE_COMPLAINTS = [
  { title: 'Lift not working', days: '3 days' },
  { title: 'Water leakage', days: '2 days' },
  { title: 'Street lights', days: '1 days' },
];

const ComplaintSummaryScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [periodIndex, setPeriodIndex] = useState(0);

  const handleCyclePeriod = () => {
    setPeriodIndex((prev) => (prev + 1) % PERIODS.length);
  };

  const handleExport = () => {
    Alert.alert(
      'Export Summary',
      `Exporting complaint summary report for ${PERIODS[periodIndex]}...`
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
      >
        <ComplaintDetailHeader
          title="Complaint summary"
          onBackPress={() => navigation.goBack()}
        />

        {/* Reporting Period Selector */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleCyclePeriod}
          style={styles.periodCard}
        >
          <View>
            <Text style={styles.periodLabel}>Reporting period</Text>
            <Text style={styles.periodValue}>{PERIODS[periodIndex]}</Text>
          </View>
          <VectorIcon
            type="Feather"
            name="chevron-down"
            size={wp(5)}
            color={COLORS.darkText}
          />
        </TouchableOpacity>

        {/* 2x2 Stat Grid */}
        <View style={styles.statGrid}>
          <View style={styles.statRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Total complaints</Text>
              <Text style={styles.statValue}>128</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Resolved</Text>
              <Text style={styles.statValue}>96</Text>
            </View>
          </View>

          <View style={styles.statRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Open</Text>
              <Text style={styles.statValue}>24</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Overdue</Text>
              <Text style={[styles.statValue, styles.overdueValue]}>08</Text>
            </View>
          </View>
        </View>

        {/* Complaints By Status */}
        <ComplaintStatusBreakdown
          title="Complaints By Status"
          items={STATUS_BREAKDOWN}
          containerStyle={styles.sectionSpacing}
        />

        {/* Complaints By Category */}
        <ComplaintBreakdownCard
          title="Complaints By Category"
          rows={CATEGORY_BREAKDOWN}
          containerStyle={styles.sectionSpacing}
        />

        {/* SLA Compliance */}
        <ComplaintBreakdownCard
          title="SLA Performance"
          rows={SLA_BREAKDOWN}
          containerStyle={styles.sectionSpacing}
        />

        {/* Top Overdue Complaints */}
        <View style={styles.sectionSpacing}>
          <Text style={styles.sectionTitle}>Top Overdue Complaints</Text>
          <View style={styles.overdueList}>
            {OVERDUE_COMPLAINTS.map((item) => (
              <View key={item.title} style={styles.overdueRow}>
                <Text style={styles.overdueTitle}>{item.title}</Text>
                <View style={styles.overdueBadge}>
                  <Text style={styles.overdueBadgeText}>{item.days}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Export Button */}
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Export summary"
          activeOpacity={0.8}
          onPress={handleExport}
          style={styles.exportBtn}
        >
          <Text style={styles.exportBtnText}>Export summary</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ComplaintSummaryScreen;

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
  periodCard: {
    marginTop: hp(1.2),
    backgroundColor: COLORS.lightGrey,
    borderRadius: wp(3.5),
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(1.6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  periodLabel: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
  },
  periodValue: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
    marginTop: hp(0.3),
  },
  statGrid: {
    marginTop: hp(2),
    gap: hp(1.5),
  },
  statRow: {
    flexDirection: 'row',
    gap: wp(3),
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.8),
  },
  statLabel: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
  },
  statValue: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.l1,
    color: COLORS.darkText,
    marginTop: hp(0.6),
  },
  overdueValue: {
    color: COLORS.red,
  },
  sectionSpacing: {
    marginTop: hp(2.6),
  },
  sectionTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
    marginBottom: hp(1.4),
  },
  overdueList: {
    gap: hp(1.5),
  },
  overdueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overdueTitle: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.darkText,
  },
  overdueBadge: {
    backgroundColor: COLORS.badgeUrgentBg,
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(0.45),
    borderRadius: wp(4),
  },
  overdueBadgeText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.badgeUrgentText,
  },
  exportBtn: {
    width: '100%',
    height: hp(5.6),
    borderRadius: wp(3.5),
    borderWidth: 1,
    borderColor: COLORS.darkBtn,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(3.5),
  },
  exportBtnText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
  },
});
