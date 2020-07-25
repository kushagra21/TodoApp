import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../../Util/Constants';
import {characterLimit} from "../../Util/CommonUtils"
import CheckBox from '@react-native-community/checkbox';

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
          <View
            style={{
              width: '15%',
              minHeight: 80,
              backgroundColor: COLORS.background,
              alignItems: 'center',
              justifyContent : "center"
            }}
           >
            <CheckBox
              disabled={false}
              value={data.isComplete}
              onValueChange={() =>
                markTask()
              }
            />
          </View>
          <TouchableOpacity
            style={{
              width: '85%',
              minHeight: 80,
              backgroundColor: COLORS.background,
              flex: 1,
              flexDirection: 'column',
              paddingTop: 10,
              paddingLeft: 5,
            }}
            onPress={() => {
              goToDetail();
            }}>
            <Text
              style={{fontSize: 16, fontWeight: '700', paddingBottom: 5}}>
              {characterLimit(data.task, 55)}
            </Text>
            <Text style={{fontSize: 12, fontWeight: '500'}}>
              {data.createdOn}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default TaskCard;
