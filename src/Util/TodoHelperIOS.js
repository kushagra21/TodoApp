import {NativeModules} from 'react-native';

const Helper = NativeModules.RNTodoHelper;

export const checkIOS = async () => {
  //   console.log('Native Module : ', NativeModules.RNTodoHelper);
  //   await saveTaskIOS("This is a sample task")
  //   await markCompleteIOS(19010, false);
  await removeTaskIOS(19010);
  await getAllTaskIOS();
  //   await editTaskIOS(83008,"You just fot edited")
  // await clearStorageIOS()
};

export const getAllTaskIOS = async () => {
  let tasks = await Helper.getAllTodo();
  console.log('Total Tasks : ', tasks);
  return tasks;
};

export const saveTaskIOS = async data => {
  let task = await Helper.saveTodo(data);
  console.log('Save Task : ', task);
  return task;
};

export const editTaskIOS = async (id, data) => {
  let task = await Helper.editTodo(data, id);
  console.log('Edit Task : ', task);
  return task;
};

export const clearStorageIOS = async () => {
  let tasks = await Helper.clearTodo();
  console.log('Clear Tasks: ', tasks);
  return tasks;
};

export const removeTaskIOS = async id => {
  let task = await Helper.removeTodo(id);
  console.log('Remove Task : ', task);
  return task;
};

export const markCompleteIOS = async (id, isDone) => {
  let check = isDone === true ? 1 : 0;
  let task = await Helper.markTodo(check, id);
  console.log('Mark Complete Task : ', task);
  return task;
};
