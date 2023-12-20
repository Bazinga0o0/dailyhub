import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 1,
      },
    textOverlay: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(10,10,10,0.5)', // Optional: for better visibility against the image
      },
    box: {
        width: '80%',
        height: 150,
        backgroundColor: 'red',
        alignSelf: 'center',
        borderRadius: 9,
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 50,
        textAlign: 'center',
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

    buttonZurück: {
      position: 'absolute',
      width: 200,
      height: 40,
      backgroundColor: 'black',
      borderRadius: 20,
      alignSelf: 'center',
      bottom: "5%",
      justifyContent: 'center',
      alignItems: 'center',
    },



    buttonUp: {
      position: 'absolute',
      width: 40,
      height: 40,
      backgroundColor: 'transparent',
      alignSelf: 'center',
      borderRadius: 20,
      top: '12%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonDown: {
      position: 'absolute',
      width: 40,
      height: 40,
      backgroundColor: 'transparent',
      alignSelf: 'center',
      borderRadius: 20,
      bottom: '12%',
      alignItems: 'center',
      justifyContent: 'center',
    },
   



    fenster: {
      position: 'absolute',
      backgroundColor: '#EEEEEE',
      width: '80%',
      alignSelf: 'center',
      top: '20%',
      height: '60%',
      borderRadius: 10,
      
    },
    fensterTop: {
      backgroundColor: '#D9D9D9',
      width: '100%',
      height: 50,
      borderRadius: 10,

      justifyContent: 'center',
      alignItems: 'center',
    },
    fensterContent: {
      padding: 20,
    },

    fensterTopText: {
      fontSize: 25,
      
    },
    fensterContentText: {
      fontSize: 25,
    },
    fensterContentTextChecked: {
      fontSize: 25,
      color: '#C5C5C5'
    },

    habit: {
      flexDirection: 'row',
      
      alignItems: 'center',
      marginBottom: 10,
    },

    text: {
      fontSize: 20,
      fontWeight: 'bold',
      
    },

    checkbox: {
      width: 25,
      height: 25,
      backgroundColor: '#D9D9D9',
      borderRadius: 5,

      marginRight: 20,
    },
    checkboxChecked: {
      width: 25,
      height: 25,
      backgroundColor: '#00AE11',
      borderRadius: 5,

      marginRight: 20,
    },

    progressBar: {
      backgroundColor: '#D9D9D9',
      borderRadius: 5,


      height: 10,
      width: '100%',
    },
    progressBarCheck: {
      backgroundColor: '#00AE11',
      borderRadius: 5,
      height: '100%',
      width: '25%',
    },

    taskList: {
      	height: '85%',
    },


    addZeile: {
      flexDirection: 'row',
      justifyContent: 'center'
    },
    textInput: {
      height: 30,
      width: '60%',
      borderRadius: 5,
      backgroundColor: '#d8d8d8',
      marginRight: 20,
    },
    buttonAdd: {
      height: 30,
      width: 30,
      borderRadius: 20,
      backgroundColor: '#d8d8d8',
      marginRight: 10,

      justifyContent: 'center',
      alignItems: 'center',
    },








    appButton: {
      position: 'relative',
      marginTop: '5%',
      width: '75%',
      height: '95%',
      backgroundColor: '#D9D9D9',
      borderRadius: 10,
      marginLeft: '12%',
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      color: 'white',
      justifyContent: 'center',
      alignContent: 'center',
      elevation: 8,
    }, 

    

    nextButton: {
      position: 'absolute',
      bottom: '5%',
      left: '78%',
      width: '18%',
      height: 40,
      backgroundColor: 'white',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'black',
      borderWidth: 3,
    },

    previousButton: {
      position: 'absolute',
      bottom: '5%',
      left: '4%',
      width: '18%',
      height: 40,
      backgroundColor: 'white',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'black',
      borderWidth: 3,
    },
    
    textInputPlanner: {
      height: '80%',
      borderColor: 'black',
      borderWidth: 2,
      width: '44%',
      marginRight: '1%',
      marginLeft: '1%',
      textAlign: 'center',
      borderRadius: 10,
      marginBottom: '1%',
    },

    textInputPlannerDescription: {
      height: '80%',
      borderColor: 'black',
      borderWidth: 2,
      width: '90%',
      marginLeft: '5%',
      textAlign: 'center',
      borderRadius: 10,
      marginBottom: '1%',
    },


    textInputPlannerButton: {
      backgroundColor: 'black',
      width: '55%',
      left: '5%', 
      borderRadius: 10, 
      height: '80%', 
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'absolute',
    },

    resetButton: {
      position: 'absolute',
      backgroundColor: 'black',
      width: '30%',
      right: '5%', 
      borderRadius: 10, 
      height: '80%', 
      justifyContent: 'center', 
      alignItems: 'center'
    },

   
});

export { styles }