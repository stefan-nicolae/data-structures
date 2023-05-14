import {DoubleLinkedList} from "./double-linked-list.js"
import sha256 from 'crypto-js/sha256.js';

class HashTable {
    constructor() {
        this.table = []
        this.capacity = 10
    }

    insert(name, key) {
        const hash = sha256(key)
        const index = parseFloat(hash.words)%this.capacity
        if(!this.table[index]) this.table[index] = new DoubleLinkedList()
        if(!this.table[index].find({hash: hash, name: name})) this.table[index].insert({hash: hash, name: name})
    }

    check(name, key) {
        const hash = sha256(key)
        const index = parseFloat(hash.words)%this.capacity
        if(this.table[index] && this.table[index].find({hash: hash, name: name})) return true
        return false
    }    
}

const HT = new HashTable()
HT.insert("Stefan", "12345")
console.log(HT.check("Stefan", "12345"))