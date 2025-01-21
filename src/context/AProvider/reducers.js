import AsyncStorage from '@react-native-async-storage/async-storage';


export default function reducers(state, action){
    switch (action.type) {
        case 'SET_USER':
            const token = action.payload;
            AsyncStorage.setItem('userToken', token.responseData);
            return {...state,token};

        case 'REMOVE_USER':
            AsyncStorage.removeItem('userToken');
            AsyncStorage.removeItem('userNameOrMail');
            return {...state, token:null};

        default:
            return state;
    }
}
