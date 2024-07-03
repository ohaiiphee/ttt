import React from 'react';
import { View, Text, Pressable, StyleSheet, Modal } from 'react-native';

const ModalComponent = ({ isVisible, message, onClose }) => (
    <Modal
        visible={isVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={onClose}
    >
        <View style={styles.modal}>
            <View style={styles.modalContent}>
                <Text style={styles.modalText}>{message}</Text>
                <Pressable style={styles.closeButton} onPress={onClose}>
                    <Text style={styles.modalButtonText}>Close</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
);

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi transparent background
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: '#0549a5',
        borderColor: '#ffb300',
        borderStyle: 'solid',
        borderWidth: 5,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeButton: {
        backgroundColor: '#00b9ff',
        padding: 10,
        borderRadius: 5,
    },
});

// export component to use in other files
export default ModalComponent;