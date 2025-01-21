import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState }  from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

const AProvider = ({children}) =>{
    const [token,setToken] = useState(null);
    const [isALoading, setALoading] = useState(true);

    useEffect(() =>{

        AsyncStorage.getItem('userToken').then(userSession =>{
            userSession && setToken(userSession);
            console.info(userSession);
            setALoading(false);
        });
    }, []);
    const store = createStore(reducers, {token,isALoading});
    return <Provider store ={store}>{children}</Provider>;
};

export default AProvider;
