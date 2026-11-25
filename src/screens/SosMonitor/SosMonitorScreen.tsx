import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  SafeAreaView,
  Alert,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';
import VectorIcon from '../../components/elements/VectorIcon';
import { SCREENPARAMS } from '../../navigations/types';

export interface EmergencyAlertDetails {
  flatNumber: string;
  residentName: string;
  residentPhone: string;
  tower: string;
  alertTime: string;
  status: string;
  guardResponseStatus: string;
  guardResponseMessage: string;
}

const DEFAULT_ALERT_DATA: EmergencyAlertDetails = {
  flatNumber: 'B-204',
  residentName: 'Rahul Sharma',
  residentPhone: '+91 98765 43210',
  tower: 'Tower B',
  alertTime: '10:42 AM',
  status: 'Emergency active',
  guardResponseStatus: 'Awaiting response',
  guardResponseMessage: 'No guard has acknowledged this alert yet.',
};

const SosMonitorScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<SCREENPARAMS>>();

  const alertData = DEFAULT_ALERT_DATA;

  const handleCallEmergencyContact = () => {
    Alert.alert(
      'Emergency Call',
      `Direct emergency call options for ${alertData.flatNumber}:`,
      [
        {
          text: `Call ${alertData.residentName}`,
          onPress: () => {
            Linking.openURL(`tel:${alertData.residentPhone}`).catch(() => {
              Alert.alert('Calling', `Dialing ${alertData.residentPhone}...`);
            });
          },
        },
        {
          text: 'Call Security Gate Desk',
          onPress: () => {
            Linking.openURL('tel:+919876500000').catch(() => {
              Alert.alert('Calling', 'Dialing Security Desk (+91 98765 00000)...');
            });
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ],
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

      {/* Top Header with Back Button and Title */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          style={styles.backButton}
        >
          <VectorIcon
            type="Feather"
            name="chevron-left"
            size={wp(5.5)}
            color={COLORS.darkText}
          />
          <Text style={styles.headerTitle}>SOS Monitor</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        <View style={styles.mainContent}>
          {/* Emergency Active Red Card */}
          <View style={styles.emergencyCard}>
            <View style={styles.emergencyTopRow}>
              <View style={styles.emergencyStatusRow}>
                <View style={styles.whiteDot} />
                <Text style={styles.emergencyStatusText}>{alertData.status}</Text>
              </View>
              <Text style={styles.emergencyTimeText}>{alertData.alertTime}</Text>
            </View>

            <Text style={styles.emergencyTitle}>
              SOS from {alertData.flatNumber}
            </Text>
            <Text style={styles.emergencySubtitle}>
              An emergency alert has been raised by a resident.
            </Text>
          </View>

          {/* Section: Emergency Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Emergency Details</Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Flat number</Text>
              <Text style={styles.detailValue}>{alertData.flatNumber}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Resident</Text>
              <Text style={styles.detailValue}>{alertData.residentName}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Tower</Text>
              <Text style={styles.detailValue}>{alertData.tower}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Alert time</Text>
              <Text style={styles.detailValue}>{alertData.alertTime}</Text>
            </View>
          </View>

          {/* Section: Response Status */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Response Status</Text>

            <View style={styles.statusCard}>
              <View style={styles.statusCardTop}>
                <Text style={styles.guardResponseTitle}>Guard response</Text>
                <View style={styles.awaitingBadge}>
                  <Text style={styles.awaitingBadgeText}>
                    {alertData.guardResponseStatus}
                  </Text>
                </View>
              </View>
              <Text style={styles.statusCardSubtitle}>
                {alertData.guardResponseMessage}
              </Text>
            </View>
          </View>

          {/* Section: Emergency Contacts */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Emergency Contacts</Text>
          </View>
        </View>

        {/* Bottom Action Button: Call emergency contact */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleCallEmergencyContact}
            style={styles.callButton}
          >
            <Text style={styles.callButtonText}>Call emergency contact</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SosMonitorScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingHorizontal: wp(5),
    paddingTop: hp(1),
    paddingBottom: hp(1.5),
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.minSmall,
    color: COLORS.darkText,
    marginLeft: wp(1),
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    paddingBottom: hp(3),
  },
  mainContent: {
    flex: 1,
  },
  emergencyCard: {
    backgroundColor: COLORS.sosRed,
    borderRadius: 18,
    paddingHorizontal: wp(5),
    paddingVertical: hp(2.4),
    marginTop: hp(0.5),
  },
  emergencyTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.6),
  },
  emergencyStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  whiteDot: {
    width: wp(4.5),
    height: wp(4.5),
    borderRadius: wp(2.25),
    backgroundColor: COLORS.white,
    marginRight: wp(2),
  },
  emergencyStatusText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.white,
  },
  emergencyTimeText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.white,
  },
  emergencyTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.white,
    marginBottom: hp(0.5),
  },
  emergencySubtitle: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.white,
    lineHeight: 16,
  },
  section: {
    marginTop: hp(3.2),
  },
  sectionTitle: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
    marginBottom: hp(1.8),
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.6),
  },
  detailLabel: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.textSecondary,
  },
  detailValue: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.darkText,
  },
  statusCard: {
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 16,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.8),
    backgroundColor: COLORS.white,
  },
  statusCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  guardResponseTitle: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
  },
  awaitingBadge: {
    backgroundColor: COLORS.badgeWarningBg,
    paddingHorizontal: wp(2.6),
    paddingVertical: hp(0.35),
    borderRadius: 12,
  },
  awaitingBadgeText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.vtiny,
    color: COLORS.badgeWarningText,
  },
  statusCardSubtitle: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.textSecondary,
    marginTop: hp(0.8),
  },
  bottomSection: {
    marginTop: hp(4),
    width: '100%',
  },
  callButton: {
    backgroundColor: COLORS.sosRed,
    borderRadius: 14,
    height: hp(5.8),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  callButtonText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.white,
  },
});
