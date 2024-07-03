import { View, Text, StyleSheet, Pressable, Dimensions, Image, Platform } from 'react-native';
import React from 'react';

// get width and height to use in styles
const { width, height } = Dimensions.get('window');

const DifficultySelection = ({ onSelectDifficulty, onBack }) => {
    return (
        <View style={styles.container}>
            {/* Logo above difficulty modes */}
            <View style={styles.logoContainer}>
                <Image
                    source={require('./assets/one_piece_logo.png')}
                    style={styles.logo}
                    resizeMode='contain'
                />
            </View>
            {/* Container for difficulty mode buttons + back button */}
            <View style={styles.overlayContainer}>
                <Text style={styles.title}>Choose Difficulty Level</Text>
                <Pressable style={styles.button} title='Easy' onPress={() => onSelectDifficulty('PvE_Easy')}>
                    <Image source={require('./assets/chopper.png')} style={{ width: 50, height: 50, alignSelf:'center' }} />
                    <Text style={styles.buttonText}>Easy</Text>
                </Pressable>
                <Pressable style={styles.button}  title='Easy' onPress={() => onSelectDifficulty('PvE_Medium')}>
                    <Image source={require('./assets/sanji.png')} style={{ width: 50, height: 50, alignSelf:'center' }} />
                    <Text style={styles.buttonText}>Medium</Text>
                </Pressable>
                <Pressable style={styles.button}  title='Easy' onPress={() => onSelectDifficulty('PvE_Hard')}>
                    <Image source={require('./assets/zoro.png')} style={{ width: 50, height: 50, alignSelf:'center' }} />
                    <Text style={styles.buttonText}>Hard</Text>
                </Pressable>
                <Pressable style={styles.backButton}  title='Back' onPress={onBack}>
                    <Text style={styles.buttonText}>Back</Text>
                    </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Platform.OS === 'web' ? '5%' : 0, // Add padding on web
    },
    logoContainer: {
        flex: 0.5,
        height: height * 0.5, // 50% of screen height
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: width * 0.8, // 80% of screen width
        height: height * 0.3, // 30% of screen height
    },
    overlayContainer: {
        flex: 0.7,
        backgroundColor: '#0549a5',
        borderColor: '#ffb300',
        borderStyle: 'solid',
        borderWidth: 5,
        borderRadius: 10,
        alignSelf: 'center',
        paddingTop: 50,
        paddingBottom: 50,
        marginBottom: 80,
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '87%', // Adjust width to ensure it's contained within the parent
        maxHeight: '80%', // Optional: Adjust max height to ensure it contains the buttons without overflow
    },
    title: {
        color: 'white',
        fontSize: width < 600 ? 20 : 24, // Smaller font size on smaller screens
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
    padding: 10,
    margin: 10, // Adds vertical space between buttons
    backgroundColor: '#00b9ff',
    color: '#ffffff',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    minWidth: '60%', // Ensures buttons have a minimum width but can grow if needed
    minHeight: 40, // Minimum height for touch targets
    },
    backButton: {
        backgroundColor: '#a90000',
        padding: 20,
        marginTop: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});

// export component to use in other files
export default DifficultySelection;