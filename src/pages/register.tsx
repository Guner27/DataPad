import React, {useState} from 'react';
import PageView from '../components/PageView';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Colors} from '../constants/Colors';
import LoginButton from '../components/LoginButton';
import {useNavigation} from '@react-navigation/native';
import useRegister from '../hooks/useRegister';
import MText from '../components/MText';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RegisterScreen() {
  const colorScheme = useColorScheme();
  const styles = getStyle(colorScheme || 'light');
  const navigation = useNavigation();
  const {user, setUser, loading, register} = useRegister();

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
      return '../../....';
    } else {
      return date.toLocaleDateString('tr-TR');
    }
  }
  return (
    <PageView style={styles.container} lockToPortrait={true}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors[colorScheme || 'light'].background}
      />
      <View>
        <Icon style={styles.icon} name="adduser" size={100} />
        <View style={styles.inputContainer}>
          <Icon name="user" size={24} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Adınız."
            placeholderTextColor="gray"
            value={user.name}
            onChangeText={value => setUser({...user, name: value})}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="user" size={24} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Soyadınız"
            placeholderTextColor="gray"
            value={user.surname}
            onChangeText={value => setUser({...user, surname: value})}
            keyboardType="email-address"
          />
        </View>

        <TouchableOpacity
          style={styles.inputContainer}
          onPress={showDatepicker}>
          <Icon name="calendar" size={24} style={styles.inputIcon} />
          <MText style={styles.dateText}>{invalidControl()}</MText>
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

        <View style={styles.inputContainer}>
          <Icon name="paperclip" size={24} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Kullanıcı Adı"
            placeholderTextColor="gray"
            value={user.username}
            onChangeText={value => setUser({...user, username: value})}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="mail" size={24} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="E-posta"
            placeholderTextColor="gray"
            value={user.email}
            onChangeText={value => setUser({...user, email: value})}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="key" size={24} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Şifre oluştur"
            placeholderTextColor="gray"
            value={user.password}
            onChangeText={value => setUser({...user, password: value})}
            secureTextEntry
          />
        </View>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <LoginButton title="Hesap Oluştur" onPress={register} />
        )}
      </View>
      <LoginButton
        title="Giriş Yap"
        outline={false}
        onPress={() => {
          navigation.goBack();
        }}
      />
    </PageView>
  );
}

const getStyle = (colorScheme: 'light' | 'dark') => {
  return StyleSheet.create({
    container: {
      justifyContent: 'space-around',
    },
    icon: {
      fontSize: 90,
      fontWeight: 'bold',
      color: Colors[colorScheme].icon,
      marginBottom: 50,
      textAlign: 'center',
    },
    input: {
      color: Colors[colorScheme].text,
      flex: 1,
      height: 60,
    },
    inputContainer: {
      flexDirection: 'row',
      height: 60,
      borderColor: Colors[colorScheme].inputBorder,
      borderWidth: 1,
      marginBottom: 16,
      paddingHorizontal: 10,
      marginHorizontal: 16,
      borderRadius: 16,
    },
    inputIcon: {
      alignSelf: 'center',
      color: Colors[colorScheme].icon,
      width: 25,
    },
    dateText: {
    paddingLeft:4,
      alignSelf: 'center',
    },
  });
};
