import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';
import VectorIcon, { IconType } from '../../components/elements/VectorIcon';

interface MenuOption {
  icon: string;
  iconType: IconType;
  title: string;
  subtitle: string;
}

const MENU_OPTIONS: MenuOption[] = [
  {
    icon: 'account-group-outline',
    iconType: 'MaterialCommunityIcons',
    title: 'Resident Directory',
    subtitle: 'View all members and flats',
  },
  {
    icon: 'file-document-outline',
    iconType: 'MaterialCommunityIcons',
    title: 'Society Documents',
    subtitle: 'Registration, bylaws and rules',
  },
  {
    icon: 'cog-outline',
    iconType: 'MaterialCommunityIcons',
    title: 'Settings',
    subtitle: 'App preferences and notifications',
  },
  {
    icon: 'help-circle-outline',
    iconType: 'MaterialCommunityIcons',
    title: 'Help & Support',
    subtitle: 'Get assistance and FAQs',
  },
];

const MoreScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>More</Text>
          <Text style={styles.subtitle}>Society tools & management</Text>
        </View>

        <View style={styles.menuContainer}>
          {MENU_OPTIONS.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              activeOpacity={0.7}
            >
              <View style={styles.menuIconBox}>
                <VectorIcon
                  type={item.iconType}
                  name={item.icon}
                  size={22}
                  color={COLORS.darkText}
                />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSub}>{item.subtitle}</Text>
              </View>
              <VectorIcon
                type="MaterialCommunityIcons"
                name="chevron-right"
                size={22}
                color={COLORS.placeholder}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MoreScreen;

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
  menuContainer: {
    backgroundColor: COLORS.white,
    borderRadius: hp(1.8),
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
  },
  menuIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGrey,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3.5),
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
  },
  menuSub: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});
