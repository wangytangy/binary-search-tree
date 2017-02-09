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

}
