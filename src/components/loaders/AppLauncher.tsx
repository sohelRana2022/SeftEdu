import React from 'react';
import LottieView from 'lottie-react-native';

export default function AppLauncher() {
  return (
    <LottieView
      source={require('../../lib/lottieJsons/appLauncher.json')}
      autoPlay
      loop
      style={{ width: 200, height: 200 }}
    />
  );
}
