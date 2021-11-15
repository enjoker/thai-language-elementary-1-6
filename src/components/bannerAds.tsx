import React from 'react';
import { View, Button } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-admob/admob';

const BannerAds = () => {
   return (
      <BannerAd
         size={BannerAdSize.ADAPTIVE_BANNER}
         unitId={'ca-app-pub-1678137107426089/4541830993'}
         onAdFailedToLoad={(error) => console.error(error)}
      />
   )
}

export default BannerAds