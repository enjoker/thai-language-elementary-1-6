import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styles from '../styles/style';
import { Input } from 'react-native-elements';
import { FlatGrid } from 'react-native-super-grid';
import { getCoures } from '../functions/functions';
import * as userActions from '../store/actions/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import รูปบ้าน
import HomeIcon from '../assets/images/icons/HomeIcon.svg';
import AdvertIcon from '../assets/images/icons/Vector.svg';
import Advert2Icon from '../assets/images/icons/Vector2.svg';

import { useRewardedAd } from '@react-native-admob/admob';
// import Ads
import BannerAds from '../components/bannerAds'

const hookOptions = {
  loadOnDismissed: true,
  requestOptions: {
    requestNonPersonalizedAdsOnly: true,
  },
};

const advertScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [privilege, setprivilege] = useState();
  const { username } = route.params;
  const {
    adLoadError,
    adLoaded,
    reward,
    show
  } = useRewardedAd('ca-app-pub-3940256099942544/5224354917', hookOptions);

  const register = async () => {
    try {
      dispatch(userActions.addUser(username));
    } catch (error) {
      console.log(error);
    }
    await AsyncStorage.setItem('privilege', privilege);
  };
  useEffect(() => {
    if (adLoadError) {
      console.error(adLoadError);
    }
  }, [adLoadError]);

  useEffect(() => {
    if (reward) {
      console.log(`Reward Earned: ${reward.type}`);
      savePrivilege();
    }
  }, [reward]);

  const savePrivilege = async () => {
    let sumPrivilege;
    let test;
    sumPrivilege = parseInt(privilege) + 2
    test = sumPrivilege.toString();
    setprivilege(test)
    await AsyncStorage.setItem('privilege', privilege);
  }
  useEffect(() => {
    const getPrivilege = async () => {
      try {
        const currentPrivilege = await AsyncStorage.getItem('privilege')
        setprivilege(currentPrivilege)
      } catch (error) {
        console.log(error)
      }
    }
    getPrivilege()
  }, [])
  useEffect(() => { }, [privilege]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <View
          style={{
            padding: 15,
            paddingBottom: 0,
            marginBottom: 10,
            flex: 1,
          }}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text
              style={[
                styles.textMedium20,
                { textAlign: 'center', color: '#333333' },
              ]}>
              ท่านได้รับสิทธิ์ดูเฉลยคำตอบจำนวน
            </Text>
            <View style={{ margin: 5 }}>
              <Text style={[styles.textMedium40, { textAlign: 'center', color: '#333333' }]}>{privilege}</Text>
            </View>
            <TouchableOpacity
              onPress={() => show()}
              style={{
                alignItems: 'center',
                padding: 10,
                margin: 5,
                borderRadius: 8,
                backgroundColor: '#FF4EB8',
              }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Advert2Icon width={26} height={26} style={{ marginHorizontal: 5 }} />
                <Text
                  style={[
                    styles.textLight20,
                    { marginHorizontal: 5, color: '#ffffff' },
                  ]}>
                  กดดูโฆษณาเพื่อรับสิทธิ์เพิ่ม
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={register}
              style={{
                alignItems: 'center',
                padding: 10,
                margin: 5,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#C4C4C4',
              }}>
              <Text
                style={[
                  styles.textLight20,
                  { marginHorizontal: 5, color: '#0036F3' },
                ]}>
                ไปหน้าหลัก
              </Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text
                style={[
                  styles.textLight20,
                  { marginHorizontal: 5, color: '#333333' },
                ]}>
                ท่านสามารถกดรับสิทธิ์เพิ่มได้เมื่อ
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text
                style={[
                  styles.textLight20,
                  { marginHorizontal: 5, color: '#333333' },
                ]}>
                สัญลักษณ์นี้{ }
              </Text>
              <AdvertIcon width={26} height={26} style={{ marginHorizontal: 5 }} />
              <Text
                style={[
                  styles.textLight20,
                  { marginHorizontal: 5, color: '#333333' },
                ]}>
                ปรากฎด้านบน
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <BannerAds />
    </SafeAreaView>
  );
};

export default advertScreen;
