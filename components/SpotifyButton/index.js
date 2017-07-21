import React from 'react';

import { View, Text, TouchableHighlight, Image, NativeModules } from 'react-native';

console.log(NativeModules);

const { SpotifyModule } = NativeModules;

function onButtonPress() {
  console.log('SPOTIFY');
  try {
      SpotifyModule.authenticate(data => {
        console.log(data);
      });    
    } catch(err) {
      console.error('Spotify authentication failed: ', err);
    }
}

function SpotifyButton() {
  const text = 'Continue with Spotify';

  return (
    <TouchableHighlight style={{ width: 190, height: 30, backgroundColor: '#1DB954', borderRadius: 3 }} onPress={onButtonPress}>
      <View style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}>
        <Image source={require('../../assets/spotify.png')} style={{ height: 20, width: 20 }} />
        <Text style={{ color: '#ffffff', flex: 1, paddingLeft: 8, fontSize: 13, fontFamily: 'System' }}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
}

export default SpotifyButton;
