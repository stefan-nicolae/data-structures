
import {DoubleLinkedList} from "./double-linked-list.js"

class Node {
    constructor(ID) {
        this.ID = ID
    }
}

class AdjacencyMatrix {
    constructor() {
        this.matrix = []
    }

    insert(firstNode, secondNode, twoWay = true) {
        if(!this.matrix[firstNode.ID]) this.matrix[firstNode.ID] = []
        if(!this.matrix[secondNode.ID]) this.matrix[secondNode.ID] = []
        this.matrix[firstNode.ID][secondNode.ID] = true
        if(twoWay) this.matrix[secondNode.ID][firstNode.ID] = true
    }

    check(firstNodeID, secondNodeID, twoWay = true) {  
        try {
            if(this.matrix[firstNodeID][secondNodeID]) {
                if(!twoWay) {
                    if(!this.matrix[secondNodeID][firstNodeID]) return true
                } else {
                    if(this.matrix[secondNodeID][firstNodeID]) return true
                }
                return false
            }
        } catch(err) {
            console.error("Nodes not found")
            return false
        }
    }

    printMatrix() {
        console.log(this.matrix)
    }
}

class AdjacencyList {
    constructor() {
        this.list = []
    }
    
    insert(node1, node2, twoWay=true) {
        if(!this.list[node1.ID]) this.list[node1.ID] = new DoubleLinkedList()
        else if(this.list[node1.ID].find(node2.ID)) return        
        this.list[node1.ID].insert(node2.ID)
        if(twoWay) this.insert(node2, node1, false)
    }

    check(firstNodeID, secondNodeID, twoWay=true) {
        try {
            if(this.list[firstNodeID].find(secondNodeID)) {
                if(!twoWay) {
                    if(this.list[secondNodeID] && !this.list[secondNodeID].find(firstNodeID)) return true
                } else {
                    if(this.list[secondNodeID] && this.list[secondNodeID].find(firstNodeID)) return true
                }
                return false
            }
        } catch(err) {
            console.log(err)
            console.error("Nodes not found")
            return false
        }
    }
}

const test = new AdjacencyMatrix()
test.insert(new Node(1), new Node(2))
console.log(test.check(1, 2))

const test1 = new AdjacencyList()
test1.insert(new Node(1), new Node(2), false)
console.log(test1.check(1, 2))

