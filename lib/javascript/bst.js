class Node() {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}

class BinarySearchTree() {
  constructor() {
    this.root = null;
  }

  isSubTreeLesser(node, value) {
    if (node === null) return true;
    if (node.val < value &&
        isSubTreeLesser(node.left, value) &&
        isSubTreeLesser(node.right, value)
    ) {
        return true;
    } else {
        return false;
    }
  }

  isSubTreeGreater(node, value) {
    if (node === null) return true;
    if (node.val > value &&
        isSubTreeGreater(node.left, value) &&
        isSubTreeGreater(node.right, value)
    ) {
        return true;
    } else {
        return false;
    }
  }

  isValidBST = function(root) {
    if (root === null) return true;
    if (isSubTreeLesser(root.left, root.val) &&
        isSubTreeGreater(root.right, root.val) &&
        isValidBST(root.left) &&
        isValidBST(root.right)
    ) {
        return true;
    } else {
        return false;
    }
  };

  findMode = function(root) {
    let count = {}
    let children = [root]
    let node = root;

    while (children.length !== 0) {
        if (node) {
            if (count[node.val]) {
                count[node.val] += 1
            } else {
                count[node.val] = 1
            }
            //add children to queue
            if (node.left) { children.push(node.left) }
            if (node.right) { children.push(node.right) }
        }
        //delete the examined node from front of queue
        children.shift();
        //reset node to next in line
        node = children[0];
    }

    let max = Math.max.apply(null, Object.values(count));

    return Object.keys(count).filter((key) => {
        return count[key] === max;
    }).map(key => parseInt(key));
  };


}
