import {StatusBar} from 'expo-status-bar'
import React, {useLayoutEffect, useState} from 'react'
import {StyleSheet, View, KeyboardAvoidingView, TouchableOpacity, TextInput, Image} from 'react-native'
import {Text, Button} from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker'
import format from 'date-fns/format'
import {Picker} from '@react-native-picker/picker'
import {db, auth} from '../firebase'
import firebase from 'firebase'
import styled from 'styled-components/native';
import {Feather, MaterialIcons, Entypo, Ionicons} from '@expo/vector-icons'

const AddScreen = ({navigation}) => {
  const [submitLoading, setSubmitLoading] = useState(false)
  const [input, setInput] = useState('')
  const [amount, setAmount] = useState('')
  const createExpense = () => {
    if (input && amount && selDate && selectedLanguage && auth) {
      setSubmitLoading(true)
      db.collection('expense')
        .add({
          email: auth.currentUser.email,
          text: input,
          price: amount,
          date: selDate,
          type: selectedLanguage,
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

  const clearInputFields = () => {
    alert('Created Successfully')
    setInput('')
    setAmount('')
    setSelDate(new Date())
    setSelectedLanguage('expense')
    navigation.navigate('Home')
    setSubmitLoading(false)
  }
  // Date Picker
  const [selDate, setSelDate] = useState(new Date())
  const [show, setShow] = useState(false)
  const [mode, setMode] = useState('date')
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
  `;

  const UpperContainer = styled.View`
    background-color: #F9D7FF;
    height: 30%;
    width: 100%;
    border-radius: 10;
  `;

  return (
    <MainContainer>
      <UpperContainer style={styles.upper}>
      </UpperContainer>
      <View style={{flexDirection: 'row', zIndex: 5, marginLeft: '10%', marginTop: '-40%'}}>
      <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="chevron-back" size={25} color="black" />
        </TouchableOpacity>
        
        <Text style={{color: '#000000', fontWeight: 'bold', fontSize: 18, marginLeft: '50%', marginTop: '1%' }}>
          Add Expense
        </Text>
      </View>
      <View style={styles.container}>
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
        <TextInput
            style={styles.inputBox}
            onChangeText={(text) => setInput(text)}
            value={input}
            placeholder="Kaha Udayaa? 😒️"
            placeholderTextColor="#AAAAAA"
          />
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
            placeholder='Kitna Udaya? 🤨️'
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
          <Picker
            style={selectedType=='expense' ? styles.inputBoxTe : styles.inputBoxTi}
            dropdownIconColor={'#000000'}
            selectedValue={selectedType}
            onValueChange={(itemValue, itemIndex) =>
              setSelectType(itemValue)
            }
          >
            <Picker.Item label='Expense' value='expense' />
            <Picker.Item label='Income' value='income' />
          </Picker>
        </View>
      </View>
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
      <Image
        style={{
          flex: 1,
          width: null,
          height: null,
          resizeMode: 'contain'
        }}
        source={require('../assets/uday.png')}
      />
    </MainContainer>
  )
}

export default AddScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
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
    height: 50,
    margin: 12,
    borderRadius: 8,
    borderColor: 'white',
    color: 'red',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#FAC7FF',
  },
  inputBoxTi: {
    height: 50,
    margin: 12,
    borderRadius: 8,
    borderColor: 'white',
    color: 'green',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#FAC7FF'
  },
})
