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
      <Modal
        animationType='slide'
        transparent={true}
        visible={deleteModal}
        onRequestClose={() => {
          alert('Modal has been closed.')
          setDeleteModal(!deleteModal)
        }}
      >
      <View style={styles.centeredViewNew}>
        <View style={styles.modalViewNew}>
        <Image
            style={{
              width: '40%',
              top: '-30%',
              resizeMode: 'contain'
            }}
            source={require('../assets/deleted.jpg')}
          />
          <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center',top: '-60%', color: '#402243'}}>
           Transaction deleted successfully! 🥳️
          </Text>
          <View style={{flexDirection: 'row', marginTop: '-40%' ,marginBottom: '2%'}}>
            <Button
              buttonStyle={styles.thank}
              title='Thanks'
              onPress={() => setDeleteModal(false)}
            />
          </View>
        </View>
      </View>
      </Modal>
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
                      color='green'
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
                      style={{color: 'green', fontSize: 20, fontWeight: '900', padding: 7}}
                    > Edit </Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} style={styles.trash}>
                  <View style={{flexDirection: 'row'}}>
                    <Entypo
                      name='trash'
                      onPress={() => deleteExpense()}
                      size={40}
                      color='red'
                    />
                    <Text 
                      onPress={() => deleteExpense()}
                      style={{color: 'red', fontSize: 20, fontWeight: '900', padding: 7}}
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
    backgroundColor: 'green',
    height: 50,
    width: 100,
    borderRadius: 20,
    padding: 15,
    zIndex: 5,
    fontSize: 18,
    alignSelf: 'center'
  },
  centeredViewNew: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalViewNew: {
    margin: 20,
    backgroundColor: '#ffffff',
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
    zIndex: -5
  },
})
