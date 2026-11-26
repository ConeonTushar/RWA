import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  LOGIN_SCREEN,
  OTP_SCREEN,
  SELECT_SOCIETY_SCREEN,
  PROFILE_SCREEN,
  SOCIETY_BASICS_SCREEN,
  SOCIETY_ADDRESS_SCREEN,
  SOCIETY_STRUCTURE_SCREEN,
  SOCIETY_CONTACT_SCREEN,
  SOCIETY_DOCUMENTS_SCREEN,
  MAIN_TAB_NAVIGATOR,
  NOTIFICATIONS_SCREEN,
  SOS_MONITOR_SCREEN,
  RESIDENT_REQUEST_DETAIL_SCREEN,
  REQUEST_MORE_INFO_SCREEN,
  VENDOR_REQUEST_DETAIL_SCREEN,
  PERMISSION_REQUEST_DETAIL_SCREEN,
  BOOKING_APPROVAL_DETAIL_SCREEN,
  COMPLAINT_DETAIL_SCREEN,
  ASSIGN_COMPLAINT_SCREEN,
  UPDATE_COMPLAINT_SCREEN,
  COMPLAINT_SUMMARY_SCREEN,
} from './url';
import { SCREENPARAMS } from './types';
import LoginScreen from '../screens/Onboarding/LoginScreen';
import OtpScreen from '../screens/Onboarding/OtpScreen';
import SelectSocietyScreen from '../screens/Onboarding/SelectSocietyScreen';
import ProfileScreen from '../screens/Onboarding/ProfileScreen';
import SocietyBasicsScreen from '../screens/Onboarding/SocietyBasicsScreen';
import SocietyAddressScreen from '../screens/Onboarding/SocietyAddressScreen';
import SocietyStructureScreen from '../screens/Onboarding/SocietyStructureScreen';
import SocietyContactScreen from '../screens/Onboarding/SocietyContactScreen';
import SocietyDocumentsScreen from '../screens/Onboarding/SocietyDocumentsScreen';
import BottomTabNavigator from './BottomTabNavigator';
import { NotificationsScreen } from '../screens/Notifications';
import { SosMonitorScreen } from '../screens/SosMonitor';
import {
  ResidentRequestDetailScreen,
  RequestMoreInfoScreen,
  VendorRequestDetailScreen,
  PermissionRequestDetailScreen,
  BookingApprovalDetailScreen,
} from '../screens/Approvals';
import {
  ComplaintDetailScreen,
  AssignComplaintScreen,
  UpdateComplaintScreen,
  ComplaintSummaryScreen,
} from '../screens/Complaints';

const Stack = createNativeStackNavigator<SCREENPARAMS>();
const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={MAIN_TAB_NAVIGATOR}
        screenOptions={{ gestureEnabled: false }}
      >
        <Stack.Screen
          name={MAIN_TAB_NAVIGATOR}
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={LOGIN_SCREEN}
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={OTP_SCREEN}
          component={OtpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SELECT_SOCIETY_SCREEN}
          component={SelectSocietyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={PROFILE_SCREEN}
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SOCIETY_BASICS_SCREEN}
          component={SocietyBasicsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SOCIETY_ADDRESS_SCREEN}
          component={SocietyAddressScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SOCIETY_STRUCTURE_SCREEN}
          component={SocietyStructureScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SOCIETY_CONTACT_SCREEN}
          component={SocietyContactScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SOCIETY_DOCUMENTS_SCREEN}
          component={SocietyDocumentsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={NOTIFICATIONS_SCREEN}
          component={NotificationsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SOS_MONITOR_SCREEN}
          component={SosMonitorScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RESIDENT_REQUEST_DETAIL_SCREEN}
          component={ResidentRequestDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={REQUEST_MORE_INFO_SCREEN}
          component={RequestMoreInfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={VENDOR_REQUEST_DETAIL_SCREEN}
          component={VendorRequestDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={PERMISSION_REQUEST_DETAIL_SCREEN}
          component={PermissionRequestDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={BOOKING_APPROVAL_DETAIL_SCREEN}
          component={BookingApprovalDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={COMPLAINT_DETAIL_SCREEN}
          component={ComplaintDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ASSIGN_COMPLAINT_SCREEN}
          component={AssignComplaintScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={UPDATE_COMPLAINT_SCREEN}
          component={UpdateComplaintScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={COMPLAINT_SUMMARY_SCREEN}
          component={ComplaintSummaryScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
