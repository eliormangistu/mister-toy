import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'

_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}

function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(BASE_URL, toy)
    } else {
        return storageService.post(BASE_URL, toy)
    }
}

function getEmptyToy() {
    return {
        _id: utilService.makeId(4),
        name: '',
        price: utilService.getRandomIntInclusive(100, 300),
        labels: ['Doll', 'Battery Powered', 'Baby'],
        createdAt: Date.now(),
        inStock: true,
    }
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    console.log(toys);
    if (!toys || !toys.length) {

        toys = [
            {
                "_id": "t101",
                "name": "Talking Doll",
                "price": 123,
                "labels": [
                    "Doll",
                    "Battery Powered",
                    "Baby"
                ],
                "createdAt": 1631031801011,
                "inStock": true
            },
            {
                "_id": "t102",
                "name": "Bratz Doll",
                "price": 123,
                "labels": [
                    "Doll",
                    "Battery Powered",
                    "Baby"
                ],
                "createdAt": 1631031801011,
                "inStock": true
            },
            {
                "_id": "t103",
                "name": "Barbie Doll",
                "price": 123,
                "labels": [
                    "Doll",
                    "Battery Powered",
                    "Baby"
                ],
                "createdAt": 1631031801011,
                "inStock": true
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '' }
}



