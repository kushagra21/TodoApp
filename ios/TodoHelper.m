//
//  TodoHelper.m
//  Todos
//
//  Created by Kushagra on 26/07/20.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_REMAP_MODULE(RNTodoHelper, TodoHelper, RCTEventEmitter)

RCT_EXTERN_METHOD(
  getAllTodo: (RCTPromiseResolveBlock)resolve
  rejecter: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
  saveTodo: (NSString)taskData
                  resolver:(RCTPromiseResolveBlock)resolve
  rejecter: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
  editTodo: (NSString)taskData
  taskId: (NSInteger)id
  resolver:(RCTPromiseResolveBlock)resolve
  rejecter: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
  clearTodo: (RCTPromiseResolveBlock)resolve
  rejecter: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
  removeTodo: (NSInteger)id
                  resolver:(RCTPromiseResolveBlock)resolve
  rejecter: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
  markTodo: (NSInteger)isDone
                  taskId:(NSInteger)id
                  resolver:(RCTPromiseResolveBlock)resolve
  rejecter: (RCTPromiseRejectBlock)reject
)



@end
