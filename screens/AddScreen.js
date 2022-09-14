import {StatusBar} from 'expo-status-bar'
import React, {useEffect, useState} from 'react'
import {StyleSheet, View, KeyboardAvoidingView, TouchableOpacity, TextInput, Image, Keyboard} from 'react-native'
import {Text, Button} from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker'
import format from 'date-fns/format'
import {Picker} from '@react-native-picker/picker'
import {db, auth} from '../firebase'
import firebase from 'firebase'
import styled from 'styled-components/native';
import {Feather, Ionicons} from '@expo/vector-icons'

const AddScreen = ({navigation}) => {
  const [submitLoading, setSubmitLoading] = useState(false)
  const [input, setInput] = useState('')
  const [amount, setAmount] = useState('')
  const createExpense = () => {
    if (input && amount && selDate && selectedType && auth) {
      setSubmitLoading(true)
      db.collection('expense')
        .add({
          email: auth.currentUser.email,
          text: input,
          price: amount,
          date: selDate,
          type: selectedType,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          userDate: result,
        })
        .then(() => clearInputFields())
        .catch((error) => alert(error.message))
    } else {
      alert('All fields are mandatory')
      setSubmitLoading(false)
    }
  }

  // Date Picker
  const [selDate, setSelDate] = useState(new Date())
  const [show, setShow] = useState(false)
  const [mode, setMode] = useState('date')
  const [showModal, setShowModal] = useState(false);

  const success = () => {
    setShowModal(false);
    navigation.goBack();
  }

  const clearInputFields = () => {
    // alert('Created Successfully')
    setInput('')
    setAmount('')
    setSelDate(new Date())
    setSelectType('expense')
    Keyboard.dismiss()
    setSubmitLoading(false);
    setShowModal(true);
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    setSelDate(currentDate)
  }
  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }
  const showDatepicker = () => {
    showMode('date')
  }
  const result = format(selDate, 'dd/MM/yyyy')

  // Select Dropdown
  const [selectedType, setSelectType] = useState('expense')

  const MainContainer = styled.View`
    background-color: black;
    height: 100%;
    width: 100%;
    top: -5%;
    zIndex: -5;
  `;

  const UpperContainer = styled.View`
    background-color: #F9D7FF;
    height: 30%;
    width: 100%;
    border-radius: 10;
  `;

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [uday, setUday] = useState(!isKeyboardVisible);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
        setUday(false);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
        setUday(true);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);


  return (
    <>
      <UpperContainer style={styles.upper}>
      </UpperContainer>
      <MainContainer></MainContainer>
      <View 
        style={isKeyboardVisible ? {flexDirection: 'row', zIndex: 5, marginLeft: '10%', marginTop: '-180%'} : {flexDirection: 'row', zIndex: 5, marginLeft: '10%', marginTop: '-255%'}}>
      <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="chevron-back" size={25} color="black" />
        </TouchableOpacity>
        
        <Text style={{color: '#000000', fontWeight: 'bold', fontSize: 18, marginLeft: '22.5%', marginTop: '1%' }}>
          Add Expense
        </Text>
      </View>
      <KeyboardAvoidingView style={styles.container}>
        <StatusBar style='dark' />
        <View style={styles.inputContainer}>
        <Text
          style={{
            color: '#FAC7FF',
            fontSize: 12,
            marginLeft: '5%',
            marginTop: '5%',
          }}
        >
          NAME
        </Text>
        <View style={styles.inputBoxTe}>
        {
            selectedType === 'expense' ? (
              <Picker
              mode={'dropdown'}
              style={{marginLeft: '5%'}}
              dropdownIconColor={'#000000'}
              selectedValue={input}
              onValueChange={(itemValue) =>
                setInput(itemValue)
              }
            >
              <Picker.Item style={{backgroundColor: '#FAC7FF', color:'#402243', fontSize: 18}} label='🧆️ Food' value='🧆️ Food' />
              <Picker.Item style={{backgroundColor: '#FAC7FF', color:'#402243', fontSize: 18}} label='🚂️ Travel' value='🚂️ Travel' />
              <Picker.Item style={{backgroundColor: '#FAC7FF', color:'#402243', fontSize: 18}} label='🗒️ Kirana' value='🗒️ Kirana' />
              <Picker.Item style={{backgroundColor: '#FAC7FF', color:'#402243', fontSize: 18}} label='🛍️ Shopping' value='🛍️ Shopping' />
              <Picker.Item style={{backgroundColor: '#FAC7FF', color:'#402243', fontSize: 18}} label='🎬️ Movie' value='🎬️ Movie' />
              <Picker.Item style={{backgroundColor: '#FAC7FF', color:'#402243', fontSize: 18}} label='📚️ Other' value='📚️ Other' />
            </Picker>
            ) : 
            (
              <Picker
              mode={'dropdown'}
              style={{marginLeft: '5%'}}
              dropdownIconColor={'#000000'}
              selectedValue={input}
              onValueChange={(itemValue) =>
                setInput(itemValue)
              }
            >
              <Picker.Item style={{backgroundColor: '#FAC7FF', color:'#402243', fontSize: 18}} label='💵️ Salary' value='💵️ Salary' />
              <Picker.Item style={{backgroundColor: '#FAC7FF', color:'#402243', fontSize: 18}} label='💰️ Pocket Money' value='💰️ Pocket Money' />
              <Picker.Item style={{backgroundColor: '#FAC7FF', color:'#402243', fontSize: 18}} label='🔁️ Returns' value='🔁️ Returns' />
            </Picker>
            )
          }
        </View>
        {/* <TextInput
            style={styles.inputBox}
            onChangeText={(text) => setInput(text)}
            value={input}
            placeholder={selectedType === 'expense' ? "Kaha Udayaa? 😒️" : "Kahase Kamaya? 😉️"}
            placeholderTextColor="#AAAAAA"
          /> */}
          {show && (
            <DateTimePicker
              testID='dateTimePicker'
              value={selDate}
              mode={mode}
              is24Hour={true}
              display='default'
              onChange={onChange}
            />
          )}
          <Text
            style={{
              color: '#FAC7FF',
              fontSize: 12,
              marginLeft: '5%',
              marginTop: '2%',
            }}
          >
            AMOUNT
          </Text>
          <TextInput
            style={styles.inputBox}
            keyboardType='numeric'
            placeholder={selectedType === 'expense' ? 'Kitna Udaya? 🤨️' : "Kitna Kamaya? 🧐️"}
            placeholderTextColor="#AAAAAA"
            value={amount}
            onChangeText={(text) => setAmount(text)}
          />
          <Text
            style={{
              color: '#FAC7FF',
              fontSize: 12,
              marginLeft: '5%',
              marginTop: '2%',
            }}
          >
            DATE
          </Text>
          <View style={styles.inputBoxC}>
            <Text
            style={{color: 'white'}}
              placeholder='Kab Udaya? 😏️'
              placeholderTextColor="#AAAAAA"
              value={result}
              onPress={showDatepicker}
              // editable={false}
            >
                {result ? result : new Date()}
            </Text>
              <View style={{marginLeft: '90%', marginTop: '-8%'}}>
                <Feather name='calendar' size={18} color='#FAC7FF' />
              </View>
          </View>
          <Text
            style={{
              color: '#FAC7FF',
              fontSize: 12,
              marginLeft: '5%',
              marginTop: '2%',
            }}
          >
            TYPE
          </Text>
          <View style={selectedType=='expense' ? styles.inputBoxTe : styles.inputBoxTi}>
            <Picker
              mode={'dropdown'}
              style={{marginLeft: '5%'}}
              dropdownIconColor={'#000000'}
              selectedValue={selectedType}
              onValueChange={(itemValue, itemIndex) =>
                setSelectType(itemValue)
              }
            >
              <Picker.Item style={{backgroundColor: '#FAC7FF', color:'red'}} label='🔻️ Expense' value='expense' />
              <Picker.Item style={{backgroundColor: '#FAC7FF', color:'green'}} label='💸️ Income' value='income' />
            </Picker>
          </View>
        </View>
      </KeyboardAvoidingView>
      <View style={{flexDirection: 'row', marginLeft: '10%', marginTop: '-2%' ,marginBottom: '2%'}}>
        <Button
          buttonStyle={styles.add}
          title='Add'
          onPress={createExpense}
          loading={submitLoading}
        />
        <Button
          buttonStyle={styles.cancel}
          title='Cancel'
          color='#FAC7FF'
          onPress={() => navigation.navigate('Home')}
        />
      </View>
      {
        selectedType === 'expense' ? (
          <Image
          style={{
            flex: 1,
            width: null,
            height: null,
            resizeMode: 'contain'
          }}
          source={require('../assets/uday.png')}
        />
        ) : (
          <Image
          style={{
            flex: 1,
            width: 275,
            borderRadius: 20,
            height: 175,
            alignSelf: 'center'
            // resizeMode: 'contain'
          }}
          source={require('../assets/phir.jpg')}
        />
        )
      }
      {
        showModal && (
          <View style={{ top: '-50%', left: '10%', zIndex: 5, width: '80%', height: '60%', backgroundColor: 'white', borderRadius: 25}}>
          <Image
              style={{
                // flex: 1,
                borderRadius: 20,
                width: '100%',
                resizeMode: 'contain'
              }}
              source={require('../assets/greenbg.png')}
            />
            <Image
              style={{
                // flex: 1,
                borderRadius: 20,
                width: '50%',
                height: '25%',
                alignSelf: 'center',
                resizeMode: 'contain',
                marginTop: '-125%',
                zIndex: 5
              }}
              source={require('../assets/check.png')}
            />
            <Text style={{fontSize: 20, fontWeight: 'bold', alignSelf: 'center', top: '25%', color: '#402243'}}>
              Woo Hoo! 🥳️
            </Text>
            <Text style={{fontSize: 16, fontWeight: 'bold', alignSelf: 'center', top: '25%', color: '#646279'}}>
              Transaction added successfully!
            </Text>
            <Button
              buttonStyle={styles.thank}
              title='Thanks'
              onPress={() => success()}
              loading={submitLoading}
            />
          </View>
        )
      }
    </>
  )
}

export default AddScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#402243',
    width: '85%',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#FAC7FF',
    shadowOffset: {width: 10, height: 15},
    shadowOpacity: 0.20,
    shadowRadius: 2,
    elevation: 5,
    marginLeft: '7.5%',
    marginTop: '10%'
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // padding: 10,
  },
  upper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '120%',
    marginLeft: '-10%',
    marginTop: '-5%', 
    margin: 'auto',
    borderRadius: 100,
    zIndex: -1
  },
  inputContainer: {
    width: '92%',
    marginLeft: '4%'
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  add: {
    width: '80%',
    backgroundColor: '#402243',
    height: 50,
    borderRadius: 20,
    marginTop: '15%',
  },
  cancel: {
    width: '80%',
    backgroundColor: '#000000',
    height: 50,
    borderRadius: 20,
    borderColor: '#FAC7FF',
    borderWidth: 1,
    marginTop: '15%'
  },
  inputBox: {
    height: 50,
    margin: 12,
    borderRadius: 8,
    borderColor: 'white',
    color: 'white',
    borderWidth: 1,
    padding: 10,
  },
  inputBoxC: {
    height: 40,
    margin: 12,
    borderRadius: 8,
    borderColor: 'white',
    color: 'white',
    borderWidth: 1,
    padding: 10,
    fontSize: 14
  },
  inputBoxTe: {
    borderRadius: 10, 
    borderWidth: 1,  
    overflow: 'hidden',
    margin: 12,
    fontWeight: 'bold',
    borderRadius: 8,
    borderColor: '#402243',
    color: 'red',
    borderWidth: 1,
    backgroundColor: '#FAC7FF',
  },
  inputBoxTi: {
    borderRadius: 10, 
    borderWidth: 1,  
    overflow: 'hidden',
    margin: 12,
    fontWeight: 'bold',
    borderRadius: 8,
    borderColor: '#402243',
    color: 'green',
    borderWidth: 1,
    backgroundColor: '#FAC7FF'
  },
  thank: {
    width: '40%',
    backgroundColor: '#402243',
    height: 50,
    borderRadius: 20,
    zIndex: 10,
    marginTop: '45%',
    alignSelf: 'center'
  },
})








