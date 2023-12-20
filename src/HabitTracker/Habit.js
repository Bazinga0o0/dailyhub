import React from 'react'
import { Text, View , TouchableOpacity } from 'react-native'
import { styles } from "../style";

const Habit = (label) => {
    return (
        <View style={styles.habit}>
            <TouchableOpacity style={styles.checkbox}></TouchableOpacity>
            <Text style={styles.fensterContentText}>{label.text}</Text>
        </View>
    )
}




export default Habit;