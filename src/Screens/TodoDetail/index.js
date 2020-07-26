import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TextInput,
  Dimensions,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Image
} from 'react-native';
import {COLORS} from "../../Util/Constants"
import {saveTodo,editTodo,removeTodo} from "../../Util/PlatformTodoHelper"
import {randomIntFromInterval} from "../../Util/CommonUtils"


const styles = StyleSheet.create({
  headerBtnAndroid: {
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBtnTextAndroid: {color: COLORS.blue, fontWeight: '700'},
  body : {
    backgroundColor :"#f5f5f5",
    width: 600,
    margin: 0,
    padding: 10,
    minHeight : "90%"
  },
  header : {
    color: "#404040",
    fontSize: 40,
    letterSpacing: 2,
    textAlign: "left",
    marginBottom : 40
  },
  pageMargin : {
    borderLeftWidth: 2,
    borderLeftColor : "#e6b800",
    borderRightWidth: 2,
    borderRightColor : "#e6b800",
    minHeight: "82%",
    marginLeft: 30,
    textAlign:"left"
  },
  pageLine : {
    width: "90%",
    height : 1,
    marginLeft : -40,
    backgroundColor: "#d9d9d9",
    marginTop : 40
  }
});

class TodoDetail extends Component {
  constructor() {
    super();
    this.state = {
      noteText: '',
      type: 'add',
      task: null,
    };
  }

  componentDidMount() {
    console.log('Props : ', this.props);
    this.handleHeaderOptions();
  }

  handleHeaderOptions() {
    const {route} = this.props;
    let data = route.params;
    this.setState({
      type: data.type,
      task: data.task ? data.task : null,
      noteText: data.task ? data.task.task : '',
    });
    this.props.navigation.setOptions({
      title: data.type === 'edit' ? 'Edit Todo' : 'New Todo',
      headerRight: () =>
        Platform.OS === 'ios' ? (
          <Button onPress={() => this.handleSave()} title="Save" />
        ) : (
          <TouchableOpacity
            style={styles.headerBtnAndroid}
            onPress={() => {
              this.handleSave();
            }}>
            <Text style={styles.headerBtnTextAndroid}>Save</Text>
          </TouchableOpacity>
        ),
    });
  }

  async handleSave() {
    const {type, task, noteText} = this.state;

    let trimmed = noteText.trim();
    if (type === 'add') {
      if (trimmed.length !== 0) {
        await saveTodo(trimmed);
        this.props.navigation.navigate('Tasks', {
          actionPerformed: 'add',
          randomizer: randomIntFromInterval(1, 10000),
        });
      } else {
        console.log('No Text to save');
      }
    }

    if (type === 'edit') {
      if (trimmed.length === 0) {
        await removeTodo(task.id);
      } else {
        await editTodo(task.id, trimmed);
      }
      this.props.navigation.navigate('Tasks', {
        actionPerformed: 'edit',
        randomizer: randomIntFromInterval(1, 10000),
      });
    }
  }

  async deleteTask()
  {
    await removeTodo(this.state.task.id);
    this.props.navigation.navigate('Tasks', {
      actionPerformed: 'edit',
      randomizer: randomIntFromInterval(1, 10000),
    });
  }

  getPageLineCount() {
    let totalHeight = Dimensions.get('window').height;
    let counts = Math.round(totalHeight / 40 - 5);
    let arr = [];
    for (let i = 1; i <= counts; i++) {
      arr.push({val: i});
    }
    return arr;
  }

  handleKeyDown(e) {
    if(e.nativeEvent.key == "Enter"){
       Keyboard.dismiss()
    }
}
  render() {
    const {type} = this.state;

    const totalLine = this.getPageLineCount();
    // console.log('Total Lines : ', totalLine);

    return (
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.body}>
            <View style={{flexDirection: 'row'}}>
              <View style={{width : "60%"}}>
              <Text style={styles.header}>
                {type === 'edit' ? 'Edit Note' : 'Write a note'}
              </Text>
              </View>
              {this.state.type === "edit" && <TouchableWithoutFeedback onPress={() => {this.deleteTask()}}>
                <Image
                  style={{width: 40, height: 40}}
                  source={require('../../Assets/images/delete_bin.png')}
                />
              </TouchableWithoutFeedback>}
            </View>
            <ScrollView onPress={Keyboard.dismiss}>
              <View style={styles.pageMargin}>
                {totalLine.map(element => {
                  return <Text key={element.val} style={styles.pageLine} />;
                })}
                <TextInput
                  style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderColor: '#fff',
                    minHeight: '80%',
                    // backgroundColor : "#ffd6cc",
                    color: '#595959',
                    position: 'absolute',
                    top: 0,
                    width: '65%',
                    height: '100%',
                    // opacity : 0.2,
                    textAlignVertical: 'top',
                    lineHeight: 40,
                    fontWeight: '700',
                    fontSize: 16,
                  }}
                  onChangeText={text => this.setState({noteText: text})}
                  value={this.state.noteText}
                  multiline={true}
                  returnKeyType="done"
                  onKeyPress={this.handleKeyDown}
                />
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

export default TodoDetail;
