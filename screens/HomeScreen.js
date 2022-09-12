import React, {useEffect, useLayoutEffect, useState, useRef} from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {Text, Avatar, ListItem} from 'react-native-elements'
import {auth, db} from '../firebase'
import {StatusBar} from 'expo-status-bar'
import {AntDesign, Feather, MaterialIcons, FontAwesome5, Ionicons} from '@expo/vector-icons'
import CustomListItem from '../components/CustomListItem'
import styled from 'styled-components/native';

import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';

const HomeScreen = ({navigation}) => {
  const signOutUser = () => {
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

  return (
    <>
      {/* <View style={styles.container}> */}
        <StatusBar style='dark' />
        <MainContainer>
          <UpperContainer style={styles.upper}>
            <View style={styles.fullName}>
                <View style={{marginLeft: 10, top: '15%', flexDirection: 'column'}}>
                  <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: '10%'}}>Welcome 🤟️</Text>
                    <Text style={{fontSize: 24, fontWeight: 'bold', marginTop: '2%', color: '#4A2D5D'}}>
                      {auth.currentUser.displayName}
                    </Text>
                </View>
                <View style={{top:'25%'}}>
                  <View View style={{height: 40, width: 40, backgroundColor: '#000000', borderRadius: 10, padding: 9, marginLeft: 25}}>
                    <MaterialIcons name="notifications-on" size={22} color="#FAC7FF" />
                    {/* <Feather name='bell' size={18} color='#FAC7FF' /> */}
                  </View>
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
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('All')}
          >
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {filter?.length > 0 ? (
          <View style={styles.recentTransactions}>
            {filter?.slice(0, 2).map((info) => (
              <View key={info.id} >
                <CustomListItem
                  info={info.data}
                  navigation={navigation}
                  id={info.id}
                />
              </View>
            ))}
          </View>
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
            <Ionicons name='ios-wallet' size={30} color='#FAC7FF' />
          </TouchableOpacity>
        </View>
        <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: 'black', alignSelf: 'center', top: '15%', elevation: 10}}>
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
    marginTop: '4%'
  },
  upper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '120%',
    marginLeft: '-10%',
    marginTop: '-5%', 
    margin: 'auto',
    borderRadius: 100,
  //   borderBottomLeftRadius: 2,
  //   borderBottonRightRadius: 2,
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
    // marginVertical: 20,2
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
    justifyContent: 'space-between',
    width: '100%',
    margin: '5%'
  },
  recentTransactions: {
    backgroundColor: 'black',
    width: '100%',
  },
  seeAll: {
    fontWeight: 'bold',
    color: '#ECC2FF',
    fontSize: 14,
    marginLeft: -80
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
    top: '15%',
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
})
