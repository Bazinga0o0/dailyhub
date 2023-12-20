import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, Alert } from 'react-native';
import { styles } from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function DayPlannerModal() {
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const [currentDay, setCurrentDay] = useState('Monday');
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const [timeSlots, setTimeSlots] = useState([]);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        // Beim Laden der Komponente Zeitslots aus AsyncStorage abrufen
        loadTimeSlots();
    }, [currentDay]); // Aktualisiere die Zeitslots, wenn sich der Wochentag ändert

    useEffect(() => {
        refreshDay();
    }, [currentDay]);

    const loadTimeSlots = async () => {
        try {
            // Zeitslots aus AsyncStorage abrufen
            const storedTimeSlots = await AsyncStorage.getItem(`${currentDay}_timeSlots`);
            if (storedTimeSlots) {
                console.log(`Gespeicherte Zeitslots für ${currentDay}:`, storedTimeSlots);
                setTimeSlots(JSON.parse(storedTimeSlots));
            }
        } catch (error) {
            console.error(`Fehler beim Laden der Zeitslots für ${currentDay}:`, error);
        }
    };

    const saveTimeSlots = async (newTimeSlots) => {
        try {
            // Zeitslots in AsyncStorage speichern
            await AsyncStorage.setItem(`${currentDay}_timeSlots`, JSON.stringify(newTimeSlots));
            console.log(`Speichern der Zeitslots für ${currentDay} erfolgreich`);
        } catch (error) {
            console.error(`Fehler beim Speichern der Zeitslots für ${currentDay}:`, error);
        }
    };

    const resetTimeSlots = async () => {
        Alert.alert(
            'Löschen bestätigen',
            `Möchten Sie wirklich alle Zeitslots für ${currentDay} löschen?`,
            [
                { text: 'Abbrechen', style: 'cancel' },
                {
                    text: 'Löschen',
                    onPress: async () => {
                        await AsyncStorage.removeItem(`${currentDay}_timeSlots`);
                        setTimeSlots([]);
                        console.log(`Alle Zeitslots für ${currentDay} wurden gelöscht`);
                    },
                },
            ],
            { cancelable: false }
        );
    };
    
    const refreshDay = async () => {
        // Zeitslots für den aktuellen Tag leeren
        setTimeSlots([]);
        // Zeitslots für den aktuellen Tag neu laden
        await loadTimeSlots(currentDay);
    };

    const addTimeSlot = async () => {
        if (startTime && endTime && description) {
            const newTimeSlot = { startTime, endTime, description };
            const newTimeSlots = [...timeSlots, newTimeSlot];
            setStartTime('');
            setEndTime('');
            setDescription('');

            // Zeitslots in AsyncStorage speichern und dann aktualisieren
            await saveTimeSlots(newTimeSlots);
            setTimeSlots(newTimeSlots);
        }
    };

    const switchDay = (increment) => {
        const currentIndex = daysOfWeek.indexOf(currentDay);
        const newIndex = (currentIndex + increment + daysOfWeek.length) % daysOfWeek.length;
        setCurrentDay(daysOfWeek[newIndex]);
    };

    

    return (
        <View style={{ width: '100%' }}>
            <TouchableOpacity style={styles.appButton} onPress={() => toggleModal()}>
                <Text style={{ color: 'black', fontSize: 20, textAlign: 'center', width: '95%', position: 'relative' }}> Day Planner </Text>
            </TouchableOpacity>
            <GestureHandlerRootView style={{flex: 1}}>
            <Modal
                animationType="none"
                transparent={false}
                visible={isModalVisible}
                onRequestClose={toggleModal}
            >
                <View>
                    <Text style={styles.title}>DayPlanner - {currentDay}</Text>
                </View>

                <View style={{height: '20%',}}>
                    <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '80%',
                        marginLeft: '0%',
                        marginTop: '2%',
                        height: '30%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                    }}
                    >
                    <TextInput
                        placeholder="Startzeit"
                        value={startTime}
                        onChangeText={(text) => setStartTime(text)}
                        style={styles.textInputPlanner}

                    />
                    <TextInput
                        placeholder="Endzeit"
                        value={endTime}
                        onChangeText={(text) => setEndTime(text)}
                        style={styles.textInputPlanner}
                    />
                    </View>
                    <View style={{height: '30%'}}>
                    <TextInput
                        placeholder="Beschreibung"
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                        style={styles.textInputPlannerDescription}
                    />
                    </View>
                    <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginLeft: '0%',
                        marginTop: '0%',
                        height: '30%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                    }}
                    >
                    <TouchableOpacity 
                    onPress={() => { addTimeSlot(); refreshDay(); }}
                    style={styles.textInputPlannerButton}
                    >
                        <Text style={{color: 'white'}}>Hinzufügen</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.resetButton} onPress={resetTimeSlots}>
                        <Text style={{ color: 'white' }}>Reset Day</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                <View style={{height: '57%'}}>
                    <ScrollView style={{ height: '60%', overflow: 'hidden', borderColor: 'black', borderWidth: 1, backgroundColor: 'pink'}} contentContainerStyle={{ paddingBottom: '10%' }}>
                        {timeSlots.map((slot, index) => (
                            <View 
                            key={index}
                            style={{
                                
                                width: '80%', 
                                marginLeft: '10%', 
                                marginTop: '2%', 
                                position: 'relative', 
                                borderColor: 'black', 
                                borderWidth: 2, 
                                textAlign: 'center', 
                                alignContent: 'center', 
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                borderRadius: 10,
                            }}>
                                <Text 
                                    style={{ color: 'black', fontSize: 30 }}
                                    key={index}
                                >
                                    {`${slot.startTime} - ${slot.endTime} Uhr: ${slot.description}`}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>     
                <TouchableOpacity style={styles.previousButton} onPress={() => switchDay(-1)}>
                    <Text style={{ color: 'black' }}>Last Day</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.nextButton} onPress={() => switchDay(1)}>
                    <Text style={{ color: 'black' }}>Next Day</Text>
                </TouchableOpacity>

                

                <TouchableOpacity style={styles.buttonZurück} onPress={toggleModal}>
                    <Text style={{ color: 'white' }}>Close</Text>
                </TouchableOpacity>
            </Modal>
            </GestureHandlerRootView>
        </View>
    );
}
