import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Button,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Platform
} from 'react-native';
import {getAllTasks, markComplete } from "rn-todo-helper"
import {TaskCard} from "../../Components"
import OptionsIOS from "../../Components/atom/OptionsIOS"
import {COLORS} from "../../Util/Constants"
import {Picker} from '@react-native-community/picker';

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
    },
    headerBtnAndroid : {width : 60 , height : 40 , justifyContent : "center" , alignItems : "center"},
    headerBtnTextAndroid : {color : COLORS.blue , fontWeight : "700"},
    filterViewAndroid :{backgroundColor: COLORS.background , paddingRight : 15 , paddingLeft : 15}
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
        randomizer : 0
      };
    }

    async componentDidMount() {
      this.handleHeaderOptions();
      this.retrieveTasks();

      // await clearStorage()
      // await editTask(4405,"This should be edited")
      // await markComplete(4405,true)
      // await removeTask(4405)
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //   if (nextProps.route.params !== undefined) {
    //     if (nextProps.route.params.actionPerformed !== undefined) {
    //       return {actionPerformed: true};
    //     }
    //   }
    //   return null
    // }

    componentDidUpdate(prevProps, prevState) {
      if(this.props.route.params !== undefined)
      {
        if(this.props.route.params.randomizer !== undefined)
        {
          let random = this.props.route.params.randomizer
          if (random !== this.state.randomizer) {
            this.setState({randomizer : random} , () => {this.retrieveTasks()})
        }
        }
      }
    }

    handleHeaderOptions() {
      this.props.navigation.setOptions({
        headerRight: () =>
          Platform.OS === 'ios' ? (
            <Button onPress={() => this.goToAddTask()} title="Add" />
          ) : (
            <TouchableOpacity
              style={styles.headerBtnAndroid}
              onPress={() => {
                this.goToAddTask();
              }}>
              <Text style={styles.headerBtnTextAndroid}>Add</Text>
            </TouchableOpacity>
          ),
      });
    }

    async retrieveTasks() {
      let data = await getAllTasks();
      this.setState({dataSource: data === null ? [] : data}, () => {
        this.filterData();
      });
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
              task: data,
            });
          }}
          markTask={async () => {
            await markComplete(data.id, !data.isComplete);
            this.retrieveTasks();
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

    renderFilterAndroid() {
      return (
        <View style={styles.filterViewAndroid}>
          <Picker
            selectedValue={this.state.selectedFilter}
            style={{height: 50, width: '100%'}}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({selectedFilter: itemValue}, () => {
                this.filterData();
              });
            }}>
            {filterOption.map((item, index) => {
              return (
                <Picker.Item
                  key={index}
                  label={`Filter : ${item.name}`}
                  value={item.type}
                />
              );
            })}
          </Picker>
        </View>
      );
    }

    render() {
      const {filtered} = this.state;
      return (
        <SafeAreaView>
          {Platform.OS === 'ios'
            ? this.renderFilterIOS()
            : this.renderFilterAndroid()}
          <FlatList
            style={{minHeight: Dimensions.get('window').height - 40}}
            key={filtered.length}
            keyExtractor={(item, index) => index.toString()}
            data={filtered}
            renderItem={({item, index}) => this.renderTaskCard(item, index)}
          />
          {Platform.OS === 'ios' && (
            <OptionsIOS
              isVisible={this.state.showModal}
              selectOption={() => {
                this.setState({showModal: false}, () => {
                  this.filterData();
                });
              }}
              selected={this.state.selectedFilter}
              filterOptions={filterOption}
              onFilterChange={value => {
                this.setState({selectedFilter: value});
              }}
            />
          )}
        </SafeAreaView>
      );
    }
  }

export default TodoList