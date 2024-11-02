import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    alignItems: 'center',
  },
  message: {
    color:'white',
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
    fontSize: 15,
    fontWeight: '400',
    marginRight: 10,
  },
  elapsedTimeText: {
    color: 'white',
    fontWeight: '700',
    width: 70,
    fontSize: 14,
    textAlign: 'center',
  },
  elapsedTimeBox: {
    backgroundColor: 'rgba(255, 62, 62, 1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignItems: 'center',
    borderRadius: 20,
  },
  cameraWrapper: {
    flex: 1,
    aspectRatio: 9 / 16,
    overflow: 'hidden',
  },
  zoomControl: {
    width: '100%',
    alignItems: 'center',
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
    zIndex: 2,
  },
  centeredButtonContainer: {
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
  disabledButton: {
    opacity: 0.4,
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  line: {
    position: 'absolute',
    backgroundColor: 'white',
    opacity: 0.4,
  },
  horizontalLine: {
    height: 1,
    width: '100%',
  },
  verticalLine: {
    width: 1,
    height: '100%',
  },
});
