import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';

import {COLORS} from "../../Util/Constants"

const styles = StyleSheet.create({
  headerBtnAndroid: {
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBtnTextAndroid: {color: COLORS.blue, fontWeight: '700'},
});

class TodoDetail extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
    };
  }

  componentDidMount() {
    // console.log('Props : ', this.props);
    this.handleHeaderOptions()
  }

  handleHeaderOptions() {
    const {route} = this.props;
    let data = route.params;
    this.props.navigation.setOptions({
      title: data.type === 'edit' ? 'Edit Todo' : 'New Todo',
      headerRight: () =>
        Platform.OS === 'ios' ? (
          <Button onPress={() => console.log('')} title="Done" />
        ) : (
          <TouchableOpacity
            style={styles.headerBtnAndroid}
            onPress={() => {
              console.log('');
            }}>
            <Text style={styles.headerBtnTextAndroid}>Done</Text>
          </TouchableOpacity>
        ),
    });
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <Text>Todo Detail</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default TodoDetail;
