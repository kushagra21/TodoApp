import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Button
} from 'react-native';
import {getAllTasks, saveTask,clearStorage,editTask , markComplete , removeTask} from "../../Util/TodoHelper"

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

    async componentDidMount()
    {
        console.log("Props : ",this.props)
        this.props.navigation.setOptions({
            headerRight: () => (
              <Button onPress={() => this.goToAddTask()} title="Add" />
            ),
          });
        //   await clearStorage()
        //   saveTask("I have two assignments")
        // await editTask(4405,"This should be edited")
        // await markComplete(4405,true)
        // await removeTask(4405)
    }

    async retrieveTasks()
    {
        let data = await getAllTasks()
        console.log("Total : ",data)
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
                <Button onPress={() => {this.retrieveTasks()}} title="All Todo"/>
            </SafeAreaView>
        )
    }
}

export default TodoList