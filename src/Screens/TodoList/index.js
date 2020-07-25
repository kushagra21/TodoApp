import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Button,
  FlatList
} from 'react-native';
import {getAllTasks, saveTask,clearStorage,editTask , markComplete , removeTask} from "../../Util/TodoHelper"
import {TaskCard} from "../../Components"

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

    async componentDidMount() {
      this.handleHeaderOptions()
      this.retrieveTasks();

      // await clearStorage()
      // saveTask("I have two assignments")
      // await editTask(4405,"This should be edited")
      // await markComplete(4405,true)
      // await removeTask(4405)
    }

    handleHeaderOptions() {
      this.props.navigation.setOptions({
        headerRight: () => (
          <Button onPress={() => this.goToAddTask()} title="Add" />
        ),
      });
    }

    async retrieveTasks() {
      let data = await getAllTasks();
      this.setState({dataSource: data === null ? [] : data});
    }

    goToAddTask() {
      const {navigation} = this.props;
      navigation.navigate('Detail', {
        type: 'add',
      });
    }

    renderTaskCard(data, index) {
      const {navigation} = this.props;
      return (
        <TaskCard
          key={index}
          data={data}
          goToDetail={() => {
            navigation.navigate('Detail', {
              type: 'edit',
            });
          }}
          markTask={async () => {await markComplete(data.id,!(data.isComplete))}}
        />
      );
    }

    render() {
      const {dataSource} = this.state
      return (
        <SafeAreaView>
          <View>
            <Text>Todo list</Text>
          </View>
          <FlatList
            key={dataSource.length}
            keyExtractor={(item, index) => index.toString()}
            data={dataSource}
            renderItem={({item, index}) => this.renderTaskCard(item,index)}
          />
        </SafeAreaView>
      );
    }
  }

export default TodoList