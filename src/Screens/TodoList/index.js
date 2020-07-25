import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Button
} from 'react-native';

// const styles = StyleSheet.create({
//     MainContainer: {
//       justifyContent: 'center',
//       flex: 1,
//       paddingTop: 30,
//     }
//   });

  class TodoList extends Component {
    constructor() {
      super();
      this.state = {
        dataSource: [],
      };
    }

    componentDidMount()
    {
        console.log("Props : ",this.props)
        this.props.navigation.setOptions({
            headerRight: () => (
              <Button onPress={() => this.goToAddTask()} title="Add" />
            ),
          });
    }

    goToAddTask()
    {
        const {navigation} = this.props
        navigation.navigate('Detail', {
            type: "add",
          })
    }

    render()
    {
        return(
            <SafeAreaView>
                <View>
                    <Text>Todo list</Text>
                </View>
            </SafeAreaView>
        )
    }
}

export default TodoList