import firebase from 'firebase/app';
import 'firebase/firestore';

import StoreService from './store.service';

export default class Service {

    static collection = () => firebase.firestore().collection('users');

    static add = (params) => async (dispatch, getState) => {
        try {
            await Service.collection().add({
                ...params,
                createdAtMs: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAtMs: firebase.firestore.FieldValue.serverTimestamp(),
                deleted: false,
            });
        } catch (err) {
            throw err;
        }
    }

    static set = (id, params) => async (dispatch, getState) => {
        try {
            await Service.collection().doc(id).set({
                ...params,
                updatedAtMs: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (err) {
            throw err;
        }
    }

    static update = (id, params) => async (dispatch, getState) => {
        try {
            await Service.collection().doc(id).update({
                ...params,
                updatedAtMs: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (err) {
            throw err;
        }
    }


    static get = async () => {
        const data = await Service.collection().get().then(res => res.docs.map(dat => ({id: dat.id, ...dat.data()})));
        return data;
    }

    static find = async (docId) => {
        const data = await Service.collection().doc(docId).get().then(res => ({id: res.id, ...res.data()}));
        return data;
    }

    static createListener = (callback = () => {}, query) => {
        return Service.collection().onSnapshot((result) => {
            const data = result.docs.map(data => ({id: data.id, ...data.data()}));
            callback(data);
        });
    }

    static createUserListener = (userId, callback = () => {}, query) => {
        return Service.collection().doc(userId).onSnapshot((result) => {
            // const data = result.docs.map(data => ({id: data.id, ...data.data()}));
            const data = {id: result.id, ...result.data()};
            callback(data);
        });
    }

    static registerStore = async (user, customer) => {
        try {
            const { username } = user;
            if(await Service.getUserByUsername(username)) {
                throw new Error('Username already in use');
            }
    
            const userDoc = Service.collection().doc();
            await userDoc.set({
                ...user,
                type: 'store',
                createdAtMs: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAtMs: firebase.firestore.FieldValue.serverTimestamp(),
                deleted: false,
            });
            await StoreService.set(userDoc.id, {
                ...customer,
                createdAtMs: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAtMs: firebase.firestore.FieldValue.serverTimestamp(),
                deleted: false,
            })();
        } catch(err){
            throw err;
        }
    }

    static login = async (username, password) => {
        try {
            if(username === 'admin' && password==='admin'){
                return {
                    username,
                    password,
                    type: 'admin',
                    name: 'admin',
                };
            }
            const authUser = await Service.collection()
                .where('username', '==', username)
                .get()
                .then(results => {
                    if(results.empty) {
                        throw new Error('User does not exist');
                    }
                    const data = results.docs.map(res => ({id: res.id, ...res.data()}));
                    return data[0];
                });
            if(authUser.type === 'customer'){
                throw new Error('Invalid account');
            }
            if(authUser.password !== password) {
                throw new Error('Wrong password');
            }
            const userObj = await StoreService.find(authUser.id);
            return {...userObj,...authUser};
        } catch(err) {
            throw err;
        }
    }

    static getUserByUsername = async (username) => {
        try {
            const user = await Service.collection()
                .where('username', '==', username)
                .get()
                .then(results => {
                    if(results.empty) {
                        return null;
                    }
                    const data = results.docs.map(res => ({id: res.id, ...res.data()}));
                    return data[0];
                });
            return user;
        } catch(err) {
            throw err;
        }
    }
};
