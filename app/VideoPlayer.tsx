import { RouteProp } from '@react-navigation/native';
import { ResizeMode, Video } from 'expo-av';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../constants/types';

type VideoPlayerRouteProp = RouteProp<RootStackParamList, 'VideoPlayer'>;

interface VideoPlayerProps {
  route: VideoPlayerRouteProp;
}

export default function VideoPlayer({ route }: VideoPlayerProps) {
  const { uri } = route.params;

  return (
    <View style={styles.container}>
      <Video
        source={{ uri }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay
        style={styles.video}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});
