const { Node } = require('../extensions/list-tree.js');

class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const node = new Node(data);
    if (!this._root) {
      this._root = node;
      return;
    }
    let current = this._root;
    while (current.data !== data) {
      const side = data < current.data ? 'left' : 'right';
      if (!current[side]) {
        current[side] = node;
        return;
      }
      current = current[side];
    }
  }

  find(data) {
    let current = this._root;
    while (current && current.data !== data) {
      current = data < current.data ? current.left : current.right;
    }
    return current;
  }

  has(data) {
    return this.find(data) !== null;
  }

  remove(data) {
    let parent = null;
    let current = this._root;
    while (current && current.data !== data) {
      parent = current;
      current = data < current.data ? current.left : current.right;
    }
    if (!current) return;

    if (current.left && current.right) {
      let successorParent = current;
      let successor = current.right;
      while (successor.left) {
        successorParent = successor;
        successor = successor.left;
      }
      current.data = successor.data;
      parent = successorParent;
      current = successor;
    }
    const child = current.left || current.right;
    if (!parent) this._root = child;
    else if (parent.left === current) parent.left = child;
    else parent.right = child;
  }

  min() {
    let current = this._root;
    if (!current) return null;
    while (current.left) current = current.left;
    return current.data;
  }

  max() {
    let current = this._root;
    if (!current) return null;
    while (current.right) current = current.right;
    return current.data;
  }
}

module.exports = { BinarySearchTree };
