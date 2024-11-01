import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { RootStackParamList } from './types';
type VideoGalleryRouteProp = RouteProp<RootStackParamList, 'VideoGallery'>;
type VideoGalleryNavigationProp = StackNavigationProp<
  RootStackParamList,
  'VideoGallery'
>;

interface VideoGalleryProps {
  route: VideoGalleryRouteProp;
}
const screenWidth = Dimensions.get('window').width;
const numColumns = 2;
const thumbnailWidth = screenWidth / numColumns - 20;

export default function VideoGallery() {
  const videos = useSelector((state: RootState) => state.videos.videos);
  const thumbnails = useSelector((state: RootState) => state.videos.thumbnails);
  const navigation = useNavigation<VideoGalleryNavigationProp>();

  const previewVideo = (uri: string) => {
    navigation.navigate('VideoPlayer', { uri });
  };

  return (
    <FlatList
      data={videos}
      keyExtractor={(item, index) => index.toString()}
      numColumns={numColumns}
      renderItem={({ item, index }) => (
        <View style={styles.videoThumbnailContainer}>
          <TouchableOpacity onPress={() => previewVideo(item)}>
            <Image
              source={{ uri: thumbnails[index] }}
              style={styles.thumbnail}
            />
          </TouchableOpacity>
        </View>
      )}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    padding: 10,
  },
  videoThumbnailContainer: {
    width: thumbnailWidth,
    height: thumbnailWidth * (16 / 9),
    margin: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
});
