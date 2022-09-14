import React, {useEffect, useState} from 'react'
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  Image
} from 'react-native'
import {Button} from 'react-native-elements'
import {Entypo} from '@expo/vector-icons'
import {db} from '../firebase'

const ModalActions = ({modalVisible, setModalVisible, navigation, id}) => {
  const [deleteModal , setDeleteModal] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false)
  const del = () => {
    db.collection('expense')
    .doc(id)
    .delete()
    .catch((error) => alert(error.message));  
  }
  const deleteExpense = () => {
    setSubmitLoading(true)
    setTimeout(() => {
      del()
      }, 3000);
    clearInputFields();
  }

  const clearInputFields = () => {
    setModalVisible(false);
    setSubmitLoading(false);
    setDeleteModal(true);
  }

  return (
    <>
      {
        deleteModal && (
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
            <Text style={{fontSize: 20, fontWeight: 'bold', alignSelf: 'center', top: '40%', color: '#8B0000'}}>
              Oops...!!! 😏️
            </Text>
            <Text style={{fontSize: 16, fontWeight: 'bold', alignSelf: 'center', top: '40%', color: '#646279'}}>
              Transaction deleted successfully! 
            </Text>
            <Button
              buttonStyle={styles.thank}
              title='Thanks'
              onPress={() => setDeleteModal(false)}
              loading={submitLoading}
            />
          </View>
        )
      }
      <View style={styles.centeredView}>
        <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.')
            setModalVisible(!modalVisible)
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.closeIcon}>
                <Pressable
                  style={[styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <View style={{height: 40, width: 40, backgroundColor: '#000000', borderRadius: 20, padding: 5}}>
                    <Entypo name='cross' size={30} color='#FFFFFF' />
                  </View>
                </Pressable>
              </View>
              <View style={styles.handleIcons}>
                <TouchableOpacity activeOpacity={0.5} style={styles.pencil}>
                  <View style={{flexDirection: 'row'}}>
                    <Entypo
                      name='pencil'
                      size={40}
                      color='#013220'
                      onPress={() =>
                        navigation.navigate('Update', {
                          itemId: id,
                        }) & setModalVisible(!modalVisible)
                      }
                    />
                    <Text 
                      onPress={() =>
                      navigation.navigate('Update', {
                        itemId: id,
                      }) & setModalVisible(!modalVisible)
                      } 
                      style={{color: '#013220', fontSize: 20, fontWeight: '900', padding: 7}}
                    > Edit </Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} style={styles.trash}>
                  <View style={{flexDirection: 'row'}}>
                    <Entypo
                      name='trash'
                      onPress={() => deleteExpense()}
                      size={40}
                      color='#8B0000'
                    />
                    <Text 
                      onPress={() => deleteExpense()}
                      style={{color: '#8B0000', fontSize: 20, fontWeight: '900', padding: 7}}
                    > Delete </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  )
}

export default ModalActions

const styles = StyleSheet.create({
  pencil: {
    // backgroundColor: '#FAC7FF',
    borderRadius: 10,
    padding: 8,
  },
  trash: {
    // backgroundColor: '#FAC7FF',
    borderRadius: 10,
    marginTop: '5%',
    paddingVertical: 8,
    paddingHorizontal: 15
  },
  closeIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginRight: 5
  },
  handleIcons: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: '5%'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    // backgroundColor: '#2196F3',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  thank: {
    width: '40%',
    backgroundColor: '#8B0000',
    height: 50,
    borderRadius: 20,
    zIndex: 10,
    marginTop: '50%',
    alignSelf: 'center'
  },
})
