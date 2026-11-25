import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';

const MoneyScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Finance & Money</Text>
          <Text style={styles.subtitle}>Maintenance dues and society funds</Text>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Society Fund</Text>
          <Text style={styles.balanceAmount}>₹ 4,82,500</Text>
          <View style={styles.balanceRow}>
            <View>
              <Text style={styles.subLabel}>Collected this month</Text>
              <Text style={styles.subAmount}>₹ 1,24,000</Text>
            </View>
            <View>
              <Text style={styles.subLabel}>Pending Dues</Text>
              <Text style={[styles.subAmount, { color: COLORS.red }]}>
                ₹ 18,500
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MoneyScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
  },
  header: {
    marginBottom: hp(3),
  },
  title: {
    fontFamily: FONTS.BOLD_OUTFIT,
    fontSize: FONTSIZE.h4,
    color: COLORS.darkText,
  },
  subtitle: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  balanceCard: {
    backgroundColor: COLORS.darkBtn,
    borderRadius: hp(2),
    padding: wp(5),
  },
  balanceLabel: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.small,
    color: '#CAC4D0',
  },
  balanceAmount: {
    fontFamily: FONTS.BOLD_OUTFIT,
    fontSize: FONTSIZE.h2,
    color: COLORS.white,
    marginTop: 6,
    marginBottom: hp(2.5),
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.15)',
    paddingTop: hp(1.5),
  },
  subLabel: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: '#CAC4D0',
  },
  subAmount: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.white,
    marginTop: 3,
  },
});
