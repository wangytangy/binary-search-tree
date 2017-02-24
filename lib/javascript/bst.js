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

  checkBST(node = this.root, max = null, min = null) {
    if (node === null) return true;
    if (max && node.val > max) return false;
    if (min && node.val <= min) return false;

    return this.checkBST(node.left, node.val, min) &&
    this.checkBST(node.right, max, node.val);
  }

  isSubTreeLesser(node, value) {
    if (node === null) return true;
    if (node.val < value &&
        this.isSubTreeLesser(node.left, value) &&
        this.isSubTreeLesser(node.right, value)
    ) {
      return true;
    } else {
      return false;
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

    //if no root exists, first insert will be the root node;
    if (this.root === null) {
      this.root = new Node(val);
      return;
    }

    if (node === null) {
      return new Node(val);
    }

    if (val <= node.val) {
      //if we've reached a leaf node, next recursive call will hit null;
      //insert(val) will create a new node and return it
      //just append it to node.left/right
      node.left = this.insert(val, node.left);
    } else {
      node.right = this.insert(val, node.right);
    }

    return node;
  }

  min(node = this.root) {
    // min node has no more left children;
    if (node.left === null) return node;
    return this.min(node.left);
  }

  max(node = this.root) {
    // max node has no more right children;
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
    if (node === null) return null;

    //if it has no left node, return the right child so it can be reattached
    if (node.left === null) return node.right;
    node.left = this.deleteMin(node.left);

    return node;
  }

  delete(val, node = this.root) {
    if (node === null) return null;

    // doesn't delete duplicates version: use <, not <=
    if (val < node.val) {
      node.left = this.delete(val, node.left);
    } else if (val > node.val) {
      node.right = this.delete(val, node.right);
    } else {
      //if leaf node (no children)
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      //if one child exists, return it
      if (!node.right) { return node.left }
      if (!node.left) { return node.right }

      // if two children exist
      // 1 find the minimum value in right children
      // 2 copy the value in the targetted node
      // 3 delete duplicate from right subtree
      let temp = node;
      node = this.min(node.right);

      //reconnect new node with original node's left and right
      /** this works because we know the min node has at most 1 child
          and delete recursively works on nodes w/ 1 or 0 children
      **/
      node.right = this.delete(node.val, temp.right);
      node.left = temp.left;
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

  dfs(target, node = this.root) {
    if (node.val === target) return node;

    let children = [];
    if (node.left) children.push(node.left);
    if (node.right) children.push(node.right);

    for (let i = 0; i < children.length; i++) {
      //recursively calls dfs on child
      //return node if there's a match
      let child = children[i];
      let answer = this.dfs(target, child);
      if (answer !== null) return answer;
    }

    return null;
  }

  bfs(target, node = this.root) {
    //returns the node that matches the val
    let queue = [node];
    while (queue.length > 0) {
      let currentNode = queue[0];
      if (currentNode.val === target) {
        return currentNode;
      }
      //add children to queue
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
      //shift examined node
      queue.shift();
    }
    return null;
  }

  balanceTree() {
    // traverse tree inorder to get sorted array of all values
    let values = this.inorder();
    values = values.map((node) => {
      return node.val;
    });

    // convert sorted array into balanced tree
    this.root = BinarySearchTree.sortedArrayToBalancedBST(values);
    return this;
  }

  isBalanced(node = this.root) {
    // difference between left subtree and right subtree is not > 1
    let left_height = this.height(node.left);
    let right_height = this.height(node.right);
    return Math.abs(left_height - right_height) <= 1;
  }

  _dupSubtree() {
    //doesn't apply to BST because it doesn't have duplicate structures
    let memo = {};

    this.serializeTree(this.root, memo);
    console.log(memo);
  }

  serializeTree(node = this.root, memo = {}) {
    if (node === null) return "";

    let str = `${node.val}`;
    str += `(${this.serializeTree(node.left)})`;
    str += `(${this.serializeTree(node.right)})`;

    if (memo[str]) {
      memo[str] += 1;
    } else {
      memo[str] = 1;
    }

    return str;
  }

}

BinarySearchTree.sortedArrayToBalancedBST = function(array, start = 0, end = array.length - 1) {
    /** get midde of array and make it the root;
      recursively do the same for left and right half;
      get middle of left half, make it the left child of the root;
      get middle of right half, make it right child of root; **/

  if (start > end) return null;
  let mid = Math.floor((start + end)/2);
  let root = new Node(array[mid]);

  root.left = BinarySearchTree.sortedArrayToBalancedBST(array, start, mid - 1);
  root.right = BinarySearchTree.sortedArrayToBalancedBST(array, mid + 1, end);

  return new BinarySearchTree().root = root;
}


//
let tree = new BinarySearchTree();
[5, 3, 6, 2, 7, 1, 8].forEach((val) => tree.insert(val));
tree.balanceTree();
tree.dupSubtree();


// console.log(JSON.stringify(tree, null, 4));
