import React, { useState, useEffect } from 'react';
import { BannerAd, BannerAdSize } from '@react-native-admob/admob';

const BannerAds = () => {
   return (
      <BannerAd
         size={BannerAdSize.ADAPTIVE_BANNER}
         unitId={'ca-app-pub-3940256099942544/6300978111'}
         onAdFailedToLoad={(error) => console.error(error)}
      />
   )
}

export default BannerAds