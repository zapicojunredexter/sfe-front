import firebase from 'firebase/app';
import 'firebase/firestore';
export default class Service {

    static collection = () => firebase.firestore().collection('orders');

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

    static getStoreOrders = async (storeId) => {
        const documents = await Service.collection().where('store.id','==',storeId).where('status', '==','waiting').get();
        const list = documents.docs.map(data => ({id: data.id, ...data.data()}))
        return list;
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

    static createStoreListener = (storeId, callback = () => {}, query) => {
        return Service.collection().where('store.id','==',storeId).onSnapshot((result) => {
            const data = result.docs.map(data => ({id: data.id, ...data.data()}));
            callback(data);
        });
    }
};
