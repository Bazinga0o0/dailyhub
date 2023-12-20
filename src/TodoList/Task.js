import React from 'react';
import { Text, View } from 'react-native';
import { styles } from "../style";

const Task = ({ text, completed }) => {
    return (
        <View style={styles.habit}>
            <View style={completed? styles.checkboxChecked:  styles.checkbox}></View>
            <Text style={completed? styles.fensterContentTextChecked: styles.fensterContentText}>{text}</Text>
        </View>
    )
}

export default Task;
