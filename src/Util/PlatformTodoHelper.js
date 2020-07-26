import {Platform} from 'react-native';
import {
  saveTask,
  getAllTasks,
  removeTask,
  clearStorage,
  editTask,
  markComplete,
} from 'rn-todo-helper';
import {
  saveTaskIOS,
  getAllTaskIOS,
  removeTaskIOS,
  clearStorageIOS,
  editTaskIOS,
  markCompleteIOS,
} from './TodoHelperIOS';

export const saveTodo = async data => {
  if (Platform.OS === 'ios') {
    await saveTaskIOS(data);
  } else {
    await saveTask(data);
  }
};

export const getAllTodos = async () => {
  let all = [];
  if (Platform.OS === 'ios') {
    all = await getAllTaskIOS();
    return all;
  } else {
    all = await getAllTasks();
  }
  return all;
};

export const removeTodo = async id => {
  if (Platform.OS === 'ios') {
    await removeTaskIOS(id);
  } else {
    await removeTask(id);
  }
};

export const clearTodoStorage = async () => {
  if (Platform.OS === 'ios') {
    await clearStorageIOS();
  } else {
    await clearStorage();
  }
};

export const editTodo = async (id, data) => {
  if (Platform.OS === 'ios') {
    await editTaskIOS(id, data);
  } else {
    await editTask(id, data);
  }
};

export const markTodoComplete = async (id, isDone) => {
  if (Platform.OS === 'ios') {
    await markCompleteIOS(id, isDone);
  } else {
    await markComplete(id, isDone);
  }
};
