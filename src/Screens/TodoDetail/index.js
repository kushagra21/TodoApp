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

  class TodoDetail extends Component {
    constructor() {
      super();
      this.state = {
        dataSource: [],
      };
    }

    componentDidMount()
    {
        console.log("Props : ",this.props)
        const {route} = this.props
        let data = route.params
        this.props.navigation.setOptions({
            title: (data.type === "edit"?"Edit Todo":"New Todo"),
            headerRight: () => (
              <Button onPress={() => console.log("")} title="Done" />
            ),
          });
    }

    render()
    {
        return(
            <SafeAreaView>
                <View>
                    <Text>Todo Detail</Text>
                </View>
            </SafeAreaView>
        )
    }
}

export default TodoDetail