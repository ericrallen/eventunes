import React, { Component } from 'react';

import { StyleSheet, Text, View, Image, FlatList, TouchableHighlight } from 'react-native';

import moment from 'moment';

let itemHeight = 0;
let itemWidth = 0;

export default class Events extends Component {
  constructor(props, context) {
    super(props, context);

    itemHeight = this.props.height / 3;
    itemWidth = this.props.width;
  }

  keyExtractor(item) {
    return item.id;
  }

  renderItem({item}) {
    const { start_time } = item;

    const start = moment(start_time);
    const now = moment();

    const day = start.format('DD');
    const month = start.format('MMM');
    const until = now.to(start);

    const date = {
      day,
      month,
      until,
    };

    return (
      <TouchableHighlight>
        <View>
          <Image source={{ uri: item.cover.source }} style={{ height: itemHeight, width: itemWidth }} />
          <Text>{date.until}</Text>
          <Text>{item.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.props.events}
          extraData={this.props}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          showsHorizontalScrollIndicator={false}
          snapToAlignment={'center'}
          overScrollMode={'never'}
          snapToInterval={itemWidth}
          directionalLockEnabled
          centerContent
          horizontal
          pagingEnabled
        />
      </View>
    )
  }
};