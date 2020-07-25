import AsyncStorage from '@react-native-community/async-storage';
import {getCurrentDate, randomIntFromInterval} from './CommonUtils';

const STORAGE_KEY = '@total_todos';

export const saveTask = async data => {
  let newTask = {
    id: randomIntFromInterval(1, 100000),
    task: data,
    isComplete: false,
    createdOn: getCurrentDate(),
    edited: 0,
  };
  try {
    let allTasks = await getAllTasks();
    let data_string = '';
    if (allTasks === null) {
      data_string = JSON.stringify([newTask]);
    } else {
      allTasks.push(newTask);
      data_string = JSON.stringify(allTasks);
    }
    await AsyncStorage.setItem(STORAGE_KEY, data_string);
  } catch (e) {
    // saving error
  }
};

export const getAllTasks = async () => {
  try {
    const totalVal = await AsyncStorage.getItem(STORAGE_KEY);
    return totalVal != null ? JSON.parse(totalVal) : null;
  } catch (e) {
    // error reading value
  }
};

export const removeTask = async id => {
  try {
    let allTasks = await getAllTasks();
    let data_string = '';
    if (allTasks === null) {
      return;
    } else {
      let updated = [];
      for (data of allTasks) {
        if (data.id !== id) {
          updated.push(data);
        }
      }
      data_string = JSON.stringify(updated);
      await AsyncStorage.setItem(STORAGE_KEY, data_string);
    }
  } catch (e) {
    // saving error
  }
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    // remove error
  }
};

export const editTask = async (id, data) => {
  let newTask = {
    id: randomIntFromInterval(1, 100000),
    task: data,
    isComplete: false,
    createdOn: getCurrentDate(),
    edited: 0,
  };
  try {
    let allTasks = await getAllTasks();
    let data_string = '';
    if (allTasks === null) {
      newTask.id = id;
      data_string = JSON.stringify([newTask]);
    } else {
      let updated = [];
      for (task of allTasks) {
        if (task.id === id) {
          task.task = data;
          task.edited = task.edited + 1;
          updated.push(task);
        } else {
          updated.push(task);
        }
      }
      data_string = JSON.stringify(updated);
    }
    await AsyncStorage.setItem(STORAGE_KEY, data_string);
  } catch (e) {
    // saving error
  }
};

export const markComplete = async (id, isDone) => {
  try {
    let allTasks = await getAllTasks();
    let data_string = '';
    if (allTasks === null) {
      return;
    } else {
      let updated = [];
      for (task of allTasks) {
        if (task.id === id) {
          task.isComplete = isDone;
          updated.push(task);
        } else {
          updated.push(task);
        }
      }
      data_string = JSON.stringify(updated);
      await AsyncStorage.setItem(STORAGE_KEY, data_string);
    }
  } catch (e) {
    // saving error
  }
};
