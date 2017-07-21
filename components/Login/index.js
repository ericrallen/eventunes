import React, { Component } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { LoginButton } from 'react-native-fbsdk';

import SpotifyButton from '../SpotifyButton';

export default class Login extends Component {
  render() {
    return (
      <View>
        <LoginButton
          readPermissions={['user_events', 'user_friends', 'public_profile']}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                this.props.getUser(this.props.onLogin);
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}
        />
        <SpotifyButton />
      </View>
    );
  }
}
