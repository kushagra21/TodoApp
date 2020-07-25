import React from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {Picker} from '@react-native-community/picker';


const OptionsIOS = (props) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.isVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={styles.modalText}>Select Filter</Text>
            <Picker
              selectedValue={props.selected}
              style={{height: 100, width: 200}}
              onValueChange={(itemValue, itemIndex) =>
                props.onFilterChange(itemValue)
              }>
                  {
                      props.filterOptions.map((item,index) => {
                        return(<Picker.Item key={index} label={item.name} value={item.type} />)
                      })
                  }
            </Picker>

            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: '#2196F3'}}
              onPress={() => {
                props.selectOption();
              }}>
              <Text style={styles.textStyle}>Select</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width : 250
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop : 80
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    minWidth : 80
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight : "700"
  },
});

export default OptionsIOS;
