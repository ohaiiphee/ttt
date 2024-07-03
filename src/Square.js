import React from 'react';
import { Pressable, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// define functional component with memo for performance optimization
const Square = React.memo(({ onPress, value }) => (
    <Pressable
        style={styles.square}
        onPress={onPress}
    >
        <Text style={styles.text}>{value}</Text>
    </Pressable>
));

const styles = StyleSheet.create({
    square: {
        position: 'relative',
        backgroundColor: '#ddd',
        width: width / 4.5,
        height: height / 8.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        margin: -2, // negative margin to pull squares closer together
        borderColor: 'black',
        borderWidth: 5,
    },
    text: {
        fontSize: 24,
    },
});

// // export component to use in other files
export default Square;