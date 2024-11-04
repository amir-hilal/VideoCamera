import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SaveTakeModalProps {
  visible: boolean;
  onYes: () => void;
  onNo: () => void;
}

const SaveTakeModal: React.FC<SaveTakeModalProps> = ({
  visible,
  onYes,
  onNo,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Save Take?</Text>
          <Text style={styles.modalSubtitle}>
            Select “YES” to save, “NO” to discard...
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onYes} style={styles.modalButton}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onNo} style={styles.modalButton}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SaveTakeModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 10,
    color: 'white',
  },
  modalSubtitle: {
    fontSize: 15,
    fontWeight: '400',
    color: 'white',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
});
