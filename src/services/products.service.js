import firebase from 'firebase/app';
import 'firebase/firestore';
export default class Service {

    static collection = () => firebase.firestore().collection('products');

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

    static createStoreProductsListener = (storeId, callback = () => {}, query) => {
        return Service.collection().where('store.id','==',storeId).onSnapshot((result) => {
            const data = result.docs.map(data => ({id: data.id, ...data.data()}));
            callback(data);
        });
    }


    static updateQtyBulk = async products => {
        try {
            const productIds = Object.keys(products);
            await Promise.all(productIds.map(async productId => {
                const product = products[productId];

                if(product.add && !Number.isNaN(product.add)) {
                    await Service.collection().doc(productId).update({
                        stockQty: firebase.firestore.FieldValue.increment(Number(product.add)),
                    })
                }

                if(product.minus && !Number.isNaN(product.minus)) {
                    await Service.collection().doc(productId).update({
                        stockQty: firebase.firestore.FieldValue.increment(Number(product.minus * -1)),
                    })
                }
            }))

        } catch (err){
            throw err;
        }

    }
};
