# TodoApp

A simple daily tasks app based on React Native which uses [AsyncStorage](https://react-native-community.github.io/async-storage/) and [UserDefaults](https://developer.apple.com/documentation/foundation/userdefaults) (iOS) via a native bridge for CRUD operations on task data.

The app uses a platform based method wrapper with native methods via a bridge for iOS & helper methods hosted as a [library](https://github.com/kushagra21/rn-todo-helper) for Android.


## Steps

1. Clone this repository to your local.

2. Please make sure that you have the development environment setup according to this [document](https://reactnative.dev/docs/environment-setup)

3. Open the project in an editor of your preference.

4. Install all the dependencies

    ```
      npm install
    ```
4. If you are developing on iOS platform, perform the below command at project root to install all pod dependencies.

    ```
      npx pod-install
    ```
    
5. Make sure either an android emulator or a real device is connected to the system with USB debugging switched on, if you are testing for android platform.

6. At root of the project, run the below command in a terminal to start the metro server

   ```
      npm run start 
    ```
7. At root, run the below command in the terminal

   ```
      npm run android 
    ```
    
    or 
    
    ```
      npm run ios
    ```
    
9. Now, you are all set to begin development.


### Screenshots

<table>
  <tr>
    <td valign="top"><img width="412" alt="TaskLIstUI" src="https://user-images.githubusercontent.com/13186052/88528882-d89c3900-d01c-11ea-9c64-41d8fd28a352.png"></td>
    <td valign="top"><img width="418" alt="NewNoteUI" src="https://user-images.githubusercontent.com/13186052/88514848-628dd700-d008-11ea-9b96-afa9d7e2dc1a.png"></td>
  </tr>
 </table>
