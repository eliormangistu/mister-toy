import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'

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


function getDefaultFilter() {
    return { txt: '', maxPrice: '' }
}



