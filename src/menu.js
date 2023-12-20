import React, { useState } from 'react';
import { Button, Image, Text, TouchableOpacity, View, Modal, Dimensions, TextInput, KeyboardAvoidingView } from 'react-native';
import { styles } from "./style";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import { Keyboard } from 'react-native';
export default function MenuModal() {

    const getFontSize = async () => {
        try {
            const storedFontsz = await AsyncStorage.getItem('fontsz');
            setSliderValue(parseInt(storedFontsz));
        } catch (e) {
            setSliderValue(18);
        }
    };
    const [sliderValue, setSliderValue] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const saveName = async () => {
        if (name.length > 10 || name.length < 3) {
            if (name.length == 0){
                try{
                AsyncStorage.setItem('fontsz', Math.floor(sliderValue).toString());
                Keyboard.dismiss();
                console.log("Fontsize saved");
                Alert.alert('Success', 'Fontsize saved successfully'); // Show success message
                } catch (e) {
                    // saving error
                    console.log(e);
                }
           
            }else{
                Alert.alert('Error', 'Name must be less than 10 characters and more than 2 characters');
                Keyboard.dismiss();
            }
        } else {
            try {
                await AsyncStorage.setItem('name', name);
                setName(''); // Clear the TextInput
                Keyboard.dismiss();
                Alert.alert('Success', 'Name saved successfully'); // Show success message
            } catch (e) {
                // saving error
                console.log(e);
            }
        }
    };
    const toggleModal = () => {
        setModalVisible(!modalVisible);
        getFontSize();
    };


    return (
        <View style={{ 
            width: '100%',
            height: '100%',
            }}>
                <View
                style={{
                    zIndex: 1000,
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                }}
                >

  
            <TouchableOpacity
                onPress={toggleModal}
                style={{
                    width: 30,
                    height: 30,
                    backgroundColor: 'transparent',
                    borderRadius: 20,
                    left: "10%",
                    top: "100%",
                    shadowColor: 'black',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    }}
                >
                <Image
                source={require('../assets/settings.png')} // Passe den Pfad entsprechend an
                style={{ width: 30, height: 30, resizeMode: 'contain' }}
                />
            </TouchableOpacity>
            </View>
            
            <Modal  
                animationType="fade"
                transparent={false}
                visible={modalVisible}
                onRequestClose={toggleModal}
            >
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding":"height"} style={{flex:1}}>
                <View style={{backgroundColor:"grey", bottom:"-10%", height:"80%",width:"90%", alignSelf:"center", alignItems:"center"}}> 
                    <TextInput
                        style={{borderBottomWidth:1,height: 40, width:"100%", alignSelf:"center", textAlign:"center", fontSize: 18, fontWeight: 'bold'}}
                        onChangeText={text => setName(text)}
                        value={name}
                        placeholder="Enter your name"
                        placeholderTextColor="#4f4f4fd6"
                    />
                    <View style={{ width:"100%", alignItems:"center",borderBottomWidth:1, padding:5}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>Font Size: {Math.floor(sliderValue)}</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={{fontSize:18, fontWeight:"bold", marginRight:1}}>Adler</Text>
                            <Slider
                                
                                style={{width: 200, height: 40}}
                                minimumValue={14}
                                maximumValue={22}
                                minimumTrackTintColor="#FFFFFF"
                                maximumTrackTintColor="#000000"
                                onValueChange={(value) => setSliderValue(value)}
                            />
                            <Text style={{fontSize:18, fontWeight:"bold"}}>blind?</Text>
                        </View>
                    </View>
                    <Button
                        onPress={saveName}
                        title="OK"
                    />
                </View> 
                <TouchableOpacity
                style={styles.buttonZurück}
                onPress={toggleModal}
                >
                    <Text style={{color: 'white'}}>Close</Text>
                </TouchableOpacity> 
            </KeyboardAvoidingView>

            </Modal>
        </View>
    );
}


