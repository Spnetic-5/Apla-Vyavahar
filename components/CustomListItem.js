import React, {useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {ListItem, Text, Divider} from 'react-native-elements'
import {MaterialIcons} from '@expo/vector-icons'
import ModalActions from './ModalActions'

const CustomListItem = ({info, navigation, id}) => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <View>
        <ListItem onPress={() => setModalVisible(true)} containerStyle={{backgroundColor:"black", borderRadius: 20, width: '90%', marginLeft: '5%', marginBottom: '-2%'}}>
          {info.type === 'expense' ? (
            <View style={styles.left}>
              <MaterialIcons name='fastfood' size={24} color='white' />
            </View>
          ) : (
            <View style={styles.income}>
              <MaterialIcons name='comment-bank' size={24} color='white' />
            </View>
          )}
          <ListItem.Content>
            <ListItem.Title
              style={{fontWeight: 'bold', textTransform: 'capitalize', color: 'white'}}
            >
              {info?.text}
            </ListItem.Title>
            <ListItem.Subtitle style={{color: 'white'}}>
              {new Date(info?.timestamp?.toDate()).toUTCString().substring(0,25)}
              {/* {info?.userDate} */}
            </ListItem.Subtitle>
          </ListItem.Content>
          <View>
            {info.type === 'expense' ? (
              <Text style={styles.right}>
                ₹ -{Number(info?.price)?.toFixed(2)}
              </Text>
            ) : (
              <Text style={styles.rightIncome}>
                ₹ {Number(info?.price)?.toFixed(2)}
              </Text>
            )}
          </View>
        </ListItem>
        {/* <Divider style={{backgroundColor: 'lightgrey'}} /> */}
      </View>
      <ModalActions
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={navigation}
        id={id}
      />
    </>
  )
}

export default CustomListItem

const styles = StyleSheet.create({
  left: {
    backgroundColor: '#533461',
    borderRadius: 8,
    padding: 10,
  },

  income: {
    backgroundColor: '#61ACB8',
    borderRadius: 8,
    padding: 10,
  },
  right: {
    fontWeight: 'bold',
    color: 'red',
  },
  rightIncome: {
    fontWeight: 'bold',
    color: 'green',
  },
})
