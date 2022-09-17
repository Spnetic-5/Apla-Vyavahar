import React, {useEffect, useLayoutEffect, useState} from 'react'
import {ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import CustomListItem from '../components/CustomListItem'
import {db, auth} from '../firebase'
import {Text} from 'react-native-elements'
import {FontAwesome5, Ionicons} from '@expo/vector-icons'
import styled from 'styled-components/native';

const AllTransactions = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'All Transactions',
    })
  }, [])
  const [transactions, setTransactions] = useState([])
  useEffect(() => {
    const unsubscribe = db
      .collection('expense')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setTransactions(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      )

    return unsubscribe
  }, [])
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
    background-color: 'black';
    height: 100%;
    width: 100%;
    zIndex: -5;
  `;

  const UpperContainer = styled.View`
    background-color: #F9D7FF;
    height: 20%;
    width: 100%;
    border-radius: 20;
    zIndex: 5;
  `;

  return (
    <MainContainer>
       <UpperContainer>
      </UpperContainer>
      <View 
      style={{flexDirection: 'row', marginLeft: '10%', marginTop: '-20%', zIndex: 5}}>
      <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="chevron-back" size={25} color="black" />
        </TouchableOpacity>

        <Text style={{color: '#000000', fontWeight: 'bold', fontSize: 18, marginLeft: '22.5%' }}>
          All Transactions
        </Text>
      </View>
      {filter?.length > 0 ? (
        <SafeAreaView style={styles.container}>
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
          <FontAwesome5 name='list-alt' size={24} color='#EF8A76' />
          <Text h4 style={{color: '#4A2D5D'}}>
            No Transactions
          </Text>
        </View>
      )}
    </MainContainer>
  )
}

export default AllTransactions

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    padding: 0,
    marginTop: '10%',
    height: '100%',
    flex: 1
  },
  containerNull: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
