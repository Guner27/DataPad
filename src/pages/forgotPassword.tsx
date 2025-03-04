import React, {useState} from 'react';
import PageView from '../components/PageView';
import {
    Alert,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import useForgot from '../hooks/useForgot';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../constants/Colors';
import MText from '../components/MText';
import {moderateScale} from 'react-native-size-matters';
import LoginButton from '../components/LoginButton';
import { useTranslation } from 'react-i18next';

export default function ForgotPassword() {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme || 'light');
  const { t } = useTranslation();
  const navigation = useNavigation();

  const {pageChange, resetPassword, requestPasswordReset} =
    useForgot();
  const [mailOrUsername, setMailOrUserName] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  function request() {
    if (mailOrUsername === '')
      {Alert.alert('Hata', 'Lütfen gerekli alanı doldurun!');}
    else {requestPasswordReset(mailOrUsername);}
  }
  function reset() {
    if (token === '' || newPassword === '' || confirmPassword === '')
      {Alert.alert('Hata', 'Lütfen gerekli alanları doldurun!');}
    else {resetPassword({token, newPassword, confirmPassword});}
  }

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Icon style={styles.headerIcon} name="arrow-back" />
        </TouchableOpacity>
        <MText type="title" style={styles.headerText}>
          {' '}
          {t('forgotPassword.header')}
        </MText>
      </View>
      <PageView lockToPortrait={true}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={Colors[colorScheme || 'light'].headerbackground}
      />
        {pageChange ? (
          <View style={styles.container}>
            <Icon style={styles.icon} name="outgoing-mail" />

            <MText style={styles.title}>{t('forgotPassword.title')}</MText>
            <View style={styles.inputContainer}>
              <Icon name="alternate-email" size={24} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder={t('forgotPassword.placeholder.email')}
                placeholderTextColor="gray"
                value={mailOrUsername}
                onChangeText={setMailOrUserName}
              />
            </View>
            <LoginButton title={t('forgotPassword.button.continue')} onPress={request}/>
            <View style={styles.space}/>
          </View>
        ) : (
          <View style={styles.container}>
            <Icon style={styles.icon} name="published-with-changes" size={70} />
            <MText type="label" style={styles.label}>{t('forgotPassword.label.code')}</MText>
            <View style={styles.inputContainer}>
              <Icon name="forward-to-inbox" size={24} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder={t('forgotPassword.placeholder.code')}
                placeholderTextColor="gray"
                value={token}
                onChangeText={setToken}
              />
            </View>

            <MText type="label" style={styles.label}>{t('forgotPassword.label.password')}</MText>
            <View style={styles.inputContainer}>
              <Icon name="key" size={24} style={styles.inputIcon} />
              <TextInput
               style={styles.input}
               placeholder={t('forgotPassword.label.password')}
               placeholderTextColor="gray"
               value={newPassword}
               onChangeText={setNewPassword}
               secureTextEntry
              />
            </View>

            <MText type="label" style={styles.label}>{t('forgotPassword.label.password2')}</MText>
            <View style={styles.inputContainer}>
              <Icon name="key" size={24} style={styles.inputIcon} />
              <TextInput
               style={styles.input}
               placeholder={t('forgotPassword.label.password2')}
               placeholderTextColor="gray"
               value={confirmPassword}
               onChangeText={setConfirmPassword}
               secureTextEntry
              />
            </View>
            <LoginButton title="Tamam" onPress={reset}/>
            <View style={styles.space}/>
          </View>
        )}
      </PageView>
    </>
  );
}

const getStyles = (colorScheme: 'light' | 'dark') => {
  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      height: 46,
      backgroundColor: Colors[colorScheme].headerbackground,
    },
    headerIcon: {
      alignItems: 'center',
      marginLeft: 20,
      marginRight: 20,
      color: Colors[colorScheme].icon,
      fontSize: moderateScale(28),
    },
    headerText: {
      fontWeight: 'light',
      fontSize: moderateScale(20),
    },

    container: {
      flex: 1,
      justifyContent: 'center',
    },
    icon: {
      color: Colors[colorScheme].icon,
      fontSize: moderateScale(80),
      marginBottom: 40,
      textAlign: 'center',
    },
    title: {
      fontWeight: '800',
      marginLeft: 24,
      marginBottom: 6,
    },
    label: {
      marginLeft: 24,
      marginBottom:2,
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
      marginHorizontal:16,
      borderRadius: 16,
    },
    inputIcon: {
      alignSelf: 'center',
      color: Colors[colorScheme].icon,
      width: 25,
    },
    space:{height:100},
  });
};
