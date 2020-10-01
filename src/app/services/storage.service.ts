import {Injectable} from '@angular/core';
import {Plugins} from '@capacitor/core';
import {Constants} from '../utils/constants';

const {Storage} = Plugins;

@Injectable({
    providedIn: 'root'
})
export class StorageService {


    constructor() {

    }


    removeValueInStorage(key) {
        return Storage.remove({key});
    }


    saveToStorage(key, value) {
        return Storage.set({key, value});
    }

    getStorage(key) {
        return Storage.get({key});
    }

    async getValueStorage(key) {
        return Storage.get({key: `${Constants.API_STORAGE_EKEY}-${key}`}).then((val) => {
            return val;
        });

    }

    async emptyStorage() {
        Storage.clear();
    }

    setLocalData(key, data) {
        Storage.set({key: `${Constants.API_STORAGE_EKEY}-${key}`, value: data.toString()});
    }


    getLocalData(key) {
        return Storage.get({key: `${Constants.API_STORAGE_EKEY}-${key}`});
    }
}
