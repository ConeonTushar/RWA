import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';
import { ComplaintCommentItem } from './types';

export interface ComplaintCommentsSectionProps {
  comments: ComplaintCommentItem[];
  onAddComment?: (type: 'internal' | 'resident', message: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const ComplaintCommentsSection: React.FC<ComplaintCommentsSectionProps> = ({
  comments,
  onAddComment,
  containerStyle,
}) => {
  const [activeTab, setActiveTab] = useState<'internal' | 'resident'>('internal');
  const [isComposerVisible, setIsComposerVisible] = useState(false);
  const [draftText, setDraftText] = useState('');

  const filteredComments = comments.filter((c) => c.type === activeTab);

  const handleSubmit = () => {
    const trimmed = draftText.trim();
    if (!trimmed) return;
    onAddComment?.(activeTab, trimmed);
    setDraftText('');
    setIsComposerVisible(false);
  };

  const buttonLabel =
    activeTab === 'internal' ? 'Add note' : 'Send reply';

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.sectionTitle}>Comments</Text>

      {/* Filter Pills */}
      <View style={styles.tabsRow}>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => {
            setActiveTab('internal');
            setIsComposerVisible(false);
          }}
          style={[
            styles.tabChip,
            activeTab === 'internal' ? styles.activeChip : styles.inactiveChip,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'internal'
                ? styles.activeTabText
                : styles.inactiveTabText,
            ]}
          >
            Internal note
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => {
            setActiveTab('resident');
            setIsComposerVisible(false);
          }}
          style={[
            styles.tabChip,
            activeTab === 'resident' ? styles.activeChip : styles.inactiveChip,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'resident'
                ? styles.activeTabText
                : styles.inactiveTabText,
            ]}
          >
            Reply to resident
          </Text>
        </TouchableOpacity>
      </View>

      {/* Comment Card */}
      <View style={styles.card}>
        {filteredComments.length > 0 ? (
          filteredComments.map((comment, idx) => (
            <View
              key={comment.id}
              style={idx > 0 ? styles.commentSeparator : undefined}
            >
              <View style={styles.authorRow}>
                <View style={styles.avatar} />
                <View style={styles.authorMeta}>
                  <Text style={styles.authorName}>{comment.author}</Text>
                  <Text style={styles.commentTime}>{comment.timestamp}</Text>
                </View>
              </View>
              <Text style={styles.commentBody}>{comment.message}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyCommentText}>
            No {activeTab === 'internal' ? 'internal notes' : 'replies to resident'} yet.
          </Text>
        )}

        {isComposerVisible ? (
          <View style={styles.composerBox}>
            <TextInput
              style={styles.composerInput}
              placeholder={
                activeTab === 'internal'
                  ? 'Write an internal note...'
                  : 'Write a reply to resident...'
              }
              placeholderTextColor={COLORS.placeholder}
              value={draftText}
              onChangeText={setDraftText}
              multiline
              autoFocus
            />
            <View style={styles.composerActions}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setIsComposerVisible(false);
                  setDraftText('');
                }}
                style={styles.cancelDraftBtn}
              >
                <Text style={styles.cancelDraftText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleSubmit}
                style={styles.submitDraftBtn}
              >
                <Text style={styles.submitDraftText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={buttonLabel}
            activeOpacity={0.75}
            onPress={() => setIsComposerVisible(true)}
            style={styles.addNoteBtn}
          >
            <Text style={styles.addNoteText}>{buttonLabel}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ComplaintCommentsSection;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  sectionTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
    marginBottom: hp(1.2),
  },
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.6),
  },
  tabChip: {
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(0.9),
    borderRadius: wp(5),
    marginRight: wp(2.5),
  },
  activeChip: {
    backgroundColor: COLORS.approvalChipActiveBg,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inactiveChip: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  tabText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
  },
  activeTabText: {
    color: COLORS.approvalChipActiveText,
    fontFamily: FONTS.MEDIUM_OUTFIT,
  },
  inactiveTabText: {
    color: COLORS.textSecondary,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(2),
  },
  commentSeparator: {
    marginTop: hp(1.5),
    paddingTop: hp(1.5),
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: wp(9.5),
    height: wp(9.5),
    borderRadius: wp(4.75),
    backgroundColor: COLORS.avatarBg,
    marginRight: wp(3),
  },
  authorMeta: {
    flex: 1,
  },
  authorName: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
  },
  commentTime: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.15),
  },
  commentBody: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.darkText,
    lineHeight: FONTSIZE.minTiny * 1.45,
    marginTop: hp(1.2),
  },
  emptyCommentText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingVertical: hp(1),
  },
  addNoteBtn: {
    marginTop: hp(1.8),
    width: '100%',
    height: hp(5),
    borderRadius: wp(6),
    borderWidth: 1,
    borderColor: COLORS.darkBtn,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addNoteText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
  },
  composerBox: {
    marginTop: hp(1.5),
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: wp(3),
    padding: wp(3),
    backgroundColor: COLORS.lightGrey,
  },
  composerInput: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.darkText,
    minHeight: hp(7),
    textAlignVertical: 'top',
  },
  composerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: wp(2.5),
    marginTop: hp(1),
  },
  cancelDraftBtn: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.7),
    borderRadius: wp(2.5),
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.white,
  },
  cancelDraftText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
  },
  submitDraftBtn: {
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(0.7),
    borderRadius: wp(2.5),
    backgroundColor: COLORS.darkBtn,
  },
  submitDraftText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.white,
  },
});
