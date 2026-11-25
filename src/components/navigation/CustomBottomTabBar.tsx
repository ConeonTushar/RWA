import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import VectorIcon, { IconType } from '../elements/VectorIcon';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';

export interface TabConfig {
  name: string;
  label: string;
  iconName: string;
  iconType: IconType;
}

export const DEFAULT_TABS: TabConfig[] = [
  {
    name: 'Home',
    label: 'Home',
    iconName: 'home-outline',
    iconType: 'MaterialCommunityIcons',
  },
  {
    name: 'Approval',
    label: 'Approval',
    iconName: 'check-circle-outline',
    iconType: 'MaterialCommunityIcons',
  },
  {
    name: 'Complaints',
    label: 'Complaints',
    iconName: 'message-alert-outline',
    iconType: 'MaterialCommunityIcons',
  },
  {
    name: 'Money',
    label: 'Money',
    iconName: 'wallet-outline',
    iconType: 'MaterialCommunityIcons',
  },
  {
    name: 'More',
    label: 'More',
    iconName: 'view-grid-outline',
    iconType: 'MaterialCommunityIcons',
  },
];

export interface CustomBottomTabBarProps extends Partial<BottomTabBarProps> {
  activeTab?: string;
  onTabPress?: (tabName: string) => void;
  hasTopCurve?: boolean;
  topCurveColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  tabs?: TabConfig[];
  bottomPadding?: number;
}

const CustomBottomTabBar: React.FC<CustomBottomTabBarProps> = ({
  state,
  navigation,
  activeTab,
  onTabPress,
  hasTopCurve = true,
  topCurveColor = COLORS.white,
  containerStyle,
  labelStyle,
  tabs = DEFAULT_TABS,
  bottomPadding,
}) => {
  const insets = useSafeAreaInsets();

  const currentBottomPadding =
    bottomPadding !== undefined
      ? bottomPadding
      : Platform.OS === 'ios'
      ? insets.bottom > 0
        ? insets.bottom
        : 12
      : 12;

  // Determine active route name based on react-navigation state or standalone prop
  const currentActiveRoute = state
    ? state.routes[state.index]?.name
    : activeTab || tabs[0].name;

  const handlePress = (tabName: string, routeKey?: string) => {
    if (navigation && routeKey && state) {
      const isFocused = state.routes[state.index].name === tabName;
      const event = navigation.emit({
        type: 'tabPress',
        target: routeKey,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(tabName);
      }
    } else {
      onTabPress?.(tabName);
    }
  };

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {/* Curved scoop overlay matching the Figma design */}
      {hasTopCurve && (
        <View style={styles.topCurveContainer}>
          <View
            style={[styles.topCurveInner, { backgroundColor: topCurveColor }]}
          />
        </View>
      )}

      {/* Main Bar Items */}
      <View
        style={[
          styles.barContainer,
          { paddingBottom: currentBottomPadding },
        ]}
      >
        {tabs.map(tab => {
          // If react-navigation state exists, match against route
          const route = state?.routes.find(r => r.name === tab.name);
          const routeKey = route?.key;
          const isFocused = currentActiveRoute === tab.name;

          const activeColor = COLORS.white;
          const inactiveColor = '#CAC4D0';
          const itemColor = isFocused ? activeColor : inactiveColor;

          return (
            <TouchableOpacity
              key={tab.name}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={tab.label}
              activeOpacity={0.75}
              onPress={() => handlePress(tab.name, routeKey)}
              style={styles.tabButton}
            >
              <VectorIcon
                type={tab.iconType}
                name={tab.iconName}
                size={22}
                color={itemColor}
              />
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color: itemColor,
                    fontFamily: isFocused
                      ? FONTS.MEDIUM_OUTFIT
                      : FONTS.REGULAR_OUTFIT,
                  },
                  labelStyle,
                ]}
                numberOfLines={1}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CustomBottomTabBar;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#1D1B20',
    width: '100%',
  },

  // Curved top container: dark background with white scoop dipping down
  topCurveContainer: {
    height: 22,
    backgroundColor: '#1D1B20',
    width: '100%',
    overflow: 'hidden',
  },

  topCurveInner: {
    height: 22,
    width: '100%',
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },

  barContainer: {
    flexDirection: 'row',
    backgroundColor: '#1D1B20',
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },

  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },

  tabLabel: {
    fontSize: FONTSIZE.xsmall,
    marginTop: 4,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
});
