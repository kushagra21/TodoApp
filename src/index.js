import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TodoList from './Screens/TodoList';
import TodoDetail from './Screens/TodoDetail'


const Stack = createStackNavigator();
function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Tasks" component={TodoList} options={{ title: 'Todos' }} />
          <Stack.Screen name="Detail" component={TodoDetail} options={{ title: 'New Todo' }} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;

