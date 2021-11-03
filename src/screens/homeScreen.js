import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styles from '../styles/style';
import {Input} from 'react-native-elements';
import {FlatGrid} from 'react-native-super-grid';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import รูปบ้าน
import HomeIcon from '../assets/images/icons/HomeIcon.svg';
// import Icon Advert
import AdvertIcon from '../assets/images/icons/Vector.svg';
// import Ads
import {useRewardedAd} from '@react-native-admob/admob';
import BannerAds from '../components/bannerAds';
import * as subGradeActions from '../store/actions/subGrade';

const hookOptions = {
  loadOnDismissed: true,
  requestOptions: {
    requestNonPersonalizedAdsOnly: true,
  },
};
const homeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [privilegeVisible, setprivilegeVisible] = useState(false);
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
    let toStrPrivilege;
    sumPrivilege = parseInt(privilege) + 2;
    toStrPrivilege = sumPrivilege.toString();
    setprivilege(toStrPrivilege);
    if (toStrPrivilege != null && toStrPrivilege != '') {
      await AsyncStorage.setItem('privilege', toStrPrivilege);
      console.log('สิทธิ์ที่เพิ่ม' + toStrPrivilege);
    }
  };
  console.log(privilege);
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

  const ContainerContent = () => {
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
                  setprivilegeVisible(false);
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
        </View>
      );
    };
    const gradeHandler = async classSelected => {
      let action;
      if (classSelected !== 0) {
        action = subGradeActions.getSub('8', classSelected);
        try {
          await dispatch(action);
          navigation.navigate('type', {});
        } catch (e) {
          Alert.alert('แจ้งเตือน', e.message);
        }
      } else {
        console.log(classSelected);
      }
    };
    return (
      <View style={{flex: 1}}>
        <Text
          style={[
            styles.textMedium34,
            {textAlign: 'center', color: '#FFFFFF'},
          ]}>
          ภาษาไทย
        </Text>
        <View
          style={{
            margin: 10,
            flex: 2,
          }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => gradeHandler(1)}
              style={{
                flex: 1,
                borderRadius: 8,
                padding: 10,
                margin: 5,
                backgroundColor: '#028c6a',
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  styles.textBold26,
                  {
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    color: '#fff',
                    fontWeight: '600',
                  },
                ]}>
                ป.1
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => gradeHandler(35)}
              style={{
                flex: 1,
                borderRadius: 8,
                padding: 10,
                margin: 5,
                backgroundColor: '#28b786',
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  styles.textBold26,
                  {
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    color: '#fff',
                    fontWeight: '600',
                  },
                ]}>
                ป.2
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => gradeHandler(36)}
              style={{
                flex: 1,
                borderRadius: 8,
                padding: 10,
                margin: 5,
                backgroundColor: '#FFA73F',
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  styles.textBold26,
                  {
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    color: '#fff',
                    fontWeight: '600',
                  },
                ]}>
                ป.3
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => gradeHandler(37)}
              style={{
                flex: 1,
                borderRadius: 8,
                padding: 10,
                margin: 5,
                backgroundColor: '#2E59F1',
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  styles.textBold26,
                  {
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    color: '#fff',
                    fontWeight: '600',
                  },
                ]}>
                ป.4
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => gradeHandler(38)}
              style={{
                flex: 1,
                borderRadius: 8,
                padding: 10,
                margin: 5,
                backgroundColor: '#ec6161',
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  styles.textBold26,
                  {
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    color: '#fff',
                    fontWeight: '600',
                  },
                ]}>
                ป.5
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => gradeHandler(39)}
              style={{
                flex: 1,
                borderRadius: 8,
                padding: 10,
                margin: 5,
                backgroundColor: '#B13AFA',
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  styles.textBold26,
                  {
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    color: '#fff',
                    fontWeight: '600',
                  },
                ]}>
                ป.6
              </Text>
            </TouchableOpacity>
          </View>
          {/*  <FlatGrid
            itemDimension={120}
            maxDimension={1000}
            data={items}           
            style={{ marginTop: 5, flex: 1 }}
            spacing={10}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => gradeHandler(item.grade)}>
                <Text
                  style={[
                    styles.textBold26,
                    {
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      color: '#fff',
                      fontWeight: '600',
                      borderRadius: 8,
                      padding: 10,
                      height: 120,
                      backgroundColor: item.code,
                    },
                  ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
          */}
        </View>
        <View style={{flex: 1}}>
          <Text
            style={[
              styles.textBold18,
              {flex: 1, textAlign: 'center', color: '#FFFFFF'},
            ]}>
            กลับมาหน้าหลักนี้โดยการกดรูปบ้าน {'\n'}
            <HomeIcon width={26} height={26} /> ด้านบนขวาของแต่ละหน้า
          </Text>
          <TouchableOpacity
            style={{
              margin: 10,
              padding: 8,
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: '#37565b',
              borderRadius: 10,
            }}
            onPress={() => setprivilegeVisible(!privilegeVisible)}>
            <AdvertIcon width={26} height={26} />
            <Text
              style={[
                styles.textLight18,
                {textAlignVertical: 'center', marginLeft: 10, color: '#ffffff'},
              ]}>
              ดูโฆษณาเพื่อรับสิทธิ์ดูเฉลย
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <Text
              style={[
                styles.textLight20,
                {
                  padding: 10,
                  borderRadius: 8,
                  backgroundColor: '#FAFE2F',
                  color: '#6E7015',
                },
              ]}>
              ดาวน์โหลดวิชาอื่น ๆ กดตรงนี้
            </Text>
          </TouchableOpacity>
        </View>
        <Modal isVisible={privilegeVisible}>
          <AdvertModal />
        </Modal>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/images/Bg-one.png')}>
        <View
          style={{
            padding: 15,
            paddingBottom: 0,
            marginBottom: 10,
            flex: 1,
          }}>
          <View style={{flex: 1}}>
            <ContainerContent />
          </View>
        </View>
      </ImageBackground>
      <BannerAds />
    </SafeAreaView>
  );
};
const pageStyle = StyleSheet.create({
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

export default homeScreen;
