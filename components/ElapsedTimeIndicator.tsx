import React from 'react';
import { Text, View } from 'react-native';
import styles from '../app/CameraScreen.styles';

interface ElapsedTimeIndicatorProps {
  elapsedTime: number;
}

export const ElapsedTimeIndicator: React.FC<ElapsedTimeIndicatorProps> = ({
  elapsedTime,
}) => (
  <View style={styles.recordingIndicator}>
    <Text style={styles.recordingText}>Recording</Text>
    <View style={styles.elapsedTimeBox}>
      <Text style={styles.elapsedTimeText}>
        {`00:${elapsedTime < 10 ? '0' : ''}${elapsedTime}`}
      </Text>
    </View>
  </View>
);
