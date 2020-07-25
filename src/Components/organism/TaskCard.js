import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../../Util/Constants';
import {characterLimit} from "../../Util/CommonUtils"

class TaskCard extends Component {
  render() {
    const {goToDetail,markTask,data} = this.props;

    return (
      <View
        onPress={() => {
            goToDetail();
        }}
        style={{marginTop: 2, marginBottom: 2}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              width: '15%',
              minHeight: 80,
              backgroundColor: COLORS.background,
              alignItems: 'center',
            }}
            onPress={() => {
                markTask();
            }}>
            <Text>IC</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '85%',
              minHeight: 80,
              backgroundColor: COLORS.background,
              flex: 1,
              flexDirection: 'column',
              paddingTop: 10,
              paddingLeft: 5
            }}
            onPress={() => {
                goToDetail();
            }}>
            <Text style={{fontSize: 16, fontWeight: '700', paddingBottom: 5}}>
              {characterLimit(data.task, 55)}
            </Text>
        <Text style={{fontSize: 12, fontWeight: '500'}}>{data.createdOn}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default TaskCard;
