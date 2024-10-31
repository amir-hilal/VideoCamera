import { useState } from 'react';
import { PanResponder } from 'react-native';
import { calculateDistance } from '../app/Camera/cameraUtils';

export const useZoomPanResponder = (
  zoom: number,
  setZoom: (value: number) => void
) => {
  const [lastDistance, setLastDistance] = useState(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      const { touches } = evt.nativeEvent;
      if (touches.length === 2) {
        setLastDistance(calculateDistance(touches));
      }
    },
    onPanResponderMove: (evt) => {
      const { touches } = evt.nativeEvent;
      if (touches.length === 2) {
        const currentDistance = calculateDistance(touches);
        const distanceDelta = currentDistance - lastDistance;

        if (Math.abs(distanceDelta) > 10) {
          const newZoom =
            distanceDelta > 0
              ? Math.min(1, zoom + 0.001)
              : Math.max(0, zoom - 0.001);

          setZoom(newZoom);
          setLastDistance(currentDistance);
        }
      }
    },
  });

  return panResponder;
};
