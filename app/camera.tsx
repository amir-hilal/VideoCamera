import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FlashOff from '../assets/svg/flash-off.svg';
import FlashOn from '../assets/svg/flash-on.svg';
import GridOff from '../assets/svg/grid-off.svg';
import GridOn from '../assets/svg/grid-on.svg';

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, setMediaPermission] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [lastVideoUri, setLastVideoUri] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null
  );
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setMediaPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    if (isRecording) {
      setTimerInterval(
        setInterval(() => setElapsedTime((prev) => prev + 1), 1000)
      );
    } else {
      clearInterval(timerInterval as NodeJS.Timeout);
      setElapsedTime(0);
    }
    return () => clearInterval(timerInterval as NodeJS.Timeout);
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
    setLastVideoUri(null);
    try {
      const video = await cameraRef.current.recordAsync();
      if (video?.uri) {
        setLastVideoUri(video.uri);
      } else {
        Alert.alert('Recording failed.');
      }
    } catch (error) {
      Alert.alert('Recording failed.');
    }
  };

  const stopRecording = () => {
    if (!isRecording) return;
    setIsRecording(false);
    cameraRef.current?.stopRecording();

    if (lastVideoUri) {
      Alert.alert('Save Take?', 'Do you want to save this recording?', [
        { text: 'No', onPress: () => setLastVideoUri(null) },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await MediaLibrary.createAssetAsync(lastVideoUri);
              Alert.alert('Saved!', 'Your recording has been saved.');
            } catch (error) {
              Alert.alert('Save failed', 'Could not save the video.');
            }
          },
        },
      ]);
    } else {
      Alert.alert('Video failed', 'Could not record the video.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Control Section */}
      <View style={styles.topControls}>
        {isRecording ? (
          <View style={styles.recordingIndicator}>
            <Text style={styles.recordingText}>Recording</Text>
            <View style={styles.elapsedTimeBox}>
              <Text style={styles.elapsedTimeText}>
                {`00:${elapsedTime < 10 ? '0' : ''}${elapsedTime}`}
              </Text>
            </View>
          </View>
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
              style={styles.controlButton}
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

      {/* Camera with 9:16 Aspect Ratio */}
      <View style={styles.cameraWrapper}>
        <CameraView
          mode="video"
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
          enableTorch={flash}
          mirror={false}
        >
          {/* Grid Overlay */}
          {gridVisible && <View style={styles.gridOverlay} />}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.sideButton}>
              {lastVideoUri ? (
                <Image
                  source={{ uri: lastVideoUri }}
                  style={styles.thumbnail}
                />
              ) : (
                <View style={styles.emptyThumbnail} />
              )}
            </TouchableOpacity>

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

            <TouchableOpacity
              style={styles.sideButton}
              onPress={toggleCameraFacing}
            >
              <View style={styles.rotateCameraButton}>
                <Image
                  source={require('../assets/images/rotate.png')}
                  style={{ width: 25, height: 25 }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 100,
  },
  controlButton: {
    padding: 20,
    paddingBottom: 0,
  },

  recordingText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  elapsedTimeText: {
    color: 'white',
    width: 80,
    fontSize: 16,
    textAlign: 'center',
  },
  elapsedTimeBox: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 2,
    alignItems: 'center',
    borderRadius: 20,
  },
  cameraWrapper: {
    flex: 1,
    aspectRatio: 9 / 16,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 30,
    width: '100%',
    paddingHorizontal: 20,
  },
  sideButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  emptyThumbnail: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 50,
  },
  rotateCameraButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 50,
    width: 50,
    height: 50,
  },

  recordingIndicator: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 4,
    width: '100%',
    borderRadius: 100,
  },

  recordButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  stopButton: {
    borderColor: 'white',
  },
  recordIcon: {
    width: 25,
    height: 25,
    borderRadius: 30,
    backgroundColor: 'red',
  },
  stopIcon: {
    width: 25,
    height: 25,
    borderRadius: 4,
    backgroundColor: 'black',
  },

  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderColor: 'white',
    borderWidth: 1,
    opacity: 0.3,
    zIndex: 1,
  },
});
