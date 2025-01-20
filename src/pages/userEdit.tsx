import React, {useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import PageView from '../components/PageView';
import HeaderEdit from '../components/HeaderEdit';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {moderateScale} from 'react-native-size-matters';
import useUser from '../hooks/useUser';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../constants/Colors';
import MText from '../components/MText';

export default function UserEditScreen() {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme || 'light');
  const {user, editUser, setUser} = useUser();
  const navigation = useNavigation();
  function sendData() {
    if (
      user.name === '' ||
      user.surname === '' ||
      user.email === '' ||
      user.username === '' ||
      user.birthDate === ''
    ) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }
    editUser();
    navigation.goBack();
  }

  const formatBirthDate = () => {
    const birth: string = user.birthDate ?? '18-08-1998';
    const date = new Date(birth);
    // UTC zaman diliminden farkı hesaplamak
    const localOffset = date.getTimezoneOffset(); // Dakika cinsinden
    const localDate = new Date(date.getTime() - localOffset * 60000); // UTC'yi yerel saate dönüştür

    return localDate; // Türkçe tarih formatı
  };
  const [date, setDate] = useState(new Date(formatBirthDate()));
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate: Date = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setUser({...user, birthDate: currentDate.toISOString()});
  };

  const showDatepicker = () => {
    setDate(formatBirthDate());
    setShow(true);
  };

  function invalidControl() {
    if (date.toLocaleDateString('tr-TR') === 'Invalid Date') {
      return formatBirthDate().toLocaleDateString('tr-TR');
    } else {
      return date.toLocaleDateString('tr-TR');
    }
  }

  return (
    <>
      <HeaderEdit title="Profili Düzenle" onSave={sendData} />
      <PageView>
        <ScrollView style={styles.container}>
          <View style={styles.group}>
            <MText type="label">Adı</MText>
            <TextInput
              style={styles.input}
              placeholder="Adınızı giriniz"
              value={user.name}
              onChangeText={value => setUser({...user, name: value})}
            />
          </View>
          <View style={styles.group}>
            <MText type="label">Soyadı</MText>
            <TextInput
              style={styles.input}
              placeholder="Soyadınızı giriniz"
              value={user.surname}
              onChangeText={value => setUser({...user, surname: value})}
            />
          </View>
          <View style={styles.group}>
            <MText type="label">E-Posta</MText>
            <TextInput
              style={styles.input}
              placeholder="Mail adresinizi giriniz"
              value={user.email}
              onChangeText={value => setUser({...user, email: value})}
            />
          </View>
          <View style={styles.group}>
            <MText type="label">Kullanıcı Adı</MText>
            <TextInput
              style={styles.input}
              placeholder="Kullanıcı adınızı giriniz"
              value={user.username}
              onChangeText={value => setUser({...user, name: value})}
            />
          </View>
          <View style={styles.group}>
            <MText type="label">Doğum Tarihi</MText>
            <TouchableOpacity style={styles.dateInput} onPress={showDatepicker}>
              <Text style={styles.dateText}>{invalidControl()}</Text>
              <Icon style={styles.dateIcon} name="edit-calendar" size={30} />
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
              />
            )}
          </View>
        </ScrollView>
      </PageView>
    </>
  );
}

const getStyles = (colorScheme: 'light' | 'dark') => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    group: {},
    input: {
      borderColor: Colors[colorScheme].inputBorder,
      backgroundColor: Colors.common.inputBackground,
      borderWidth: 1,
      marginBottom: 20,
      marginHorizontal: 5,
      paddingHorizontal: 10,
      borderRadius: 10,
      fontSize: moderateScale(14),
    },
    dateInput: {
      borderColor: Colors[colorScheme].inputBorder,
      backgroundColor: Colors.common.inputBackground,
      borderWidth: 1,
      marginBottom: 20,
      marginHorizontal: 5,
      paddingHorizontal: 10,
      borderRadius: 10,
      height: moderateScale(38),
      flexDirection: 'row',
      justifyContent: 'space-between',
      fontSize: moderateScale(14),
    },
    dateText: {
      alignSelf: 'center',
      fontSize: moderateScale(14),
    },
    dateIcon: {
      alignSelf: 'center',
      color: Colors.light.icon,
      //color:'#023047',
    },
  });
};
