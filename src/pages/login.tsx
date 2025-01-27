import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import PageView from '../components/PageView';
import {Colors} from '../constants/Colors';
import MText from '../components/MText';
import useLogin from '../hooks/useLogin';
import LoginButton from '../components/LoginButton';

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const colorScheme = useColorScheme();
  const styles = getStyle(colorScheme || 'light');
  const {email, password, setEmail, setPassword, loading, handleLogin} =
    useLogin();

  // Eğer loading durumu varsa, loading gösterebiliriz
  loading ? <ActivityIndicator size="large" /> : null;
  return (
    <PageView style={styles.container} lockToPortrait={true}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={Colors[colorScheme || 'light'].background}
      />
      <View />
      <View>
        <Icon style={styles.icon} name="login" size={100} />
        <View style={styles.inputContainer}>
          <Icon name="user" size={24} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="E-posta"
            placeholderTextColor="gray"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="key" size={24} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Şifre"
            placeholderTextColor="gray"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <LoginButton title="Giriş Yap" onPress={handleLogin} />
        )}

        <TouchableOpacity onPress={() => navigation.navigate('forgorPassword')}>
          <MText type="subtitle" style={styles.passwprdText}>
            Şifreni mi unuttun?
          </MText>
        </TouchableOpacity>
      </View>
      <LoginButton
        title="Yeni Hesap Oluştur."
        outline={false}
        onPress={() => {
          navigation.navigate('register');
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

    passwprdText: {
      padding: 24,
      textAlign: 'center',
      marginBottom: 80,
    },
  });
};
