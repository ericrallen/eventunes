import React, { Component } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

import moment from 'moment';

import Login from './components/Login';

import Events from './components/Events';

export default class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      error: null,
      user: null,
      events: [],
      view: {
        width: 0,
        height: 0,
      },
    };

    this.eventTypes = [
      'attending',
      'created'
    ];

    this.welcomeText = 'Hey, ';

    this.connectFBText = 'Please connect to Facebook to continue.';

    this.getUserData = this.getUserData.bind(this);
    this.onGetUserData = this.onGetUserData.bind(this);
    this.onLayout = this.onLayout.bind(this);
  }

  getUserData(handler) {
    const since = moment().subtract(1, 'weeks').format('YYYY-MM-DD');
    const until = moment().add(1, 'months').format('YYYY-MM-DD');

    const URL = `/me?fields=id,name,picture.fields(url),events.since(${since}).until(${until}).fields(name,cover,start_time,owner.fields(name,picture.fields(url)))`;

    const eventRequest = new GraphRequest(
      URL,
      null,
      handler
    );

    new GraphRequestManager().addRequest(eventRequest).start();
  }

  onGetUserData(err, result) {
    if (err) {
      let { error } = this.state;

      error = err;

      this.setState({
        error,
      });
    } else {
      let { user, events } = this.state;

      const { id, name, picture, events: { data: evts } } = result;

      user = {
        id,
        name,
        picture
      };

      events = evts.sort((a, b) => moment.utc(a.start_time).diff(moment.utc(b.start_time)));

      this.setState({
        user,
        events,
      });
    }
  }

  onLayout(event) {
    const { x, y, width, height } = event.nativeEvent.layout;

    let { view } = this.state;

    view = {
      width,
      height,
    };

    this.setState({
      view,
    });
  }

  componentDidMount() {
    if (!this.state.user) {
      this.getUserData(this.onGetUserData);
    }
  }

  render() {
    return (
      <View style={styles.container} onLayout={this.onLayout}>
        <Text>
          {this.state.user ? `${this.welcomeText}${this.state.user.name}` : `${this.connectFBText}`}
        </Text>
        {(this.state.events.length) ? <Events width={this.state.view.width} height={this.state.view.height} events={this.state.events} /> : <Text>{'No events.'}</Text> }
        <Login getUser={this.getUserData} onLogin={this.onGetUserData} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
