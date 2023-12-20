import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native';
import { styles } from "../style";
import Task from './Task';
import { ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function TodoListModal() {
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const [task, setTask] = useState('');
    const [taskItems, setTaskItems] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    const handleAddTask = () => {
        setTaskItems([...taskItems, task]);
        setTask('');
    };

    const checkTask = (index) => {
        let itemsCopy = [...taskItems];
        let completedCopy = [...completedTasks];
        
        const taskToToggle = itemsCopy[index];
    
        // Überprüfen, ob die ausgewählte Aufgabe abgeschlossen ist
        const isCompleted = completedCopy.includes(taskToToggle);
    
        if (isCompleted) {
            // Wenn abgeschlossen, von abgeschlossen zu nicht abgeschlossen verschieben
            completedCopy = completedCopy.filter(item => item !== taskToToggle);
            itemsCopy.push(taskToToggle);
        } else {
            // Wenn nicht abgeschlossen, von nicht abgeschlossen zu abgeschlossen verschieben
            itemsCopy = itemsCopy.filter(item => item !== taskToToggle);
            completedCopy.push(taskToToggle);
        }
    
        setTaskItems(itemsCopy);
        setCompletedTasks(completedCopy);
    };
    

    const reloadTasks = () => {
        setCompletedTasks([]);
    }

    return (
        <View style={{ width: '100%' }}>
            <TouchableOpacity style={styles.appButton} onPress={toggleModal}>
                <Text style={{ color: 'black', fontSize: 20, textAlign: 'center', width: "95%", position: 'relative' }}> Todo-List </Text>
            </TouchableOpacity>
            <GestureHandlerRootView>
            <Modal
                animationType="slide"
                transparent={false}
                visible={isModalVisible}
                onRequestClose={toggleModal}
            >
                <View>
                    <Text style={styles.title}>Todo-List</Text>
                </View>
                <View style={styles.fenster}>
                    <View style={styles.fensterTop}>
                        <Text style={styles.fensterTopText}>List 1</Text>
                    </View>
                    <View style={styles.fensterContent}>

                        <ScrollView style={styles.taskList}>
                        {
                            taskItems.map((item, index) => (
                                <TouchableOpacity key={index} onPress={() => checkTask(index)}>
                                    <Task text={item} completed={false} />
                                </TouchableOpacity>
                            ))
                        }
                        {
                            completedTasks.map((item, index) => (
                                <TouchableOpacity key={index} onPress={() => checkTask(index)}>
                                    <Task key={index} text={item} completed={true} />
                                </TouchableOpacity>
                            ))
                        }
                        </ScrollView>

                        <View style={styles.addZeile}>
                            <TextInput style={styles.textInput} placeholder={'Task hinzufügen'} value={task} onChangeText={text => setTask(text)} />
                            <TouchableOpacity style={styles.buttonAdd} onPress={() => handleAddTask()}>
                                <Text>+</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonAdd} onPress={() => reloadTasks()}>
                                <Text>⟳</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.buttonZurück} onPress={toggleModal}>
                    <Text style={{ color: 'white' }}>Close</Text>
                </TouchableOpacity>
            </Modal>
            </GestureHandlerRootView>
        </View>
    )
}
