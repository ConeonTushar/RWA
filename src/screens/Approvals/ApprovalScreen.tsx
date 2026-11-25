import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';
import VectorIcon from '../../components/elements/VectorIcon';

const ApprovalScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Approvals</Text>
          <Text style={styles.subtitle}>Manage pending society requests</Text>
        </View>

        <View style={styles.emptyContainer}>
          <View style={styles.iconCircle}>
            <VectorIcon
              type="MaterialCommunityIcons"
              name="check-circle-outline"
              size={48}
              color={COLORS.greenPrimary}
            />
          </View>
          <Text style={styles.emptyTitle}>All Caught Up</Text>
          <Text style={styles.emptySubtitle}>
            There are no pending approvals at the moment.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ApprovalScreen;

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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(10),
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.badgeGreenBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(2),
  },
  emptyTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.l1,
    color: COLORS.darkText,
  },
  emptySubtitle: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: wp(10),
  },
});
