import React, {useEffect, useLayoutEffect, useState} from 'react'
import {StyleSheet, View, TouchableOpacity, Modal, Image, SafeAreaView, ScrollView} from 'react-native'
import {Text, Button} from 'react-native-elements'
import {auth, db} from '../firebase'
import {StatusBar} from 'expo-status-bar'
import {Feather, FontAwesome5, Entypo, Ionicons} from '@expo/vector-icons'
import CustomListItem from '../components/CustomListItem'
import styled from 'styled-components/native';
// import { ScrollView } from 'react-native-gesture-handler'

const HomeScreen = ({navigation}) => {
  const signOutUser = () => {
    setConfirm(false);
    auth
      .signOut()
      .then(() => navigation.replace('Login'))
      .catch((error) => alert(error.message))
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      // title: 'व्यवहार 📑️',
      headerRight: () => (
        <View style={{marginRight: 20}}>
          <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
            {/* <Text style={{fontWeight: 'bold', color: 'red'}}>Logout</Text> */}
            <View View style={{height: 35, width: 'auto', backgroundColor: '#FAC7FF', borderRadius: 10, padding: 9, marginLeft: 25}}>
              <Feather name='log-out' size={18} color='#000000' />
            </View>
          </TouchableOpacity>
        </View>
      ),
    })
  }, [navigation])

  

  // transactions
  const [transactions, setTransactions] = useState([])
  useEffect(() => {
    const unsubscribe = db
      .collection('expense')
      .orderBy('timestamp', 'desc')
      .onSnapshot(
        (snapshot) =>
          setTransactions(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          ) &
          setTotalIncome(
            snapshot.docs.map((doc) =>
              doc.data()?.email === auth.currentUser.email &&
              doc.data()?.type == 'income'
                ? doc.data().price
                : 0
            )
          ) &
          setTotalExpense(
            snapshot.docs.map((doc) =>
              doc.data()?.email === auth.currentUser.email &&
              doc.data()?.type == 'expense'
                ? doc.data().price
                : 0
            )
          )
      )

    return unsubscribe
  }, [])

  // stufff
  const [totalIncome, setTotalIncome] = useState([])
  const [income, setIncome] = useState(0)
  const [totalExpense, setTotalExpense] = useState([])
  const [expense, setExpense] = useState(0)
  const [totalBalance, setTotalBalance] = useState(0)
  const [confirm, setConfirm] = useState(false)
  const [reset, setReset] = useState(false)
  useEffect(() => {
    if (totalIncome) {
      if (totalIncome?.length == 0) {
        setIncome(0)
      } else {
        setIncome(totalIncome?.reduce((a, b) => Number(a) + Number(b), 0))
      }
    }
    if (totalExpense) {
      if (totalExpense?.length == 0) {
        setExpense(0)
      } else {
        setExpense(totalExpense?.reduce((a, b) => Number(a) + Number(b), 0))
      }
    }
  }, [totalIncome, totalExpense, income, expense])

  useEffect(() => {
    if (income || expense) {
      setTotalBalance(income - expense)
    } else {
      setTotalBalance(0)
    }
  }, [totalIncome, totalExpense, income, expense])

  const [filter, setFilter] = useState([])
  useEffect(() => {
    if (transactions) {
      setFilter(
        transactions.filter(
          (transaction) => transaction.data.email === auth.currentUser.email
        )
      )
    }
  }, [transactions])

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

  const delAll = () => {
    setReset(false);
      db.collection("expense")
     .get()
     .then(res => {
       res.forEach(element => {
         if(element?.data()?.email === auth.currentUser.email){
           element.ref.delete();
         }
         // console.log(element.data());
       });
     })
     .catch((error) => alert(error.message));
  }

  return (
    <>
      {/* <View style={styles.container}> */}
        <StatusBar style='dark' />
        <MainContainer>
        <Modal
            animationType='slide'
            transparent={true}
            visible={confirm}
            onRequestClose={() => {
              alert('Modal has been closed.')
              setConfirm(!confirm)
            }}
          >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Image
                style={{
                  width: '40%',
                  top: '-40%',
                  resizeMode: 'contain'
                }}
                source={require('../assets/alert.png')}
              />
              <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center',top: '-80%', color: '#402243'}}>
                Are you sure you want to log out?
              </Text>
              <View style={{flexDirection: 'row', marginLeft: '10%', marginTop: '-60%' ,marginBottom: '2%'}}>
                <Button
                  buttonStyle={styles.yes}
                  title='No'
                  onPress={() => setConfirm(false)}
                />
                <Button
                  buttonStyle={styles.no}
                  title='Yes'
                  color='#FAC7FF'
                  onPress={signOutUser}
                />
              </View>
            </View>
          </View>
          </Modal>
        <Modal
            animationType='slide'
            transparent={true}
            visible={reset}
            onRequestClose={() => {
              alert('Modal has been closed.')
              setReset(false)
            }}
          >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Image
                style={{
                  width: '40%',
                  top: '-40%',
                  resizeMode: 'contain'
                }}
                source={require('../assets/alert.png')}
              />
              <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center',top: '-80%', color: '#402243'}}>
                Are you sure you want to reset all the Transactions?
              </Text>
              <View style={{flexDirection: 'row', marginLeft: '10%', marginTop: '-60%' ,marginBottom: '2%'}}>
                <Button
                  buttonStyle={styles.yes}
                  title='No'
                  onPress={() => setReset(false)}
                />
                <Button
                  buttonStyle={styles.no}
                  title='Yes'
                  color='#FAC7FF'
                  onPress={delAll}
                />
              </View>
            </View>
          </View>
          </Modal>
          <UpperContainer style={styles.upper}>
            <View style={styles.fullName}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>Welcome 🤟️</Text>
                    <Text style={{fontSize: 24, fontWeight: 'bold', marginTop: '2%', color: '#4A2D5D'}}>
                      {auth.currentUser.displayName}
                    </Text>
                </View>
                <View style={{flex: 1, alignSelf: 'flex-start'}}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => setConfirm(true)}>
                    {/* <Text style={{fontWeight: 'bold', color: 'red'}}>Logout</Text> */}
                    <View View style={{height: 40, width: 40, backgroundColor: '#000000', borderRadius: 10, padding: 9, marginLeft: 25}}>
                      <Feather name='log-out' size={22} color='#FAC7FF' />
                    </View>
                    {/* <View style={{height: 40, width: 40, backgroundColor: '#000000', borderRadius: 10, padding: 9, marginLeft: 25}}>
                      <MaterialIcons name="notifications-on" size={22} color="#FAC7FF" />
                    </View> */}
                  </TouchableOpacity>
                  
                </View>
              </View>

          </UpperContainer>
        <View style={styles.card}>
          <View style={styles.cardTop}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: '#FAC7FF', fontWeight: '700', fontSize: 14 }}>
                Total Balance
              </Text>
              <Text style={{marginLeft: 5, color: '#FAC7FF', fontSize: 20 }}>
                ^
              </Text>
            </View>
            <Text h3 style={{color: 'aliceblue'}}>
              ₹ {totalBalance.toFixed(2)}
            </Text>
          </View>
          <View style={styles.cardBottom}>
            <View style={{marginLeft: '5%'}}>
              <View style={styles.cardBottomSame}>
                <View style={{height: 25, width: 25, backgroundColor: '#FAC7FF', borderRadius: 50, padding: 3.5}}>
                  <Feather name='arrow-down' size={18} color='#402243' />
                </View>
                <Text
                  style={{
                    margin: 5,
                    color: '#FAC7FF'
                  }}
                >
                  Income
                </Text>
              </View>
              <Text h4 style={{color: 'white'}}>
                {`₹ ${income?.toFixed(2)}`}
              </Text>
            </View>
            <View style={{marginLeft: '20%'}}>
              <View style={styles.cardBottomSame}>
                <View style={{height: 25, width: 25, backgroundColor: '#FAC7FF', borderRadius: 50, padding: 3.5}}>
                  <Feather name='arrow-up' size={18} color='#402243' />
                </View>
                <Text
                  style={{
                    margin: 5,
                    color: '#FAC7FF'
                  }}>
                  Expense
                </Text>
              </View>
              <Text h4 style={{color: 'white'}}>
                {`₹ ${expense?.toFixed(2)}`}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.recentTitle}>
          <Text h4 style={{color: '#FFFFFF'}}>
            Recent Transactions
          </Text>
          <View style={{marginLeft: '1%'}}>
            <Entypo name='colours' size={25} color='#FFFFFF' />
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => filter.length > 0 ? setReset(true) : alert("You don't have any Transactions!")
            }
            // onPress={() => delAll()}
            // onPress={() => navigation.navigate('All')}
          >
            <Text style={styles.seeAll}>Reset All</Text>
          </TouchableOpacity>
        </View>
        {filter?.length > 0 ? (
          <SafeAreaView style={styles.containerScroll}>
          <ScrollView>
            {filter?.map((info) => (
              <View key={info.id}>
                <CustomListItem
                  info={info.data}
                  navigation={navigation}
                  id={info.id}
                />
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
        ) : (
          <View style={styles.containerNull}>
          <Ionicons name='ios-wallet' size={24} color='#AAAAAA' />
            <Text h4 style={{color: '#4A2D5D'}}>
              No Transactions
            </Text>
          </View>
        )}
      {/* </View> */}     
        <View style={styles.addButton}>
          <TouchableOpacity
            style={{marginLeft: '-10%'}}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('Home')}
          >
            <Ionicons name='ios-home' size={30} color='#FAC7FF' />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginRight: '-10%'}}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('All')}
          >
            <FontAwesome5 name='clipboard-list' size={30} color='#FAC7FF' />
          </TouchableOpacity>
        </View>
        <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: 'black', alignSelf: 'center', top: '85%', position:'absolute', elevation: 25}}>
          <TouchableOpacity
              style={styles.plusButton}
              onPress={() => navigation.navigate('Add')}
              activeOpacity={0.5}
            >
            <Feather name='plus' size={35} color='#FFFFFF' />
          </TouchableOpacity>
        </View>
      </MainContainer>
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10,
  },
  fullName: {
    flexDirection: 'row',
    flex: 1,
    marginTop: '20%',
    left: '20%'
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
  card: {
    backgroundColor: '#402243',
    width: '85%',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#FAC7FF',
    shadowOffset: {width: 10, height: 15},
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 10,
    marginLeft: '7.5%',
    marginTop: '-20%'
  },
  cardTop: {
    // backgroundColor: 'blue',
    marginBottom: 20,
    alignItems: 'center',
    margin: '4%'
  },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginLeft: '5%',
    marginBottom: '5%'
  },
  cardBottomSame: {
    flexDirection: 'row',
  },
  recentTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    width: '100%',
    margin: '5%'
  },
  recentTransactions: {
    backgroundColor: 'black',
    width: '100%'
  },
  seeAll: {
    fontWeight: 'bold',
    color: '#ECC2FF',
    fontSize: 14,
    marginLeft: '30%'
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    padding: 10,
    height: '8%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
    backgroundColor: '#402243'
  },
  plusButton: {
    backgroundColor: '#D588D7',
    padding: 20,
    height: 75,
    width: 75,
    top: '12%',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 50,
    marginBottom: 5
  },
  containerNull: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    width: '80%',
    height: '30%',
    alignItems: 'center',
    shadowColor: '#FFF',
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
  },
  no: {
    width: '80%',
    backgroundColor: 'green',
    height: 50,
    borderRadius: 20,
    marginTop: '15%',
  },
  yes: {
    width: '80%',
    backgroundColor: 'red',
    height: 50,
    borderRadius: 20,
    marginTop: '15%',
  },
  containerScroll: {
    backgroundColor: 'black',
    padding: 0,
    height: '100%',
    flex: 1
  }
})
