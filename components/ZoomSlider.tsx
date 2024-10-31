import React from 'react';
import { View, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

interface ZoomSliderProps {
  zoom: number;
  onZoomChange: (value: number) => void;
}

const ZoomSlider: React.FC<ZoomSliderProps> = ({ zoom, onZoomChange }) => {
  return (
    <View style={styles.sliderContainer}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={.1}
        value={zoom}
        onValueChange={onZoomChange}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    position: 'absolute',
    bottom: 100,
    width: '80%',
    alignSelf: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
});

export default ZoomSlider;
