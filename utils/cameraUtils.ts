import { Audio } from 'expo-av';
import * as VideoThumbnails from 'expo-video-thumbnails';

export const calculateDistance = (touches: any[]) => {
  if (touches.length < 2) return 0;
  const [touch1, touch2] = touches;
  const dx = touch1.pageX - touch2.pageX;
  const dy = touch1.pageY - touch2.pageY;
  return Math.hypot(dx, dy);
};

export const generateThumbnail = async (
  videoUri: string
): Promise<string | null> => {
  try {
    const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, {
      time: 1500,
    });
    return uri;
  } catch (error) {
    console.warn('Thumbnail generation failed:', error);
    return null;
  }
};

export const playReadyToRecordAudio = async () => {
  try {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/audio/ready-to-record.mp3')
    );
    await sound.playAsync();

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && !status.isBuffering && status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  } catch (error) {
    console.warn('Failed to play audio:', error);
  }
};
