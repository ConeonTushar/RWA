import React from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp } from '../../utils/helper';
import MoreGridItem from './MoreGridItem';
import { MoreMenuItem, MoreSectionData } from './types';

export interface MoreSectionProps {
  section: MoreSectionData;
  onItemPress?: (item: MoreMenuItem) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const MoreSection: React.FC<MoreSectionProps> = ({
  section,
  onItemPress,
  containerStyle,
}) => {
  if (!section.items.length) {
    return null;
  }

  return (
    <View style={[styles.sectionContainer, containerStyle]}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <View style={styles.grid}>
        {section.items.map(item => (
          <MoreGridItem key={item.id} item={item} onPress={onItemPress} />
        ))}
      </View>
    </View>
  );
};

export default MoreSection;

const styles = StyleSheet.create({
  sectionContainer: {
    width: '100%',
    marginTop: hp(2),
  },
  sectionTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
    color: COLORS.textSecondary,
    letterSpacing: 0.9,
    textTransform: 'uppercase',
    marginBottom: hp(1.6),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    width: '100%',
  },
});
