import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Button,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from 'react-native';
import {getAllTasks, saveTask,clearStorage,editTask , markComplete , removeTask} from "../../Util/TodoHelper"
import {TaskCard} from "../../Components"
import OptionsIOS from "../../Components/atom/OptionsIOS"
import {COLORS} from "../../Util/Constants"
import { color } from 'react-native-reanimated';

const styles = StyleSheet.create({
    FilterViewIOS: {
      minHeight: 40,
      flexDirection: 'row',
      flex: 1,
      width: '100%',
      justifyContent: 'center',
    },
    filterTabIOS: {
      justifyContent: 'center',
      width: '80%',
      paddingLeft : 20
    },
    filterTextIOS: {fontSize : 14 , fontWeight : "600"},
    filterButtonIOS : {
      width: '20%',
      justifyContent: 'center',
      paddingLeft: 10,
    }
  });

const filterOption = [{name : "All" , type : "All"} , {name : "Completed" , type : "Completed"}, {name : "Active" , type : "Active"}]

  class TodoList extends Component {
    constructor() {
      super();
      this.state = {
        dataSource: [],
        filtered: [],
        showModal: false,
        selectedFilter: 'All',
      };
    }

    async componentDidMount() {
      this.handleHeaderOptions();
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
      console.log('All Task : ', data);
      this.setState({dataSource: data === null ? [] : data},() => {this.filterData()});
    }

    goToAddTask() {
      const {navigation} = this.props;
      navigation.navigate('Detail', {
        type: 'add',
      });
    }

    filterData() {
      const {filtered, dataSource, selectedFilter} = this.state;
      let subset = [];
      switch (selectedFilter) {
        case 'All':
          this.setState({filtered: dataSource});
          break;
        case 'Completed':
          subset = [];
          for (let val of dataSource) {
            if (val.isComplete === true) {
              subset.push(val);
            }
          }
          this.setState({filtered: subset});
          break;
        case 'Active':
          subset = [];
          for (let val of dataSource) {
            if (val.isComplete === false) {
              subset.push(val);
            }
          }
          this.setState({filtered: subset});
          break;
        default:
          this.setState({filtered: dataSource});
      }
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
          markTask={async () => {
            await markComplete(data.id, !data.isComplete);
          }}
        />
      );
    }

    renderFilterIOS() {
      return (
        <View style={styles.FilterViewIOS}>
          <View style={styles.filterTabIOS}>
            <Text style={styles.filterTextIOS}>
              Filter : {this.state.selectedFilter}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.filterButtonIOS}
            onPress={() => {
              this.setState({showModal: true});
            }}>
            <Text
              style={{fontSize: 14, fontWeight: '600', color: COLORS.blue}}>
              Change
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    render() {
      const {filtered} = this.state;
      return (
        <SafeAreaView>
          {this.renderFilterIOS()}
          <FlatList
            style={{minHeight: Dimensions.get('window').height - 40}}
            key={filtered.length}
            keyExtractor={(item, index) => index.toString()}
            data={filtered}
            renderItem={({item, index}) => this.renderTaskCard(item, index)}
          />
          <OptionsIOS
            isVisible={this.state.showModal}
            selectOption={() => {
              this.setState({showModal: false},() => {this.filterData()});
            }}
            selected={this.state.selectedFilter}
            filterOptions={filterOption}
            onFilterChange={value => {
              this.setState({selectedFilter: value});
            }}
          />
        </SafeAreaView>
      );
    }
  }

export default TodoList