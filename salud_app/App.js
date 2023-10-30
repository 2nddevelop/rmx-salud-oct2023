import React, { useEffect, useState } from 'react'
import Navigation from './src/Navigation';
import * as Font from 'expo-font';

export default function App() {

  const [fontsLoaded, setFontsLoaded] = useState(false);
    useEffect(() => {
        if (!fontsLoaded) {
            loadFonts();
        }
    })
    const loadFonts = async () => {
        await Font.loadAsync({
            'roboto': require('./src/assets/fonts/roboto/Roboto-Light.ttf'),
            'digital': require('./src/assets/fonts/digital/wwDigital.ttf'),
        });
        setFontsLoaded(true);
    }

  return (
      <Navigation />
  );
}