import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ZoomControlProps {
  zoom: number;
  setZoom: (value: number) => void;
}

const ZoomControl: React.FC<ZoomControlProps> = ({ zoom, setZoom }) => {
  const zoomLevels = [
    { label: '1x', value: 0 },
    { label: '2x', value: 0.025 },
    { label: '4x', value: 0.1 },
  ];

  return (
    <View style={styles.zoomControl}>
      {zoomLevels.map((level) => (
        <TouchableOpacity
          key={level.label}
          onPress={() => setZoom(level.value / 2)}
          style={[
            styles.zoomButton,
            zoom === level.value / 2 && styles.selectedZoomButton,
          ]}
        >
          <Text
            style={[
              styles.zoomText,
              zoom === level.value / 2 && styles.selectedZoomText,
            ]}
          >
            {level.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ZoomControl;

const styles = StyleSheet.create({
  zoomControl: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 0,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 110,
    position: 'absolute',
    bottom: 200,
  },
  zoomButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
  },
  selectedZoomButton: {
    backgroundColor: 'white',
    borderRadius: 50,
  },
  zoomText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10
  },
  selectedZoomText: {
    color: 'black',
    fontSize: 12

  },
});
