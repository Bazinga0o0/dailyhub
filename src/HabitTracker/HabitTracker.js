// HabitTracker.js

import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Image } from 'react-native';

import { styles } from "../style";

import Habit from './Habit'


export default function Header() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  /*Wie viele der Habits schon erledigt wurden*/
  const progress = 0;

  return (
    <View style={{ width: '100%' }}>
      <TouchableOpacity style={styles.appButton} onPress={() => toggleModal()}>
                <Text style={{ color: 'black', fontSize: 20, textAlign: 'center', width: '95%', position: 'relative' }}> Habit Tracker </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >

        <Text style={styles.title}>Habit Tracker</Text>



        <View style={styles.buttonUp}>
          <Image source={require('./arrow-down.png')} style={{width: 30, height: 30, transform: [{ rotate: '180deg'}]}} />
        </View>







        {/*Großes Fenster in der Mitte wo alles drinsteht*/}
        <View style={styles.fenster}>

          <View style={styles.fensterTop}>
            <Text style={styles.fensterTopText}>01.01.2024</Text>
          </View>
          <View style={styles.fensterContent}>
            <Habit text={'Habit 1'} />
            <Habit text={'Habit 2'} />
            <Habit text={'Habit 3'} />
            <Habit text={'Habit 4'} />

            <View style={styles.progressBar}><View style={styles.progressBarCheck} /></View>
          </View>

        </View>






        <View style={styles.buttonDown}>
          <Image source={require('./arrow-down.png')} style={{width: 30, height: 30,}} />
        </View>




          <TouchableOpacity style={styles.buttonZurück} onPress={toggleModal}>
              <Text style={{color: 'white'}}>Close</Text>
          </TouchableOpacity>


      </Modal>
    </View>
  );
}

/*const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});*/
