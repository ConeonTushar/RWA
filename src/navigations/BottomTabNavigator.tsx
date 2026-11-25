import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomBottomTabBar from '../components/navigation/CustomBottomTabBar';
import {
  HomeScreen,
  ApprovalScreen,
  ComplaintsScreen,
  MoneyScreen,
  MoreScreen,
} from '../screens/Tabs';
import {
  HOME_TAB,
  APPROVAL_TAB,
  COMPLAINTS_TAB,
  MONEY_TAB,
  MORE_TAB,
} from './url';

export type BottomTabParamList = {
  [HOME_TAB]: undefined;
  [APPROVAL_TAB]: undefined;
  [COMPLAINTS_TAB]: undefined;
  [MONEY_TAB]: undefined;
  [MORE_TAB]: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const renderCustomTabBar = (props: any) => <CustomBottomTabBar {...props} />;

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={HOME_TAB}
      tabBar={renderCustomTabBar}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name={HOME_TAB} component={HomeScreen} />
      <Tab.Screen name={APPROVAL_TAB} component={ApprovalScreen} />
      <Tab.Screen name={COMPLAINTS_TAB} component={ComplaintsScreen} />
      <Tab.Screen name={MONEY_TAB} component={MoneyScreen} />
      <Tab.Screen name={MORE_TAB} component={MoreScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
