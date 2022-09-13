import React, {useEffect, useLayoutEffect, useState} from 'react'
import {StyleSheet, View, KeyboardAvoidingView, TouchableOpacity, Image, TextInput} from 'react-native'
import {Text} from 'react-native-elements'
import {StatusBar} from 'expo-status-bar'
import {auth} from '../firebase'

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitLoading, setSubmitLoading] = useState(false)

  const signIn = () => {
    if (email && setEmail) {
      setSubmitLoading(true)
      auth
        .signInWithEmailAndPassword(email, password)
        .then(() => clearInputFields())
        .catch((error) => alert(error.message) & setSubmitLoading(false))
    } else {
      alert('All fields are mandatory')
      setSubmitLoading(false)
    }
  }
  const clearInputFields = () => {
    alert('Successfully Logged in')
    navigation.replace('Home')
    setSubmitLoading(false)
    setEmail('')
    setPassword('')
  }

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace('Home')
        setLoading(false)
      } else {
        setLoading(false)
      }
    })
    return unsubscribe
  }, [])
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Loading...',
    })
    if (!loading) {
      navigation.setOptions({
        title: 'Login',
      })
    }
  }, [navigation, loading])

  return (
    <>
      {!loading ? (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
          <StatusBar style='dark' />
          <Image
            style={{
              height: 500,
              top: '-7%',
              resizeMode: 'contain'
            }}
            source={require('../assets/logo.png')}
          />
          <View style={{alignItems: 'center', top: '-5%'}}>
            <Text style={{fontSize: 24, fontWeight: '700', color: '#FAC7FF',}}> आपला व्यवहार 📑️ </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={{color: '#FFFFFF', fontSize: 18, marginTop: 10, borderWidth: 1, borderRadius: 10, height: 40, padding: 10, borderColor: '#FAC7FF'}}
                type='email'
                placeholder='Email ID'
                placeholderTextColor={'#FAC7FF'}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <TextInput
                type='password'
                style={{color: '#FFFFFF', fontSize: 18, marginTop: 15, marginBottom: 10, borderWidth: 1, borderRadius: 10, height: 40, padding: 10, borderColor: '#FAC7FF'}}
                secureTextEntry
                placeholder='Password'
                placeholderTextColor={'#FAC7FF'}
                value={password}
                onChangeText={(text) => setPassword(text)}
                onSubmitEditing={signIn}
              />
            </View>
            <View style={{flexDirection: 'row', marginTop: '4%'}}>
              <TouchableOpacity
                style={styles.add}
                loading={submitLoading}
                onPress={signIn}
              > 
              <Text style={{color: '#FAC7FF', padding: 15, marginLeft: 15}}> Login </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancel}
                onPress={() => navigation.navigate('Register')}
              >
              <Text style={{color: '#000000', padding: 15, marginLeft: 5}}> Register </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.container}>
          <StatusBar style='light' />
          {/* <Image
            source={{
              uri:
                'https://static-s.aa-cdn.net/img/gp/20600011886807/to-aGJ31KLwqc9AWaBUyL6NLbpFwN9VEliX7nQ_AU48aO4jH6M1MltWKmThWJPndJg=s300?v=1',
            }}
            style={{width: 100, height: 100, marginBottom: 50}}
          /> */}
          <Text h4>Loading...</Text>
        </View>
      )}
    </>
  )
}
export default LoginScreen

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
  },
  add: {
    width: 100,
    backgroundColor: '#402243',
    height: 50,
    borderRadius: 20
  },
  cancel: {
    width: 100,
    backgroundColor: '#FFFFFF',
    height: 50,
    borderRadius: 20,
    borderColor: '#402243',
    borderWidth: 1,
    color: '#402243',
    marginLeft: 50
  },
})
