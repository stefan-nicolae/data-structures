class Node {
    constructor(value, prevNode, nextNode) {
        this.value = value
        this.prevNode = prevNode
        this.nextNode = nextNode
    }
}

export class DoubleLinkedList {
    constructor(valuesArray = []) {
        const nodesArray = [] 
        valuesArray.forEach(value => {
            nodesArray.push(new Node(value))
        })
        for(let i = 0; i < nodesArray.length; i++) {
            if(nodesArray[i + 1]) {
                nodesArray[i].nextNode = nodesArray[i + 1]
            }
            if(nodesArray[i - 1]) {
                nodesArray[i].prevNode = nodesArray[i - 1]
            }
        }
        this.firstNode = nodesArray[0]
        this.lastNode = nodesArray[nodesArray.length - 1]

    }

    insert(value, targetNode = this.lastNode) {
        try {
            if(!this.firstNode) {
                this.firstNode = new Node(value) 
                this.lastNode = this.firstNode
                return
            }
            

            if(targetNode === this.lastNode) {
                this.lastNode.nextNode = new Node(value, this.lastNode)
                this.lastNode = this.lastNode.nextNode
            } else {
                const tempNextNode = targetNode.nextNode
                targetNode.nextNode = new Node(value, targetNode, tempNextNode)
            }
        } catch(err) {
             console.error("Node not found or value not fitting")
        }
    }

    getNodeIndex(targetNode) {
        try {
            const incrementCounter = (node = this.firstNode, counter = 0) => { 
                if(node !== targetNode) {
                    return incrementCounter(node.nextNode, counter + 1)
                }
                else return counter
            }
            return incrementCounter() 
        } catch {
            console.error("Node not found")
        }
    }

    getNodeByIndex(index) {
        try {
            const incrementCounter = (node = this.firstNode, counter = 0) => { 
                if(counter !== index) {
                    return incrementCounter(node.nextNode, counter + 1)
                }
                else return node
            }
            return incrementCounter()
        } catch {
            console.error("Index not found")
        }
    }

    find(value) {
        const recursive = (node = this.firstNode) => {
            if(!node) return false
            if(node.value === value) return node
            else if(typeof node.value === "object" && typeof value === "object" && 
                JSON.stringify(node.value) === JSON.stringify(value)) return node
            if(node.nextNode) return recursive(node.nextNode)
            else return false
        }
        return recursive()
    }

    toArray() {
        const arr = []
        const recursive = (node = this.firstNode) => {
            if(!node) {
                console.error("List Empty")
                return
            }
            arr.push(node.value)
            if(node.nextNode) return recursive(node.nextNode)
            else return arr
        }
        return recursive()
    }

    remove(node) {
        if(node.prevNode) {
            if(node.nextNode) node.prevNode.nextNode = node.nextNode
            else node.prevNode.nextNode = undefined
        }
        if(node.nextNode) {
            if(node.prevNode) node.nextNode.prevNode = node.prevNode
            else node.nextNode.prevNode = undefined
        }
        node.value = undefined
        node.prevNode = undefined
        node.nextNode = undefined
    }   
}

// const linkedList = new DoubleLinkedList([1,23,34,234])
// // linkedList.insert(1, linkedList.firstNode.nextNode.nextNode)
// console.log(linkedList.toArray())
// linkedList.remove(linkedList.getNodeByIndex(2))
// console.log(linkedList.toArray())
// // console.log(linkedList.find(230))
