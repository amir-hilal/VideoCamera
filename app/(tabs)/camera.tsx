import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isRecording, setIsRecording] = useState(false);
  const [lastVideoUri, setLastVideoUri] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => {
    if (isRecording) {
      setTimerInterval(
        setInterval(() => {
          setElapsedTime((prev) => prev + 1);
        }, 1000)
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
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const startRecording = async () => {
    if (isRecording) return;
    setIsRecording(true);
    setLastVideoUri('videoUri');
  };

  const stopRecording = () => {
    setIsRecording(false);
    Alert.alert('Save Take?', 'Do you want to save this recording?', [
      { text: 'No', onPress: () => setLastVideoUri(null) },
      {
        text: 'Yes',
        onPress: async () => {
          if (lastVideoUri) {
            await MediaLibrary.createAssetAsync(lastVideoUri);
            Alert.alert('Saved!', 'Your recording has been saved.');
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        {isRecording && (
          <View style={styles.recordingIndicatorContainer}>
            <View style={styles.recordingIndicator}>
              <Text style={styles.recordingIndicatorText}>
                ● {Math.floor(elapsedTime / 60)}:
                {elapsedTime % 60 < 10 ? '0' : ''}
                {elapsedTime % 60}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.sideButton}>
            {lastVideoUri ? (
              <Image source={{ uri: lastVideoUri }} style={styles.thumbnail} />
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
                source={require('../../assets/images/rotate.png')}
                style={{ width: 25, height: 25 }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
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
  recordingIndicatorContainer: {
    position: 'absolute',
    top: 40,
    width: '100%',
    alignItems: 'center',
    zIndex: 1,
  },
  recordingIndicator: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 4,
    width: 100,
    borderRadius: 100,
  },
  recordingIndicatorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
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
});
