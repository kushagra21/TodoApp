//
//  TodoHelper.swift
//  Todos
//
//  Created by Kushagra on 26/07/20.
//

import Foundation
@objc(TodoHelper)

class TodoHelper : RCTEventEmitter {
  
  let defaults = UserDefaults.standard
  let STORAGE_KEY : String = "@stored_tasks"

  func getCurrentDate() -> String
  {
      let formatter = DateFormatter()
      formatter.dateFormat = "dd-MM-yyyy"
      let currentDateString = formatter.string(from: Date())
      let currentFormattedDate = formatter.date(from: currentDateString)
      let output = formatter.string(from: currentFormattedDate!)
      return output
  }

  func getAllValue() -> [[String : Any]]
  {
      let value = defaults.object(forKey: STORAGE_KEY) as? [[String : Any]]
       if(value == nil)
       {
          return []
      }
      else
       {
          return value!
      }
  }

  func saveTask(data : String)
  {
      let newTask : [String : Any] = [
        "id": Int.random(in: 0 ... 100000),
        "task": data,
        "isComplete": false,
        "createdOn": getCurrentDate(),
        "edited": 0,
      ]
      
      var allTask : [[String:Any]] = getAllValue()
      if(allTask.count == 0)
      {
          allTask = [newTask]
      }
      else
      {
          allTask.append(newTask)
      }
      
      defaults.set(allTask, forKey: STORAGE_KEY)
  }

  func removeTask(id: Int)
  {
      let allTask : [[String:Any]] = getAllValue()
      var updated = [[String : Any]]()
      for task in allTask {
          let taskId = task["id"] as! Int
          if( taskId != id)
          {
              updated.append(task)
          }
      }
       defaults.set(updated, forKey: STORAGE_KEY)
  }

  func editTask(id : Int , data : String)
  {
      let newTask : [String : Any] = [
        "id": Int.random(in: 0 ... 100000),
        "task": data,
        "isComplete": false,
        "createdOn": getCurrentDate(),
        "edited": 0,
      ]
      
      let allTask : [[String:Any]] = getAllValue()
      
      if(allTask.count == 0)
      {
          defaults.set([newTask], forKey: STORAGE_KEY)
      }
      else
      {
          var updated = [[String : Any]]()
          for task in allTask {
              let taskId = task["id"] as! Int
              if( taskId == id)
              {
                  let updatedTask : [String : Any] = [
                      "id": task["id"]!,
                    "task": data,
                    "isComplete": task["isComplete"]!,
                    "createdOn": task["createdOn"]!,
                    "edited": (task["edited"]!) as! Int + 1,
                  ]
                  updated.append(updatedTask)
              }
              else
              {
                  updated.append(task)
              }
          }
          defaults.set(updated, forKey: STORAGE_KEY)
      }
  }

  func markComplete(id : Int , isDone : Bool)
  {
      let allTask : [[String:Any]] = getAllValue()
      if(allTask.count == 0)
      {
          return
      }
      else
      {
          var updated = [[String : Any]]()
          for task in allTask {
              let taskId = task["id"] as! Int
              if( taskId == id)
              {
                  let updatedTask : [String : Any] = [
                      "id": task["id"]!,
                    "task": task["task"]!,
                    "isComplete": isDone,
                    "createdOn": task["createdOn"]!,
                    "edited": task["edited"]!,
                  ]
                  updated.append(updatedTask)
              }
              else
              {
                  updated.append(task)
              }
          }
          defaults.set(updated, forKey: STORAGE_KEY)
      }
  }

  func clearStorage()
  {
      defaults.removeObject(forKey:STORAGE_KEY)

  }
  
  // Bridge Methods
  
  override func supportedEvents() -> [String]! {
    return ["getAllTodo"]
  }
  
  @objc
  func getAllTodo(
    _ resolve: RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
  ) -> Void {
    let all = getAllValue()
    resolve(all)
  }
  
  @objc
   func saveTodo(
      _ taskData: NSString,
     resolver resolve: RCTPromiseResolveBlock,
     rejecter reject: RCTPromiseRejectBlock
     ) -> Void {
    saveTask(data: taskData as String)
    resolve(["success": true, "data" : taskData as String])
   }
  
  @objc
  func editTodo(
     _ taskData: NSString,
     taskId id: NSInteger,
    resolver resolve: RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
    ) -> Void {
   editTask(id: id as Int, data: taskData as String)
    resolve(["success": true, "data" : taskData as String , "id" : id as Int])
  }
  
  @objc
  func clearTodo(
     _ resolve: RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
    ) -> Void {
    clearStorage()
    resolve(["success": true])
  }
  
  @objc
  func removeTodo(
     _ id: NSInteger,
    resolver resolve: RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
    ) -> Void {
   removeTask(id: id as Int)
   resolve(["success": true, "data" : id as Int])
  }
  
  @objc
  func markTodo(
    _ isDone: NSInteger,
     taskId id: NSInteger,
    resolver resolve: RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
    ) -> Void {
    let check = isDone as Int
    if(check == 1)
    {
        markComplete(id: id as Int, isDone: true)
        resolve(["success": true, "data" : true , "id" : id as Int])
    }
    else
    {
        markComplete(id: id as Int, isDone: false)
        resolve(["success": true, "data" : false , "id" : id as Int])
    }
  }
  
  
  // ********* End of File ************
  
  override
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  
}
