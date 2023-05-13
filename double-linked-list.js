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
}

// const linkedList = new DoubleLinkedList([1,23,34,234])
// linkedList.insert(1, linkedList.firstNode.nextNode.nextNode)
// console.log(linkedList.toArray())