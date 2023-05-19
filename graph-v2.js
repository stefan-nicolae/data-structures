class Node {
    constructor(name) {
        this.name = name
        this.friends = {}
    }
}

class Graph {
    constructor() {
        this.firstNode = undefined
    }

    connect(node1, node2, distance, twoWay = true) {
        node1.friends[node2] = distance
        if(twoWay) node2.friends[node1] = distance
        if(!this.firstNode) this.firstNode = node1
    } 
}

const graph = new Graph()
graph.connect(new Node("A"), new Node("B"), 4)
console.log(graph.firstNode)