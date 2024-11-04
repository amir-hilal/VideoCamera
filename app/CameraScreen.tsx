import SaveTakeModal from '@/components/SaveTakeModal ';
import ZoomControl from '@/components/ZoomControl';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import styles from '../assets/styles/CameraScreen.styles';
import FlashOff from '../assets/svg/flash-off.svg';
import FlashOn from '../assets/svg/flash-on.svg';
import GridOff from '../assets/svg/grid-off.svg';
import GridOn from '../assets/svg/grid-on.svg';
import { ElapsedTimeIndicator } from '../components/ElapsedTimeIndicator';
import { RootStackParamList } from '../constants/types';
import { useZoomPanResponder } from '../hooks/useZoomPanResponder';
import { addVideo } from '../store/videoSlice';
import {
  generateThumbnail,
  playReadyToRecordAudio,
} from '../utils/cameraUtils';

type CameraScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CameraScreen'
>;

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, setMediaPermission] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [lastVideoUri, setLastVideoUri] = useState<string | null>(null);
  const [lastVideoThumbnail, setLastVideoThumbnail] = useState<string | null>(
    null
  );
  const [elapsedTime, setElapsedTime] = useState(0);
  const [zoom, setZoom] = useState(0);
  const dispatch = useDispatch();
  const cameraRef = useRef<CameraView>(null);
  const navigation = useNavigation<CameraScreenNavigationProp>();

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setMediaPermission(status === 'granted');
    })();
    playReadyToRecordAudio();
  }, []);

  const panResponder = useZoomPanResponder(zoom, setZoom);

  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(
        () => setElapsedTime((prev) => prev + 1),
        1000
      );
      return () => clearInterval(interval);
    } else {
      setElapsedTime(0);
    }
  }, [isRecording]);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  const toggleCameraFacing = () =>
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  const toggleFlash = () => setFlash(!flash);
  const toggleGrid = () => setGridVisible(!gridVisible);

  const startRecording = async () => {
    if (isRecording || !cameraRef.current) return;
    setIsRecording(true);
    try {
      const video = await cameraRef.current.recordAsync({ mirror: (facing==='front') });
      if (video?.uri) {
        setLastVideoUri(video.uri);
        const thumbnailUri = await generateThumbnail(video.uri);
        setLastVideoThumbnail(thumbnailUri);
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Recording failed.', error);
    } finally {
      setIsRecording(false);
    }
  };

  const handleSave = async () => {
    if (lastVideoUri && lastVideoThumbnail) {
      try {
        await MediaLibrary.createAssetAsync(lastVideoUri);
        dispatch(
          addVideo({ videoUri: lastVideoUri, thumbnailUri: lastVideoThumbnail })
        );
        console.log('Video saved successfully');
      } catch (error) {
        console.error('Save failed', error);
      }
    }
    setModalVisible(false);

    playReadyToRecordAudio();
  };

  const handleDiscard = () => {
    setLastVideoUri(null);
    setLastVideoThumbnail(null);
    setModalVisible(false);
  };

  const stopRecording = () => {
    if (!isRecording) return;
    setIsRecording(false);
    cameraRef.current?.stopRecording();
  };

  const goToGallery = () => navigation.navigate('VideoGallery');

  return (
    <View style={styles.container}>
      <View style={styles.topControls}>
        {isRecording ? (
          <ElapsedTimeIndicator elapsedTime={elapsedTime} />
        ) : (
          <>
            <TouchableOpacity onPress={toggleGrid} style={styles.controlButton}>
              <View>
                {gridVisible ? (
                  <GridOn width={26} height={26} />
                ) : (
                  <GridOff width={26} height={26} />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toggleFlash}
              style={[
                styles.controlButton,
                facing === 'front' && styles.disabledButton,
              ]}
              disabled={facing === 'front'}
            >
              <View>
                {flash ? (
                  <FlashOn width={26} height={26} />
                ) : (
                  <FlashOff width={26} height={26} />
                )}
              </View>
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={styles.cameraWrapper} {...panResponder.panHandlers}>
        <CameraView
          mirror={true}
          mode="video"
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
          enableTorch={flash}
          zoom={zoom}
        >
          {gridVisible && (
            <View style={styles.gridOverlay}>
              <View
                style={[styles.line, styles.horizontalLine, { top: '33.33%' }]}
              />
              <View
                style={[styles.line, styles.horizontalLine, { top: '66.66%' }]}
              />
              <View
                style={[styles.line, styles.verticalLine, { left: '33.33%' }]}
              />
              <View
                style={[styles.line, styles.verticalLine, { left: '66.66%' }]}
              />
            </View>
          )}
          {!modalVisible && (
            <View
              style={[
                styles.buttonContainer,
                isRecording && styles.centeredButtonContainer,
              ]}
            >
              {!isRecording && (
                <TouchableOpacity onPress={goToGallery}>
                  {lastVideoThumbnail ? (
                    <Image
                      source={{ uri: lastVideoThumbnail }}
                      style={styles.thumbnail}
                    />
                  ) : (
                    <View style={styles.emptyThumbnail} />
                  )}
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[styles.recordButton, isRecording && styles.stopButton]}
                onPress={isRecording ? stopRecording : startRecording}
              >
                {isRecording ? (
                  <View style={styles.stopIcon} />
                ) : (
                  <View style={styles.recordIcon} />
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={toggleCameraFacing}>
                {!isRecording && (
                  <View style={styles.rotateCameraButton}>
                    <Image
                      source={require('../assets/images/rotate.png')}
                      style={{ width: 25, height: 25 }}
                    />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          )}
        </CameraView>
        <SaveTakeModal
          visible={modalVisible}
          onYes={handleSave}
          onNo={handleDiscard}
        />

        <View style={styles.zoomControl}>
          {!modalVisible && <ZoomControl zoom={zoom} setZoom={setZoom} />}
        </View>
      </View>
    </View>
  );
}
