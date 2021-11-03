import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {
  Image,
  Icon,
  Avatar,
  normalize,
  Card,
  Input,
} from 'react-native-elements';
import styles from '../styles/style';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import * as userActions from '../store/actions/user';

// import Icon.SVG
import RenameIcon from '../assets/images/icons/rename_icon.svg';
import HomeIcon from '../assets/images/icons/HomeIcon.svg';
import AdvertIcon from '../assets/images/icons/Vector.svg';

//import Screen
import registerScreen from '../screens/registerScreen';
import loadingScreen from '../screens/loadingScreen';
import homeScreen from '../screens/homeScreen';
import renameScreen from '../screens/renameScreen';
import typeScreen from '../screens/typeScreen';
import optionTestScreen from '../screens/optionTestScreen';
import testScreen from '../screens/testScreen';
import scoreScreen from '../screens/scoreScreen';
import rankingScreen from '../screens/rankingScreen';
import advertScreen from '../screens/advertScreen';

import {useRewardedAd} from '@react-native-admob/admob';

const hookOptions = {
  loadOnDismissed: true,
  requestOptions: {
    requestNonPersonalizedAdsOnly: true,
  },
};

const Navigator = () => {
  const dispatch = useDispatch();
  const checkUser = useSelector(state => state.user.userName);
  const loadingUser = useSelector(state => state.user.loadingUser);
  const Stack = createNativeStackNavigator();
  const [ModalVisible, setModalVisible] = useState(false);
  const [privilege, setprivilege] = useState();
  const {adLoadError, adLoaded, reward, show} = useRewardedAd(
    'ca-app-pub-3940256099942544/5224354917',
    hookOptions,
  );
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
    sumPrivilege = parseInt(privilege) + 2;
    test = sumPrivilege.toString();
    setprivilege(test);
    await AsyncStorage.setItem('privilege', privilege);
  };
  useEffect(() => {
    const getPrivilege = async () => {
      try {
        const currentPrivilege = await AsyncStorage.getItem('privilege');
        setprivilege(currentPrivilege);
      } catch (error) {
        console.log(error);
      }
    };
    getPrivilege();
  }, []);
  console.log(privilege);
  useEffect(() => {}, [privilege]);

  useEffect(() => {
    const getUser = async () => {
      try {
        dispatch(userActions.getUser());
        //await AsyncStorage.removeItem('user')
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  const AdvertModal = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View
          style={[
            styles.boxOvertime,
            {backgroundColor: '#1FA246', borderRadius: 15},
          ]}>
          <Text
            style={[
              styles.textLight22,
              {
                marginTop: 10,

                textAlign: 'center',
                color: '#FFFFFF',
              },
            ]}>
            ท่านมีสิทธื์ในการดูเฉลยจำนวน
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text
              style={[
                styles.textRegular30,
                {
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  color: '#D7B641',
                  marginHorizontal: 5,
                },
              ]}>
              {privilege}
            </Text>
            <Text
              style={[
                styles.textLight22,
                {
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  color: '#FFFFFF',
                  marginHorizontal: 5,
                },
              ]}>
              สิทธิ์
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              padding: 10,
              marginBottom: 5,
            }}>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => {
                setModalVisible(false);
              }}>
              <Text style={[styles.textLight18, pageStyle.overTimeLeft]}>
                ยกเลิก
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => show()}>
              <Text style={[styles.textLight18, pageStyle.overTimeRight]}>
                กดดูโฆษณาเพื่อรับสิทธิ์เพิ่ม
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View
          style={[
            styles.boxOvertime,
            {backgroundColor: '#D84315', borderRadius: 15},
          ]}>
          <Text
            style={[
              styles.textLight22,
              {marginTop: 10, padding: 10, textAlign: 'center',color:'#FFFFFF'},
            ]}>
            สิทธิ์ในการดูเฉลยของท่านเหลือ 0
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              padding: 10,
              marginBottom:10
            }}>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => {
                setModalVisible(false);
              }}>
              <Text style={[styles.textLight18, pageStyle.overTimeLeft]}>
                ยกเลิก
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => {
                setModalVisible(false);
              }}>
              <Text style={[styles.textLight18, pageStyle.overTimeRight]}>
                กดดูโฆษณาเพื่อรับ 2 สิทธิ์
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        */}
      </View>
    );
  };
  const MainLogo = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={require('../assets/images/SchooltestLogo.png')}
          style={{width: 34, height: 24}}
        />
        <Text
          style={[styles.textMedium16, {marginHorizontal: 5, color: '#555'}]}>
          School Test Lite
        </Text>
      </View>
    );
  };

  const clearStackOptions = ({navigation}) => ({
    title: '',
    headerLeft: () => {
      return <MainLogo />;
    },
    headerRight: () => {
      return (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => setModalVisible(!ModalVisible)}>
            <AdvertIcon width={26} height={26} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => navigation.popToTop()}>
            <HomeIcon width={26} height={26} />
          </TouchableOpacity>
        </View>
      );
    },
  });

  const screenOptions = ({navigation}) => ({
    headerTitle: () => {
      return <MainLogo />;
    },
    headerRight: () => {
      return (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => setModalVisible(!ModalVisible)}>
            <AdvertIcon width={26} height={26} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => navigation.popToTop()}>
            <HomeIcon width={26} height={26} />
          </TouchableOpacity>
        </View>
      );
    },
  });

  const screenRename = ({navigation}) => ({
    headerTitle: () => {
      return <MainLogo />;
    },
    headerRight: () => {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('rename')}>
          <RenameIcon width={26} height={26} />
        </TouchableOpacity>
      );
    },
  });

  const AppNavigator = ({navigation}) => {
    return (
      <Stack.Navigator>
        {checkUser === null && loadingUser === false ? (
          <>
            <Stack.Screen
              name="register"
              component={registerScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="advert"
              component={advertScreen}
              options={{headerShown: false}}
            />
          </>
        ) : checkUser !== null && loadingUser === false ? (
          <>
            <Stack.Screen
              name="home"
              component={homeScreen}
              options={screenRename}
            />
            <Stack.Screen
              name="type"
              component={typeScreen}
              options={screenOptions}
            />
            <Stack.Screen
              name="optionTest"
              component={optionTestScreen}
              options={screenOptions}
            />
            <Stack.Screen
              name="test"
              component={testScreen}
              options={screenOptions}
            />
            <Stack.Screen
              name="score"
              component={scoreScreen}
              options={clearStackOptions}
            />
            <Stack.Screen
              name="ranking"
              component={rankingScreen}
              options={screenOptions}
            />
            <Stack.Screen
              name="rename"
              component={renameScreen}
              options={screenOptions}
            />
          </>
        ) : (
          <Stack.Screen
            name="loading"
            component={loadingScreen}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <AppNavigator />
      <Modal isVisible={ModalVisible}>
        <AdvertModal />
      </Modal>
    </NavigationContainer>
  );
};
const pageStyle = StyleSheet.create({
  trueColor: {
    color: '#00962A',
  },
  falseColor: {
    color: '#FF4E4E',
  },
  timeOutColor: {
    color: '#888',
  },
  yellowBox: {
    padding: 5,
    marginHorizontal: 5,
    width: wp('17%'),
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#000000',
    backgroundColor: '#FFD84E',
  },
  closeModal: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    backgroundColor: '#fff',
    width: 100,
    textAlign: 'center',
  },
  correctAnswer: {
    marginRight: 10,
    fontWeight: 'bold',
    color: '#0036F3',
  },
  overTimeLeft: {
    backgroundColor: '#fff',
    borderColor: '#D7B641',
    color: '#D7B641',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    width: 100,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  overTimeRight: {
    backgroundColor: '#D7B641',
    borderColor: '#FFffff',
    color: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    flex: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default Navigator;
