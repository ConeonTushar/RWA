import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../utils/font';
import { hp, textScale, vs, width } from '../../utils/helper';
import { IMAGES } from '../../assets/Images';

interface SplashScreenProps {
  onFinish?: () => void;
  duration?: number;
}

const BUILDING_ASPECT_RATIO = 461 / 694;
const EXIT_DURATION = 280;

const SplashScreen: React.FC<SplashScreenProps> = ({
  onFinish,
  duration = 2600,
}) => {
  const insets = useSafeAreaInsets();

  const containerOpacity = useRef(new Animated.Value(1)).current;

  const tagOpacity = useRef(new Animated.Value(0)).current;
  const tagTranslateY = useRef(new Animated.Value(-12)).current;

  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleScale = useRef(new Animated.Value(0.9)).current;

  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleTranslateY = useRef(new Animated.Value(12)).current;

  const buildingOpacity = useRef(new Animated.Value(0)).current;
  const buildingTranslateY = useRef(new Animated.Value(70)).current;
  const buildingScale = useRef(new Animated.Value(0.96)).current;

  useEffect(() => {
    const entrance = Animated.parallel([
      // Building rises smoothly from bottom
      Animated.parallel([
        Animated.timing(buildingOpacity, {
          toValue: 1,
          duration: 650,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(buildingTranslateY, {
          toValue: 0,
          duration: 750,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(buildingScale, {
          toValue: 1,
          duration: 750,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),

      // Staggered brand typography
      Animated.stagger(140, [
        Animated.parallel([
          Animated.timing(tagOpacity, {
            toValue: 1,
            duration: 420,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(tagTranslateY, {
            toValue: 0,
            duration: 420,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(titleOpacity, {
            toValue: 1,
            duration: 480,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.spring(titleScale, {
            toValue: 1,
            friction: 7,
            tension: 65,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(subtitleOpacity, {
            toValue: 1,
            duration: 420,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(subtitleTranslateY, {
            toValue: 0,
            duration: 420,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]);

    entrance.start();

    if (!onFinish) {
      return;
    }

    const fadeStartDelay = Math.max(0, duration - EXIT_DURATION);
    const timer = setTimeout(() => {
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: EXIT_DURATION,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }).start(() => {
        onFinish();
      });
    }, fadeStartDelay);

    return () => clearTimeout(timer);
  }, [
    buildingOpacity,
    buildingScale,
    buildingTranslateY,
    containerOpacity,
    duration,
    onFinish,
    subtitleOpacity,
    subtitleTranslateY,
    tagOpacity,
    tagTranslateY,
    titleOpacity,
    titleScale,
  ]);

  return (
    <Animated.View style={[styles.root, { opacity: containerOpacity }]}>
      <LinearGradient
        colors={['#064D3B', '#085B44', '#0B6E50']}
        locations={[0, 0.45, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.container}
      >
        <StatusBar
          barStyle="light-content"
          {...(Platform.OS === 'android'
            ? { backgroundColor: '#064D3B' }
            : {})}
        />

        {/* Brand Header */}
        <Animated.View
          style={[
            styles.brandContainer,
            { paddingTop: insets.top + hp(10) },
          ]}
        >
          <Animated.Text
            style={[
              styles.brandTag,
              {
                opacity: tagOpacity,
                transform: [{ translateY: tagTranslateY }],
              },
            ]}
          >
            CONEON
          </Animated.Text>

          <Animated.Text
            style={[
              styles.brandTitle,
              {
                opacity: titleOpacity,
                transform: [{ scale: titleScale }],
              },
            ]}
          >
            LOCALLY
          </Animated.Text>

          <Animated.Text
            style={[
              styles.brandSubtitle,
              {
                opacity: subtitleOpacity,
                transform: [{ translateY: subtitleTranslateY }],
              },
            ]}
          >
            Society Management, Simplified
          </Animated.Text>
        </Animated.View>

        {/* Bottom Building Illustration */}
        <Animated.View
          style={[
            styles.buildingWrapper,
            {
              opacity: buildingOpacity,
              transform: [
                { translateY: buildingTranslateY },
                { scale: buildingScale },
              ],
            },
          ]}
        >
          <Image
            source={IMAGES.splashBuilding}
            style={styles.buildingImage}
            resizeMode="contain"
          />
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#064D3B',
  },
  container: {
    flex: 1,
  },
  brandContainer: {
    alignItems: 'center',
    zIndex: 2,
    paddingHorizontal: 24,
  },
  brandTag: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: textScale(21),
    color: '#ECD76D',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  brandTitle: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: textScale(48),
    color: COLORS.white,
    letterSpacing: 2,
    marginTop: vs(2),
    includeFontPadding: false,
  },
  brandSubtitle: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: textScale(13.5),
    color: 'rgba(255, 255, 255, 0.92)',
    letterSpacing: 0.3,
    marginTop: vs(4),
  },
  buildingWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  buildingImage: {
    width,
    height: width / BUILDING_ASPECT_RATIO,
  },
});

export default SplashScreen;
