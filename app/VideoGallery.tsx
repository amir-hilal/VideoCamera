import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootStackParamList } from './types';

type VideoGalleryRouteProp = RouteProp<RootStackParamList, 'VideoGallery'>;
type VideoGalleryNavigationProp = StackNavigationProp<
  RootStackParamList,
  'VideoGallery'
>;

interface VideoGalleryProps {
  route: VideoGalleryRouteProp;
}
export default function VideoGallery({ route }: VideoGalleryProps) {
  const { videos } = route.params;
  const navigation = useNavigation<VideoGalleryNavigationProp>();

  const previewVideo = (uri: string) => {
    navigation.navigate('VideoPlayer', { uri });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.videoThumbnail}
            onPress={() => previewVideo(item)}
          >
            <Image source={{ uri: item }} style={styles.thumbnail} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  videoThumbnail: {
    marginBottom: 10,
  },
  thumbnail: {
    width: '100%',
    height: 200,
  },
});
