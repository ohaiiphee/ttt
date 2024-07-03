import React from 'react';
import { View, StyleSheet, Image, Text, Pressable, Dimensions, Platform } from 'react-native';

// get width and height to use in styles
const { width, height } = Dimensions.get('window');

const ModeSelection = ({ onSelectMode }) => {
    return (
        <View style={styles.container}>
            {/* Logo-Button */}
            <View style={styles.logoContainer}>
                <Image
                    source={require('./assets/one_piece_logo.png')}
                    style={styles.logo}
                    resizeMode='contain'
                />
            </View>
            {/* Overlay Container with Game Modes */}
            <View style={styles.overlayContainer}>
                <Text style={styles.title}>Choose Game Mode</Text>
                <View>
                    <Pressable style={styles.button} title='Player vs Player' onPress={() => onSelectMode('PvP')}>
                        <Text style={styles.buttonText}>Player vs Player</Text>
                    </Pressable>
                </View>
                <View>
                    <Pressable style={styles.button} title='Player vs Computer' onPress={() => onSelectMode('PvE')}>
                        <Text style={styles.buttonText}>Player vs Computer</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Platform.OS === 'web' ? '5%' : 0, // Add padding on web
    },
    logoContainer: {
        flexShrink: 1,
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    logo: {
        width: width * 0.8, // 80% of screen width
        height: height * 0.3, // 30% of screen height
    },
    overlayContainer: {
        backgroundColor: '#0549a5',
        padding: 30,
        borderColor: '#ffb300',
        borderStyle: 'solid',
        borderWidth: 5,
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: width < 600 ? 20 : 24, // Smaller font size on smaller screens
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        marginBottom: 20, // Add space between buttons
        backgroundColor: '#00b9ff',
        padding: 30,
        marginVertical: 10,
        borderRadius: 5,        
    },
    buttonText: {
        color: 'white',
        fontSize: 22,
    },
});

// export component to use in other files
export default ModeSelection;