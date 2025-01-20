import React from 'react';
import PageView from '../../components/PageView';
import MText from '../../components/MText';
import TabHeader from '../../components/TabHeader';
import {default as AntDesignIcon} from 'react-native-vector-icons/AntDesign';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {Colors} from '../../constants/Colors';
import useUser from '../../hooks/useUser';
import Collapsible from '../../components/Collapsible';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const {user, loading, deleteUser} = useUser();

  const formatBirthDate = () => {
    const birth: string = user?.birthDate ?? '';
    const date = new Date(birth);
    // UTC zaman diliminden farkı hesaplamak
    const localOffset = date.getTimezoneOffset(); // Dakika cinsinden
    const localDate = new Date(date.getTime() - localOffset * 60000); // UTC'yi yerel saate dönüştür

    return localDate.toLocaleDateString('tr-TR'); // Türkçe tarih formatı
  };

  function logout() {
    AsyncStorage.removeItem('userToken');
    navigation.replace('login');
    console.log('Çıkış Başarılı!');
  }

  function handleDelete() {
    Alert.alert(
      'Hesabımı Sil',
      'Hesabınızı silmek istediğinizden emin misiniz?',
      [
        {
          text: 'Hayır',
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: () => deleteUser(),
        },
      ],
    );
  }
  return (
    <>
      <TabHeader
        title="Merhaba!"
        buttonName="export"
        buttonColor="#d62828"
        buttonOnPress={logout}>
        <MaterialIcons name="manage-accounts" size={32} color="#FB8500" />
      </TabHeader>
      <PageView style={styles.container}>
        <View style={styles.info}>
          <View style={styles.infoHeader}>
            <MText type="subtitle"> Bilgilerim</MText>
            <TouchableOpacity
              style={styles.infoEdit}
              onPress={() => navigation.navigate('userEdit')}>
              <AntDesignIcon
                name="edit"
                size={moderateScale(28)}
                color={Colors.common.editIcon}
              />
            </TouchableOpacity>
          </View>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <View style={styles.infoContent}>
              <MText>Adı : {user?.name}</MText>
              <MText>Soyadı :{user?.surname} </MText>
              <MText>Kullanıcı Adı : {user?.username}</MText>
              <MText>
                Email : <MText type="link">{user?.email}</MText>
              </MText>
              <MText>Doğum Tarihi: {formatBirthDate()}</MText>
            </View>
          )}
        </View>
        <Collapsible title="Information">
          <MText>
            This app has three screens:{' '}
            <MText type="defaultSemiBold">Products,</MText>{' '}
            <MText type="defaultSemiBold">Explore</MText> and{' '}
            <MText type="defaultSemiBold">Category</MText>
          </MText>
          <MText>
            As a Developer I(Muhammed Güner) builded that app. For learn React
            Native and make practice programming. This App include the basic{' '}
            <MText type="defaultSemiBold">CRUD</MText> operation with{' '}
            <MText type="defaultSemiBold">REST API</MText>. Thank you for
            installed this app.
          </MText>
        </Collapsible>
        <Collapsible title="Bilgi">
          <MText>
            Test için oluşturulmuş basit bir{' '}
            <MText type="defaultSemiBold">REST API</MText>. ile ileişim kurarak{' '}
            <MText type="defaultSemiBold">CRUD</MText> operasyonları
            gerçekleştiren bir uygulamadır. React Native Framework'ü ile
            geliştirilmiştir. İlginiz için teşekkür ederim
          </MText>
        </Collapsible>
        <Collapsible title="Hesabımı sil">
          <MText>
            Hesabınızı silerseniz tüm bilgileriniz kaldırılacaktır.
            Bilgilerinize tekrar erişim imkanı olmayacaktır!{' '}
            <MText type="defaultSemiBold">Emin misiniz?</MText>
          </MText>
          <View style={styles.deleteView}>
            <View style={styles.lineOfDelete} />
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}>
              <MText style={styles.deleteText}>Hesabımı sil</MText>
              <MaterialIcons
                style={styles.deleteIcon}
                name="delete"
                color="white"
              />
            </TouchableOpacity>
          </View>
        </Collapsible>
      </PageView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  info: {
    marginBottom: 16,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 2,
    borderBottomWidth: 1,
    borderColor: '#6D6D6D',
  },
  infoEdit: {
    paddingBottom: 5,
  },
  infoContent: {},
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  deleteText: {
    textAlign: 'center',
    color: 'white',
    textShadowColor: 'gray',
    fontSize: moderateScale(14),
    marginLeft: 10,
    marginRight: 2,
    alignSelf: 'center',
  },
  deleteButton: {
    flexDirection: 'row',

    backgroundColor: '#d62828',
    borderColor: '#AC2020',
    borderWidth: 2,
    height: moderateScale(38),
    borderRadius: 10,
    // maxWidth:136,
  },
  deleteIcon: {
    alignSelf: 'center',
    marginRight: 4,
    fontSize: moderateScale(28),
  },
  deleteView: {
    flexDirection: 'row',
  },
  lineOfDelete: {
    flex: 1,
  },
});
