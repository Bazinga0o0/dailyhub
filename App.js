import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Modal, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
//import NewsModal from './src/News';
//import ChatModal from './src/chat';
import HabitTracker from "./src/HabitTracker/HabitTracker";
import MenuModal from './src/menu';
import TodoListModal from './src/TodoList/TodoList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DayPlannerModal from './src/dayplanner';


const getMarkedDates = async () => {
  try {
    const eventData = await AsyncStorage.getItem('events');
    const events = eventData ? JSON.parse(eventData) : {};

    const markedDates = {};
    Object.keys(events).forEach((date) => {
      markedDates[date] = { marked: true };
    });

    return markedDates;
  } catch (e) {
    console.log(e, "Fehler beim Abrufen der Termine für die Markierung");
    return {};
  }
};

const Start = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const [eventName, setEventName] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    getMarkedDates().then((result) => {
      setMarkedDates(result);
    });
  }, []);

  const storeData = async (date, eventData) => {
    try {
      const existingData = await AsyncStorage.getItem('events');
      const events = existingData ? JSON.parse(existingData) : {};

      events[date] = eventData;

      await AsyncStorage.setItem('events', JSON.stringify(events));

      console.log("Termin gespeichert");
    } catch (e) {
      console.log(e, "Fehler beim Speichern des Termins");
    }
  };

  const onDayPress = async (day) => {
    setSelectedDate(day.dateString);

    try {
      const eventData = await AsyncStorage.getItem('events');
      const events = eventData ? JSON.parse(eventData) : {};

      if (events[day.dateString]) {
        const selectedEvent = events[day.dateString];
        setSelectedEvent(selectedEvent);
      } else {
        setEventName('');
        setEventTime('');
        setSelectedEvent(null);
        storeData(day.dateString, { name: '', time: '' });
      }
    } catch (e) {
      console.log(e, "Fehler beim Abrufen der Termine");
    }

    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  

  const handleDeleteEvent = async () => {
    try {
      const eventData = await AsyncStorage.getItem('events');
      const events = eventData ? JSON.parse(eventData) : {};

      delete events[selectedDate];

      await AsyncStorage.setItem('events', JSON.stringify(events));

      const updatedMarkedDates = await getMarkedDates();
      setMarkedDates(updatedMarkedDates);

      alert('Termin gelöscht');
      setModalVisible(false);
    } catch (e) {
      console.log(e, 'Fehler beim Löschen des Termins');
    }
  };

  const handleAddEvent = async () => {
    try {
      const eventData = await AsyncStorage.getItem('events');
      const events = eventData ? JSON.parse(eventData) : {};
  
      if (!validateTime(eventTime)) {
        alert('Ungültiges Zeitformat (hh:mm)');
        return;
      }
  
      events[selectedDate] = { name: eventName, time: eventTime };
  
      await AsyncStorage.setItem('events', JSON.stringify(events));
  
      const updatedMarkedDates = await getMarkedDates();
      setMarkedDates(updatedMarkedDates);
  
      alert('Termin hinzugefügt');
      setModalVisible(false);
    } catch (e) {
      console.log(e, 'Fehler beim Hinzufügen des Termins');
    }
  };
  
  const validateTime = (text) => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)?$/; // Regex für hh:mm
    return timeRegex.test(text);
  };
  
  
  

  return (
    <View style={styles.container}>
      <View
        style={{
          zIndex: 1000,
          position: 'absolute',
          top: '5%',
          left: '3%',
        }}
      >
        <MenuModal />
      </View>
      <View
        style={{
          zIndex: 1000,
          position: 'absolute',
          top: '5%',
          right: '4%',
        }}
      >
       {// <ChatModal />}
}
      </View>

      

      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          marginTop: 70,
          textAlign: 'center',
        }}
      >
        Willkommen zurück, Kollege!!!test
      </Text>
      
      
      
      <View
        style={{
          width: '100%',
          height: '40%',
        }}
      >
        <Calendar
          onDayPress={onDayPress}
          markedDates={markedDates}
          hideExtraDays={false}
          pagingEnabled={true}
          hideDayNames={false}
          showWeekNumbers={false}
          hideArrows={true}
          enableSwipeMonths={true}
          firstDay={1}
          style={{
            width: '90%',
            marginLeft: '5%',
            height: '100%',
            marginTop: 20,
            dayComponent: {
              marginTop: 2,
            },
          }}
          theme={{
            textSectionTitleColor: '#b6c1cd',
            selectedDayTextColor: '#ffffff',
            todayTextColor: 'white',
            todayBackgroundColor: 'black',
            dayTextColor: '#2d4150',
            selectedDayBackgroundColor: '#00adf5',
            dotColor: 'black',
            todayDotColor: 'white',
          }}
        />
      </View>
      
      
      {/* Dieser View ist für die obere Hälfte der 4 HomeScreenButtons */}
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          marginTop: '5%',
          height: '10%',
          
        }}
      > 
      <View style={{ width: '50%' }}>
        <TodoListModal />

      </View>
      <View style={{ width: '50%' }}>
        <HabitTracker /> 

      </View>
      </View>
      
      {/* Dieser View ist für die untere Hälfte der 4 HomeScreenButtons */}
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          marginTop: 20,
          height: '10%',
        }}
      >
      <View style={{ width: '50%' }}>
        
      </View>
      <View style={{ width: '50%' }}>
        <DayPlannerModal />

      </View>
      </View>
      
      
      {/* Dieser View ist für die News Modal */}
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          marginTop: 20,
          height: '5%',
        }}
      >
        {//<NewsModal />
}
      </View>




      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{selectedDate}</Text>
          {selectedEvent && (
            <ScrollView>
              <Text style={styles.eventtext}>Name: {selectedEvent.name}</Text>
              <Text style={styles.eventtext}>Time: {selectedEvent.time}</Text>
            </ScrollView>
          )}
          <TextInput
            style={styles.input}
            placeholder="Please enter Event Name"
            value={eventName}
            onChangeText={(text) => setEventName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Please enter time (hh:mm)"
            value={eventTime}
            onChangeText={(text) => setEventTime(text)}
          />
          {/*<DropDownPicker
            items={[
              { label: 'Option 1', value: 'option1' },
              { label: 'Option 2', value: 'option2' },
              { label: 'Option 3', value: 'option3' },
            ]}
            defaultValue={selectedValue}
            containerStyle={{ height: 100 }}
            onChangeItem={(item) => setEventTime(item)}
            
          />*/}
          <TouchableOpacity onPress={handleAddEvent} style={styles.addButton}>
            <Text style={styles.buttonText}>add event</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteEvent} style={styles.deleteButton}>
            <Text style={styles.buttonText}>delete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.buttonText}>close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top',
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 60,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  eventtext: {
    color: 'white',
    marginTop: 40,
    fontSize: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  topButton: {
    marginTop: '5%',
    width: '40%',
    height: '100%',
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    marginLeft: '7%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    color: 'white',
  },
});

export default Start;
