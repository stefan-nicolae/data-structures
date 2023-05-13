class Node {
    constructor(value = undefined) {
        this.value = value
        this.leftNode = undefined
        this.rightNode = undefined
    }
}

class BinarySearchTree {
    insert(value) {
        if(!this.firstNode) {
            this.firstNode = new Node(value)
            return
        }
        const propagate = (node = this.firstNode) => {
            if(value <= node.value) {
                if(!node.leftNode) node.leftNode = new Node(value)
                else propagate(node.leftNode)
            } else {
                if(!node.rightNode) node.rightNode = new Node(value)
                else propagate(node.rightNode)
            }
        }
        propagate()
    }

    //looks the best with positive digits
    display() {
        const findOutDepth = () => {
            let maxDepth = 1
            const propagate = (node = this.firstNode, depth = 1) => {
                if(depth > maxDepth) maxDepth = depth
                if(node.leftNode) propagate(node.leftNode, depth + 1)
                if(node.rightNode) propagate(node.rightNode, depth + 1)
                return
            }
            propagate()
            return maxDepth
        }
        const depth = findOutDepth()
        
        const rows = []
        const getRows = (node = new Node(), level = depth - 1) => {
            if(level === depth - 1) node = this.firstNode
            if(level === -1) return
            if(!rows[level]) rows[level] = []
            rows[level].push(node.value)
            getRows(node.leftNode, level - 1)
            getRows(node.rightNode, level - 1)
        }
        getRows()
        
        const printTree = (level = depth - 1) => {
            if(level === -1) return
            let left = 0, mid = 0, spaces = Math.pow(2, level)
            for(let i = 0; i < level; i++) left += Math.pow(2, i)
            if(level < depth - 1) mid = Math.pow(2, level + 1) - 1
            if(level <= 1) mid = 3
            if(level === 0) { left = 1; spaces = 0;}        
            left -= 1;

            let string = " ".repeat(left)
            rows[level].forEach(item => {
    
                if(item === undefined) item = "*"
                string += "_".repeat(spaces)
                string += item
                string += "_".repeat(spaces)
                string += " ".repeat(mid)
            })
            console.log(string)
            printTree(level - 1)
        }   
        printTree()
    }      

    find(value) {
        const propagate = () => {
            propagate
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}  

const tree = new BinarySearchTree(4);
for(let i = 0; i < 9; i++) {
    tree.insert(getRandomInt(9))
}

tree.display()