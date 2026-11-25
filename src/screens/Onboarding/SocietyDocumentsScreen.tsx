import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SubmitButton from '../../components/elements/SubmitButton';
import DocumentUploadModal from '../../components/modal/DocumentUploadModal';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { wp, textScale, vs } from '../../utils/helper';
import { IMAGES } from '../../assets/Images';
import { LOGIN_SCREEN } from '../../navigations/url';
import { SCREENPARAMS } from '../../navigations/types';

type SocietyDocumentsNavigationProp = NativeStackNavigationProp<SCREENPARAMS>;

type DocKey = 'registration' | 'bylaws' | 'idFront' | 'idBack';

interface DocumentInfo {
  fileName: string;
  fileSize: string;
}

const SAMPLE_FILES: Record<DocKey, DocumentInfo> = {
  registration: {
    fileName: 'society_registration_cert.pdf',
    fileSize: '1.4 MB',
  },
  bylaws: { fileName: 'society_bylaws_rules.pdf', fileSize: '2.1 MB' },
  idFront: { fileName: 'aadhaar_pan_front.jpg', fileSize: '850 KB' },
  idBack: { fileName: 'aadhaar_pan_back.jpg', fileSize: '820 KB' },
};

const SocietyDocumentsScreen = () => {
  const navigation = useNavigation<SocietyDocumentsNavigationProp>();

  // State to track uploaded files
  const [uploadedDocs, setUploadedDocs] = useState<
    Partial<Record<DocKey, DocumentInfo>>
  >({});
  const [activeUploadKey, setActiveUploadKey] = useState<DocKey | null>(null);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleCardPress = (key: DocKey) => {
    setActiveUploadKey(key);
    setUploadModalVisible(true);
  };

  const handleSelectSample = (key: DocKey) => {
    setUploadedDocs(prev => ({
      ...prev,
      [key]: SAMPLE_FILES[key],
    }));
    setUploadModalVisible(false);
    setActiveUploadKey(null);
  };

  const handleRemoveDoc = (key: DocKey) => {
    setUploadedDocs(prev => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
    setUploadModalVisible(false);
    setActiveUploadKey(null);
  };

  const validate = () => {
    if (!uploadedDocs.idFront) {
      Alert.alert(
        'Required Document',
        'Please upload your ID proof (front) to continue.',
        [{ text: 'OK' }],
      );
      return false;
    }
    return true;
  };

  const handleContinue = () => {
    setHasSubmitted(true);
    if (validate()) {
      Alert.alert(
        'Registration Submitted',
        'Your society details and verification documents have been submitted successfully for verification!',
        [
          {
            text: 'Go to Login',
            onPress: () => navigation.navigate(LOGIN_SCREEN),
          },
        ],
      );
    }
  };

  const getDocTitle = (key: DocKey) => {
    switch (key) {
      case 'registration':
        return 'Society registration certificate';
      case 'bylaws':
        return 'Society bylaws';
      case 'idFront':
        return 'ID proof (front)*';
      case 'idBack':
        return 'ID proof (back, if any)';
    }
  };

  const renderUploadCard = (
    key: DocKey,
    title: string,
    subtitle: string,
    isMandatory: boolean = false,
  ) => {
    const doc = uploadedDocs[key];
    const isError = hasSubmitted && isMandatory && !doc;

    return (
      <TouchableOpacity
        key={key}
        style={[
          styles.uploadCard,
          isError && styles.uploadCardError,
          doc && styles.uploadCardUploaded,
        ]}
        activeOpacity={0.7}
        onPress={() => handleCardPress(key)}
      >
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>{title}</Text>
          {doc && (
            <View style={styles.uploadedBadge}>
              <Text style={styles.uploadedBadgeText}>✓ Attached</Text>
            </View>
          )}
        </View>

        <Text style={styles.cardSubtitle}>{subtitle}</Text>

        {doc && (
          <View style={styles.fileDetailRow}>
            <View style={styles.fileIconBox}>
              <Text style={styles.fileIconText}>📄</Text>
            </View>
            <View style={styles.fileTextContainer}>
              <Text style={styles.fileNameText} numberOfLines={1}>
                {doc.fileName}
              </Text>
              <Text style={styles.fileSizeText}>{doc.fileSize}</Text>
            </View>
            <TouchableOpacity
              onPress={() => handleRemoveDoc(key)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.removeFileBtn}
            >
              <Text style={styles.removeFileText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    );
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

            {/* Cards List */}
            <View style={styles.cardsContainer}>
              {/* Card 1: Registration certificate */}
              {renderUploadCard(
                'registration',
                'Society registration certificate',
                'Upload a valid government-issued identity document.',
              )}

              {/* Card 2: Society bylaws */}
              {renderUploadCard(
                'bylaws',
                'Society bylaws',
                'Upload an accepted ownership document as defined by society.',
              )}

              {/* Section Header */}
              <Text style={styles.sectionHeader}>Your ID Proof</Text>

              {/* Card 3: ID proof (front)* */}
              {renderUploadCard(
                'idFront',
                'ID proof (front)*',
                'Upload a valid government-issued identity document.',
                true,
              )}

              {/* Card 4: ID proof (back, if any) */}
              {renderUploadCard(
                'idBack',
                'ID proof (back, if any)',
                'Upload an accepted ownership document as defined by society.',
              )}
            </View>
          </View>

          {/* Bottom Button */}
          <SubmitButton title="Continue" onPress={handleContinue} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Upload Options Modal */}
      <DocumentUploadModal
        visible={uploadModalVisible}
        onClose={() => setUploadModalVisible(false)}
        title={
          activeUploadKey
            ? `Upload ${getDocTitle(activeUploadKey)}`
            : 'Upload Document'
        }
        hasUploaded={Boolean(activeUploadKey && uploadedDocs[activeUploadKey])}
        onSelectDocument={() =>
          activeUploadKey && handleSelectSample(activeUploadKey)
        }
        onTakePhoto={() =>
          activeUploadKey && handleSelectSample(activeUploadKey)
        }
        onRemove={() => activeUploadKey && handleRemoveDoc(activeUploadKey)}
      />
    </View>
  );
};

export default SocietyDocumentsScreen;

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
    lineHeight: textScale(15),
  },

  // Cards List
  cardsContainer: {
    width: '100%',
    marginTop: vs(6),
  },
  uploadCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    paddingHorizontal: wp(4.5),
    paddingVertical: vs(15),
    marginBottom: vs(12),
  },
  uploadCardUploaded: {
    backgroundColor: '#F4FBF7',
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  uploadCardError: {
    borderWidth: 1,
    borderColor: COLORS.red,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
    flex: 1,
  },
  cardSubtitle: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginTop: vs(3),
    lineHeight: textScale(16),
  },
  uploadedBadge: {
    backgroundColor: COLORS.badgeGreenBg,
    paddingHorizontal: wp(2.5),
    paddingVertical: vs(2),
    borderRadius: 8,
    marginLeft: wp(2),
  },
  uploadedBadgeText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
    color: COLORS.badgeGreenText,
  },
  fileDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: wp(3),
    paddingVertical: vs(8),
    borderRadius: 8,
    marginTop: vs(10),
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  fileIconBox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(2.5),
  },
  fileIconText: {
    fontSize: 14,
  },
  fileTextContainer: {
    flex: 1,
  },
  fileNameText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.darkText,
  },
  fileSizeText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.vtiny,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  removeFileBtn: {
    padding: 4,
  },
  removeFileText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  // Section Header
  sectionHeader: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.darkText,
    marginTop: vs(8),
    marginBottom: vs(10),
  },
});
