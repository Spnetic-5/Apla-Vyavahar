import {StatusBar} from 'expo-status-bar'
import React, {useLayoutEffect, useState} from 'react'
import {StyleSheet, View, Image, TouchableOpacity,TextInput, Keyboard} from 'react-native'
import {Text} from 'react-native-elements'
import {auth} from '../firebase'

const RegisterScreen = ({navigation}) => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitLoading, setSubmitLoading] = useState(false)

  useLayoutEffect(() => {
    Keyboard.dismiss();
    navigation.setOptions({
      headerBackTitle: 'Back to Login',
    })
  }, [navigation])

  const signUp = () => {
    if (fullName && email && password) {
      setSubmitLoading(true)
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          clearInputFields() &
            authUser.user.updateProfile({
              displayName: fullName
            })
        })
        .catch((err) => alert(err.message) & setSubmitLoading(false))
    } else {
      alert('All fields are mandatory')
      setSubmitLoading(false)
    }
  }
  const clearInputFields = () => {
    alert('Successfully Created Account')
    navigation.replace('Home')
    setSubmitLoading(false)
    setFullName('')
    setEmail('')
    setPassword('')
  }
  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      {/* <Image
        source={{
          uri:
            'https://static-s.aa-cdn.net/img/gp/20600011886807/to-aGJ31KLwqc9AWaBUyL6NLbpFwN9VEliX7nQ_AU48aO4jH6M1MltWKmThWJPndJg=s300?v=1',
        }}
        style={{width: 100, height: 100, marginBottom: 20}}
      /> */}
      <Text style={{fontSize: 24, fontWeight: '900', color: '#FAC7FF'}}> Spend Smarter 😎️</Text>
      <Text style={{fontSize: 24, fontWeight: '400', color: '#FFFFFF'}}>  with  </Text>
      
      <Image
        style={{
          height: 250,
          resizeMode: 'contain'
        }}
        source={require('../assets/icon.png')}
      />
      {/* <Text style={{fontSize: 24, fontWeight: '700', color: '#FAC7FF',}}> आपला व्यवहार 📑️ </Text> */}
      {/* <Text style={{fontSize: 25}}>📑️</Text> */}
      <Text style={{color: '#FAC7FF', marginTop: 25, marginBottom: 50, fontSize: 22, fontWeight: 'bold', padding: 15}}>
        Create an account 📑️
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={{color: '#FFFFFF', fontSize: 18, marginTop: 10}}
          placeholderTextColor={'#FAC7FF'}
          placeholder='Full Name'
          type='text'
          autoFocus
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />
        <TextInput
          style={{color: '#FFFFFF', fontSize: 18, marginTop: 20}}
          placeholderTextColor={'#FAC7FF'}
          placeholder='Email'
          type='text'
          
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={{color: '#FFFFFF', fontSize: 18, marginTop: 20}}
          placeholderTextColor={'#FAC7FF'}
          placeholder='Password'
          type='text'
          
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={{flexDirection: 'row', marginTop: '5%'}}>
        <TouchableOpacity
          style={styles.add}
          loading={submitLoading}
          onPress={signUp}
        > 
        <Text style={{color: '#FAC7FF', paddingHorizontal: 15, paddingVertical: 15, marginLeft: 15, fontSize: 16}}> Register </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancel}
          loading={submitLoading}
          onPress={() => navigation.navigate('Login')}
        > 
        <Text style={{color: '#FAC7FF', paddingHorizontal: 15, paddingVertical: 15, marginLeft: 15, fontSize: 16}}> Cancel </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'black',
  },
  inputContainer: {
    width: 300,
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 20,
    marginTop: '-10%'
  },
  button: {
    width: 300,
    marginTop: 25,
  },
  add: {
    width: 120,
    backgroundColor: '#402243',
    height: 50,
    borderRadius: 20,
  },
  cancel: {
    width: 120,
    backgroundColor: '#000000',
    borderRadius: 20,
    borderColor: '#FAC7FF',
    borderWidth: 1,
    height: 50,
    borderRadius: 20,
    marginLeft: 30
  },
})
