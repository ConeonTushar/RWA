import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import InputBox from '../../components/elements/InputBox';
import CustomDropdown, {
  DropdownItem,
} from '../../components/elements/CustomDropdown';
import SubmitButton from '../../components/elements/SubmitButton';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { wp, textScale, vs } from '../../utils/helper';
import { IMAGES } from '../../assets/Images';
import { SOCIETY_CONTACT_SCREEN } from '../../navigations/url';
import { SCREENPARAMS } from '../../navigations/types';

type SocietyStructureNavigationProp = NativeStackNavigationProp<SCREENPARAMS>;

const ALL_AMENITIES: DropdownItem[] = [
  { id: 'clubhouse', name: 'Clubhouse' },
  { id: 'swimming_pool', name: 'Swimming Pool' },
  { id: 'gym', name: 'Gym / Fitness Center' },
  { id: 'play_area', name: "Children's Play Area" },
  { id: 'security', name: '24x7 Security & CCTV' },
  { id: 'power_backup', name: '100% Power Backup' },
  { id: 'tennis_court', name: 'Tennis / Badminton Court' },
  { id: 'jogging_track', name: 'Jogging Track' },
  { id: 'community_hall', name: 'Community Hall' },
  { id: 'ev_charging', name: 'EV Charging Stations' },
];

const SocietyStructureScreen = () => {
  const navigation = useNavigation<SocietyStructureNavigationProp>();

  const [isIndependentHouses, setIsIndependentHouses] = useState(false);
  const [numberOfTowers, setNumberOfTowers] = useState('');
  const [totalFlats, setTotalFlats] = useState('');
  const [numberOfGates, setNumberOfGates] = useState('');
  const [gateNames, setGateNames] = useState<string[]>(['Main Gate']);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'Clubhouse',
  ]);
  const [addGateModalVisible, setAddGateModalVisible] = useState(false);
  const [newGateName, setNewGateName] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const clearError = (key: string) => {
    if (errors[key]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!numberOfTowers.trim()) {
      newErrors.numberOfTowers = 'Please enter number of towers or blocks';
    }
    if (!totalFlats.trim()) {
      newErrors.totalFlats = 'Please enter total flats or houses';
    }
    if (!numberOfGates.trim()) {
      newErrors.numberOfGates = 'Please enter number of gates';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      navigation.navigate(SOCIETY_CONTACT_SCREEN as any);
    }
  };

  const handleAddGate = () => {
    if (newGateName.trim()) {
      setGateNames(prev => [...prev, newGateName.trim()]);
      setNewGateName('');
      setAddGateModalVisible(false);
    }
  };

  const handleRemoveGate = (index: number) => {
    if (gateNames.length > 1) {
      setGateNames(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleAmenitySelect = (amenityId: string) => {
    const item = ALL_AMENITIES.find(a => a.id === amenityId);
    if (item && !selectedAmenities.includes(item.name)) {
      setSelectedAmenities(prev => [...prev, item.name]);
    }
  };

  const handleRemoveAmenity = (name: string) => {
    setSelectedAmenities(prev => prev.filter(a => a !== name));
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        {...(Platform.OS === 'android'
          ? { backgroundColor: COLORS.white }
          : {})}
      />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? vs(10) : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Top Section */}
          <View style={styles.topSection}>
            {/* Header Bar */}
            <View style={styles.headerBar}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                activeOpacity={0.7}
              >
                <Image
                  source={IMAGES.backArrow}
                  style={styles.backIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            {/* Title & Subtitle */}
            <View style={styles.textContainer}>
              <Text style={styles.title}>Society basics</Text>
              <Text style={styles.subtitle}>
                Let's start with the basic information about your society.
              </Text>
            </View>

            {/* Form Fields */}
            <View style={styles.formContainer}>
              {/* Independent Houses Toggle Row */}
              <View style={styles.toggleRow}>
                <View style={styles.toggleTextContainer}>
                  <Text style={styles.toggleTitle}>
                    My society has independent houses, not towers
                  </Text>
                  <Text style={styles.toggleSubtitle}>
                    Enable this for independent houses or plots.
                  </Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.togglePill,
                    isIndependentHouses && styles.togglePillActive,
                  ]}
                  activeOpacity={0.85}
                  onPress={() => setIsIndependentHouses(prev => !prev)}
                >
                  <Text style={styles.togglePillText}>
                    {isIndependentHouses ? 'Yes' : 'No'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Towers or Blocks Input */}
              <InputBox
                label={
                  isIndependentHouses
                    ? 'Number of blocks or phases'
                    : 'Number of towers or blocks'
                }
                required
                value={numberOfTowers}
                onChangeText={text => {
                  setNumberOfTowers(text);
                  clearError('numberOfTowers');
                }}
                placeholder="Enter number of towers or blocks"
                placeholderTextColor={COLORS.placeholder}
                keyboardType="numeric"
                error={errors.numberOfTowers}
                containerStyle={styles.inputSpacing}
              />

              {/* Total Flats or Houses */}
              <InputBox
                label="Total flats or houses"
                required
                value={totalFlats}
                onChangeText={text => {
                  setTotalFlats(text);
                  clearError('totalFlats');
                }}
                placeholder="Enter total number of flats or houses"
                placeholderTextColor={COLORS.placeholder}
                keyboardType="numeric"
                error={errors.totalFlats}
                containerStyle={styles.inputSpacing}
              />

              {/* Number of Gates */}
              <InputBox
                label="Number of gates"
                required
                value={numberOfGates}
                onChangeText={text => {
                  setNumberOfGates(text);
                  clearError('numberOfGates');
                }}
                placeholder="Search city"
                placeholderTextColor={COLORS.placeholder}
                keyboardType="numeric"
                error={errors.numberOfGates}
                containerStyle={styles.inputSpacing}
              />

              {/* Gate Names Section */}
              <View style={styles.gateSection}>
                <Text style={styles.sectionHeader}>Gate Names</Text>
                <View style={styles.chipsRow}>
                  {gateNames.map((gate, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.greenChip}
                      activeOpacity={0.8}
                      onPress={() => handleRemoveGate(index)}
                    >
                      <Text style={styles.greenChipText}>{gate}</Text>
                    </TouchableOpacity>
                  ))}

                  <TouchableOpacity
                    style={styles.addChip}
                    activeOpacity={0.7}
                    onPress={() => setAddGateModalVisible(true)}
                  >
                    <Text style={styles.addChipText}>+ Add</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Amenities Dropdown */}
              <CustomDropdown
                label="Amenities"
                data={ALL_AMENITIES}
                value={null}
                onChange={val => handleAmenitySelect(val as string)}
                placeholder="Search Amenities"
                containerStyle={styles.inputSpacing}
              />

              {/* Selected Amenities Chips */}
              {selectedAmenities.length > 0 && (
                <View style={styles.amenitiesChipsContainer}>
                  {selectedAmenities.map((amenity, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.greenChip}
                      activeOpacity={0.8}
                      onPress={() => handleRemoveAmenity(amenity)}
                    >
                      <Text style={styles.greenChipText}>{amenity}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* Bottom Button */}
          <SubmitButton title="Continue" onPress={handleContinue} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Add Gate Name Modal */}
      <Modal
        visible={addGateModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAddGateModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalBackdrop}
        >
          <View style={styles.addGateModalCard}>
            <Text style={styles.modalTitle}>Add Gate Name</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. Back Gate, North Gate"
              placeholderTextColor={COLORS.placeholder}
              value={newGateName}
              onChangeText={setNewGateName}
              autoFocus
            />
            <View style={styles.modalActionsRow}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => {
                  setNewGateName('');
                  setAddGateModalVisible(false);
                }}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalAddButton}
                onPress={handleAddGate}
              >
                <Text style={styles.modalAddText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default SocietyStructureScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: wp(6),
    paddingBottom: vs(16),
  },
  topSection: {
    width: '100%',
  },
  headerBar: {
    paddingTop: vs(8),
    paddingBottom: vs(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: vs(36),
    height: vs(36),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backIcon: {
    width: vs(20),
    height: vs(20),
  },
  textContainer: {
    marginTop: vs(8),
    marginBottom: vs(16),
  },
  title: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.l2,
    color: COLORS.darkText,
    marginBottom: vs(4),
  },
  subtitle: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.textSecondary,
    lineHeight: textScale(16),
  },
  formContainer: {
    width: '100%',
    marginTop: vs(8),
  },
  inputSpacing: {
    marginBottom: vs(16),
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vs(16),
    marginTop: vs(4),
  },
  toggleTextContainer: {
    flex: 1,
    marginRight: wp(3),
  },
  toggleTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.darkText,
    lineHeight: textScale(16),
  },
  toggleSubtitle: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.textSecondary,
    marginTop: vs(2),
  },
  togglePill: {
    backgroundColor: COLORS.darkBtn,
    paddingHorizontal: wp(1.5),
    paddingVertical: vs(2),
    borderRadius: 20,
    minWidth: wp(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  togglePillActive: {
    backgroundColor: COLORS.greenPrimary,
  },
  togglePillText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.white,
  },
  gateSection: {
    marginTop: vs(4),
    marginBottom: vs(10),
  },
  sectionHeader: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.darkText,
    lineHeight: textScale(16),
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  greenChip: {
    backgroundColor: COLORS.badgeGreenBg,
    paddingHorizontal: wp(4.5),
    paddingVertical: vs(4),
    borderRadius: 20,
    marginRight: wp(2.5),
    marginBottom: vs(6),
  },
  greenChipText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.badgeGreenText,
  },
  addChip: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    paddingHorizontal: wp(4.5),
    paddingVertical: vs(4),
    borderRadius: 20,
    marginBottom: vs(8),
  },
  addChipText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
  },
  amenitiesChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: vs(2),
    marginBottom: vs(12),
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(6),
  },
  addGateModalCard: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: wp(5),
  },
  modalTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
    marginBottom: vs(12),
  },
  modalInput: {
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 10,
    paddingHorizontal: wp(3.5),
    paddingVertical: vs(10),
    fontSize: FONTSIZE.tiny,
    fontFamily: FONTS.REGULAR_OUTFIT,
    color: COLORS.darkText,
    marginBottom: vs(16),
  },
  modalActionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalCancelButton: {
    paddingVertical: vs(8),
    paddingHorizontal: wp(4),
    marginRight: wp(2),
  },
  modalCancelText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.textSecondary,
  },
  modalAddButton: {
    backgroundColor: COLORS.darkBtn,
    paddingVertical: vs(8),
    paddingHorizontal: wp(5),
    borderRadius: 10,
  },
  modalAddText: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.white,
  },
});
