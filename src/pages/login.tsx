import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
    <PageView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors[colorScheme || 'light'].background}
      />

      <Icon style={styles.icon} name="login" size={100} />
      <TextInput
        style={styles.input}
        placeholder="E-posta"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        placeholderTextColor="gray"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <LoginButton title="Giriş Yap" onPress={handleLogin} />
      <TouchableOpacity
        /*onPress={()=>{router.push('/forgot-password')}}*/ onPress={() =>
          navigation.navigate('tab', {screen: 'category'})
        }>
        <MText type="link" style={styles.passwprdText}>
          Şifreni mi unuttun?
        </MText>
      </TouchableOpacity>
    </PageView>
  );
}

const getStyle = (colorScheme: 'light' | 'dark') => {
  return StyleSheet.create({
    container: {
      justifyContent: 'center',
    },
    icon: {
      fontSize: 90,
      fontWeight: 'bold',
      color: Colors[colorScheme].icon,
      marginBottom: 50,
      textAlign: 'center',
    },
    input: {
      height: 60,
      borderColor: Colors[colorScheme].inputBorder,
      borderWidth: 1,
      marginBottom: 16,
      paddingHorizontal: 10,
      marginHorizontal: 16,
      borderRadius: 16,
      color: Colors[colorScheme].text,
    },
    passwprdText: {
      padding: 24,
      textAlign: 'center',
      marginBottom: 80,
      //color: colorScheme === "dark" ? "#8ECAE6" : "#023047",
    },
  });
};
