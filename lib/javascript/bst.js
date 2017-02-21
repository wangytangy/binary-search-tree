

class Node {

  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  isSubTreeLesser(node, value) {
    if (node === null) return true;
    if (node.val < value &&
        this.isSubTreeLesser(node.left, value) &&
        this.isSubTreeLesser(node.right, value)
    ) {
      return true;
    } else {
      return false;å
    }
  }

  isSubTreeGreater(node, value) {
    if (node === null) return true;
    if (node.val > value &&
        this.isSubTreeGreater(node.left, value) &&
        this.isSubTreeGreater(node.right, value)
    ) {
        return true;
    } else {
        return false;
    }
  }

  isValidBST(root) {
    if (root === null) return true;
    if (this.isSubTreeLesser(root.left, root.val) &&
        this.isSubTreeGreater(root.right, root.val) &&
        this.isValidBST(root.left) &&
        this.isValidBST(root.right)
    ) {
        return true;
    } else {
        return false;
    }
  };

  findMode(root) {
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

  insert(val, node = this.root) {

    if (this.root === null) {
      this.root = new Node(val);
      return;
    }

    if (node === null) {
      return new Node(val);
    }

    if (val <= node.val) {
      node.left = this.insert(val, node.left);
    } else {
      node.right = this.insert(val, node.right);
    }

    return node;
  }

  min(node = this.root) {
    if (node.left === null) return node;
    return this.min(node.left);
  }

  max(node = this.root) {
    if (node.right === null) return node;
    return this.max(node.right);
  }

  find(val, node = this.root) {
    if (node === null) return null;
    if (val === node.val) return node;

    if (val <= node.val) {
      return this.find(val, node.left);
    } else if (val > node.val) {
      return this.find(val, node.right);
    }
  }

  height(node = this.root) {
    if (node === null) return -1;
    let leftHeight = 1;
    let rightHeight = 1;

    leftHeight += this.height(node.left);
    rightHeight += this.height(node.right);
    return Math.max(leftHeight, rightHeight);
  }

  deleteMin(node = this.root) {
    if (node.left) {
      node.left = this.deleteMin(node.left);
      return node;
    } else {
      return node.right;
    }
  }

  delete(val, node = this.root) {
    if (node === null) return null;

    // doesn't delete duplicates version < not <=
    if (val < node.val) {
      node.left = this.delete(val, node.left);
    } else if (val > node.val) {
      node.right = this.delete(val, node.right);
    }

    if (node.val === val) {
      //if leaf node (no children)
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      //if one child exists, return it
      if (node.left === null && node.right) { return node.right }
      if (node.right === null && node.left) { return node.left }

      // if two children exist
    }


    return node;
  }

  inorder(node = this.root) {
    if (node === null) return [];

    let left = this.inorder(node.left);
    let right = this.inorder(node.right);

    return left.concat().concat([node]).concat(right);
  }

  preorder(node = this.root) {
    if (node === null) return [];

    let left = this.inorder(node.left);
    let right = this.inorder(node.right);

    return [node].concat(left).concat(right);
  }

  postorder(node = this.root) {
    if (node === null) return [];

    let left = this.inorder(node.left);
    let right = this.inorder(node.right);

    return left.concat(right).concat([node]);
  }

  dfs() {

  }

  bfs() {

  }

}

let tree = new BinarySearchTree();
tree.insert(5);
tree.insert(3);
tree.insert(6);
// tree.insert(2);
tree.insert(4);
tree.insert(7);

tree.delete(3);
// console.log(JSON.stringify(tree.preorder(), null, 4));
console.log(JSON.stringify(tree, null, 4));
