import React from 'react';
import LottieView from 'lottie-react-native';

export default function Loading() {
  return (
    <LottieView
      source={require('../../lib/lottieJsons/loading.json')}
      autoPlay
      loop
      style={{ width: 100, height: 100 }}
    />
  );
}
