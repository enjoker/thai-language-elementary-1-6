import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styles from '../styles/style';
import {Image, Icon, Avatar, normalize, Card} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
// import Ads
import BannerAds from '../components/bannerAds';
import {getSubAndTimeGrade1} from '../functions/functions';
import {getSubAndTimeGrade2} from '../functions/functions';
import {getSubAndTimeGrade3} from '../functions/functions';
import {getSubAndTimeGrade4} from '../functions/functions';
import {getSubAndTimeGrade5} from '../functions/functions';
import {getSubAndTimeGrade6} from '../functions/functions';
import * as levelTestActions from '../store/actions/levelTest';

const optionTestScreen = ({navigation, route}) => {
  const {subid, gradeid, csgName} = route.params;
  const from = route.params.from;
  const [questionSelected, setquestionSelected] = useState(0);
  const [levelSelected, setlevelSelected] = useState(0);
  const [timeOut, settimeOut] = useState('-');
  const [gradeName, setgradeName] = useState('');
  const [showLevel, setshowLevel] = useState(true);
  const [subAllDetail, setsubAllDetail] = useState([]);
  const [subDetail, setsubDetail] = useState([]);
  const [timeTestEasy, settimeTestEasy] = useState(null);
  const [timeTestMedium, settimeTestMedium] = useState(null);
  const [timeTestHard, settimeTestHard] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  const GetSubDetail1 = async () => {
    if (gradeid == 1) {
      const res = await fetch(getSubAndTimeGrade1(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      res.json().then(res => setsubAllDetail(res));
    } else if (gradeid == 35) {
      const res = await fetch(getSubAndTimeGrade2(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      res.json().then(res => setsubAllDetail(res));
    } else if (gradeid == 36) {
      const res = await fetch(getSubAndTimeGrade3(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      res.json().then(res => setsubAllDetail(res));
    } else if (gradeid == 37) {
      const res = await fetch(getSubAndTimeGrade4(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      res.json().then(res => setsubAllDetail(res));
    } else if (gradeid == 38) {
      const res = await fetch(getSubAndTimeGrade5(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      res.json().then(res => setsubAllDetail(res));
    } else if (gradeid == 39) {
      const res = await fetch(getSubAndTimeGrade6(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      res.json().then(res => setsubAllDetail(res));
    }
  };

  useEffect(() => {
    GetSubDetail1();
  }, []);
  useEffect(() => {
    for (let k = 0; k < subAllDetail.length; k++) {
      if (subAllDetail[k] != '') {
        if (subAllDetail[k].csgName == csgName) {
          if (subDetail == '') {
            settimeTestEasy(subAllDetail[k].csgEasyTime);
            settimeTestMedium(subAllDetail[k].csgMediumTime);
            settimeTestHard(subAllDetail[k].csgHardTime);
            subDetail.push(subAllDetail[k]);
          } else {
            subDetail.splice(0, 1);
            settimeTestEasy(subAllDetail[k].csgEasyTime);
            settimeTestMedium(subAllDetail[k].csgMediumTime);
            settimeTestHard(subAllDetail[k].csgHardTime);
            subDetail.push(subAllDetail[k]);
          }
        }
      }
    }
  }, [subAllDetail, subDetail, csgName]);
  const ContainerContent = () => {
    const optionTestHandler = async () => {
      let action;
      if (questionSelected == 0) {
        Alert.alert('แจ้งเตือน', 'กรุณาเลือกจำนวนข้อ', [{text: 'ยืนยัน'}]);
      } else if (levelSelected == 0 && showLevel == true) {
        Alert.alert('แจ้งเตือน', 'กรุณาเลือกระดับความยาก', [{text: 'ยืนยัน'}]);
      } else if (timeOut == '-') {
        Alert.alert('แจ้งเตือน', 'ข้อสอบจะเปิดให้ทำเร็วๆนี้', [
          {text: 'ยืนยัน'},
        ]);
      } else {
        action = levelTestActions.getLevel(
          '1',
          subid,
          levelSelected,
          questionSelected,
        );
        try {
          await dispatch(action);
          navigation.navigate('test', {
            timeOut: timeOut,
            level: levelSelected,
            gradeName: gradeName,
            csgId: subid,
            csgName: csgName,
            gradeId: gradeid,
            timeTestEasy: timeTestEasy,
            timeTestMedium: timeTestMedium,
            timeTestHard: timeTestHard,
          });
        } catch (e) {
          Alert.alert('แจ้งเตือน', e.message);
        }
      }
    };
    const changeNameGrade = () => {
      if (gradeid == 1) {
        setgradeName('ชั้นป.1');
      } else if (gradeid == 35) {
        setgradeName('ชั้นป.2');
      } else if (gradeid == 36) {
        setgradeName('ชั้นป.3');
      } else if (gradeid == 37) {
        setgradeName('ชั้นป.4');
      } else if (gradeid == 38) {
        setgradeName('ชั้นป.5');
      } else if (gradeid == 39) {
        setgradeName('ชั้นป.6');
      }
    };
    useEffect(() => changeNameGrade(), [gradeid]);
    const timeTest = () => {
      if (timeTestEasy !== null && questionSelected !== null && levelSelected == 1) {
        //console.log(timeTestEasy + 'ง่าย');
        settimeOut(questionSelected * timeTestEasy);
      } else if (timeTestMedium !== null && questionSelected !== null && levelSelected == 3) {
        //console.log(timeTestMedium + 'กลาง');       
        settimeOut(questionSelected * timeTestMedium);       
      } else if (timeTestHard !== null && questionSelected !== null&& levelSelected == 4) {
        //console.log(timeTestHard + 'ยาก');        
        settimeOut(questionSelected * timeTestHard);        
      }
    };
    useEffect(
      () => timeTest(),
      [
        levelSelected,
        questionSelected,
        subDetail,
        timeTestEasy,
        timeTestMedium,
        timeTestHard,
      ],
    );

    useEffect(() => {
      if (
        timeTestEasy == null &&
        timeTestMedium !== null &&
        timeTestHard == null
      ) {
        setshowLevel(false);
        setlevelSelected(3);
      }
    }, []);
    return (
      <View style={{flex: 1, justifyContent: 'flex-start'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            numberOfLines={1}
            style={[styles.textMedium20, {flex: 1, color: '#FFFFFF'}]}>
            {csgName}
          </Text>
          <Text
            style={[
              styles.textMedium20,
              {textAlign: 'center', color: '#FFFFFF'},
            ]}>
            {gradeName}
          </Text>
        </View>
        <View style={pageStyle.optionHeading}>
          <Text style={[styles.textMedium20, {textAlign: 'center'}]}>
            เลือกจำนวนข้อ
          </Text>
          <View style={pageStyle.optionSection}>
            <TouchableOpacity onPress={() => setquestionSelected(10)}>
              <Text
                style={[
                  styles.textMedium26,
                  pageStyle.optionBtn,
                  questionSelected === 10
                    ? pageStyle.activeBg
                    : pageStyle.whiteBg,
                ]}>
                10
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setquestionSelected(15)}>
              <Text
                style={[
                  styles.textMedium26,
                  pageStyle.optionBtn,
                  questionSelected === 15
                    ? pageStyle.activeBg
                    : pageStyle.whiteBg,
                ]}>
                15
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setquestionSelected(20)}>
              <Text
                style={[
                  styles.textMedium26,
                  pageStyle.optionBtn,
                  questionSelected === 20
                    ? pageStyle.activeBg
                    : pageStyle.whiteBg,
                ]}>
                20
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {showLevel ? (
          <View style={pageStyle.optionHeading}>
            <Text style={[styles.textMedium20, {textAlign: 'center'}]}>
              เลือกระดับ
            </Text>
            <View style={pageStyle.optionSection}>
              <TouchableOpacity onPress={() => setlevelSelected(1)}>
                <Text
                  style={[
                    styles.textMedium26,
                    pageStyle.optionBtn,
                    pageStyle.whiteBg,
                    levelSelected === 1
                      ? pageStyle.activeBg
                      : pageStyle.whiteBg,
                  ]}>
                  ง่าย
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setlevelSelected(3)}>
                <Text
                  style={[
                    styles.textMedium14,
                    pageStyle.optionBtn,
                    pageStyle.whiteBg,
                    levelSelected === 3
                      ? pageStyle.activeBg
                      : pageStyle.whiteBg,
                  ]}>
                  ปานกลาง
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setlevelSelected(4)}>
                <Text
                  style={[
                    styles.textMedium26,
                    pageStyle.optionBtn,
                    pageStyle.whiteBg,
                    levelSelected === 4
                      ? pageStyle.activeBg
                      : pageStyle.whiteBg,
                  ]}>
                  ยาก
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <Text
            style={[
              styles.textRegular16,
              {textAlignVertical: 'center', marginHorizontal: 5, color: '#fff'},
            ]}>
            มีเวลาทำโดยประมาณ
          </Text>
          <Text
            style={[
              styles.textRegular16,
              {
                textAlignVertical: 'center',
                textAlign: 'center',
                color: '#0036F3',
                paddingHorizontal: 5,
                width: 100,
                marginHorizontal: 5,
                backgroundColor: '#FFD84E',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#0036F3',
              },
            ]}>
            {timeOut == '-'
              ? '-'
              : new Date(timeOut * 1000).toISOString().substr(11, 8)}
          </Text>
          <Text
            style={[
              styles.textRegular16,
              {textAlignVertical: 'center', marginHorizontal: 5, color: '#fff'},
            ]}>
            นาที
          </Text>
        </View>
        <TouchableOpacity
          style={{alignItems: 'center', marginTop: 10}}
          onPress={optionTestHandler}>
          <View
            style={{
              padding: 8,
              borderRadius: 15,
              width: wp('95%'),
              borderWidth: 1,
              borderColor: '#0036F3',
              backgroundColor: '#FFD84E',
            }}>
            <Text
              style={[
                styles.textBold16,
                {
                  textAlignVertical: 'center',
                  textAlign: 'center',
                },
              ]}>
              เริ่มทำแบบฝึกหัด/ข้อสอบ
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{alignItems: 'flex-start', marginTop: 10}}
          onPress={() => navigation.navigate('type')}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 5,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: '#0036F3',
              backgroundColor: '#FFF',
            }}>
            <Image
              source={require('../assets/images/icons/previous.png')}
              style={{width: 15, height: 15}}
            />
            <Text style={[styles.textMedium16, {marginHorizontal: 5}]}>
              ย้อนกลับ
            </Text>
          </View>
        </TouchableOpacity>
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
  optionHeading: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    borderColor: '#0036F3',
    backgroundColor: '#fff',
    marginTop: 10,
  },
  optionSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  optionBtn: {
    textAlign: 'center',
    textAlignVertical: 'center',
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    borderColor: '#FF834E',
    backgroundColor: '#fff',
    width: wp('25%'),
    height: hp('12%'),
  },
  whiteBg: {
    backgroundColor: '#fff',
  },
  activeBg: {
    backgroundColor: '#4EEAFF',
  },
});

export default optionTestScreen;
