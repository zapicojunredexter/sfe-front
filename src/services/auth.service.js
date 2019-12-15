import firebase from 'firebase/app';
import 'firebase/firestore';
import { setIsLoggedIn, setIsLoggedOut } from '../redux/user/user.action';

export default class Service {

    static collection = () => firebase.firestore().collection('users');

    static login = (username, password) => async dispatch => {
        dispatch(setIsLoggedIn());
    }

    static logout = (username, password) => async dispatch => {
        dispatch(setIsLoggedOut());
    }

    static getAll = async () => {
        const data = await Service.collection().get().then(res => res.docs.map(dat => ({id: dat.id, ...dat.data()})));
        return data;
    }
};
