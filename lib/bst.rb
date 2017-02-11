require 'byebug'

class BSTNode
  attr_accessor :left, :right
  attr_reader :value

  def initialize(value)
    @value = value
    @left = nil
    @right = nil
  end

  def to_s
    "value: #{@value}, left: #{@left.value if @left}, right: #{@right.value if @right}"
  end
end

class BinarySearchTree
  def initialize
    @root = nil
  end

  def insert(value)
    if !@root
      @root = BSTNode.new(value)
      return
    end

    BinarySearchTree.insert!(@root, value)

  end

  def find(value)
    BinarySearchTree.find!(@root, value)
  end

  def inorder
    BinarySearchTree.inorder!(@root)
  end

  def postorder
    BinarySearchTree.postorder!(@root)
  end

  def preorder
    BinarySearchTree.preorder!(@root)
  end

  def height
    BinarySearchTree.height!(@root)
  end

  def min
    BinarySearchTree.min(@root)
  end

  def max
    BinarySearchTree.max(@root)
  end

  def delete(value)
    BinarySearchTree.delete!(@root, value)
  end

  def dfs(target)
    BinarySearchTree.dfs(@root, target)
  end

  def level_order_traversal
    BinarySearchTree.level_order_traversal(@root)
  end

  def self.insert!(node, value)
    return BSTNode.new(value) if node.nil?

    if value <= node.value
      node.left = BinarySearchTree.insert!(node.left, value)
    elsif value > node.value
      node.right = BinarySearchTree.insert!(node.right, value)
    end

    node
  end

  def self.find!(node, value)
    return nil unless node
    return node if node.value == value

    if value <= node.value
      return BinarySearchTree.find!(node.left, value)
    elsif value > node.value
      return BinarySearchTree.find!(node.right, value)
    end

  end

  def self.preorder!(node)
    return [] unless node

    left = BinarySearchTree.preorder!(node.left)
    right = BinarySearchTree.preorder!(node.right)

    return [node.value] + left + right
  end

  def self.inorder!(node)
    return [] unless node

    left = BinarySearchTree.inorder!(node.left)
    right = BinarySearchTree.inorder!(node.right)

    return left + [node.value] + right
  end

  def self.postorder!(node)
    return [] unless node

    left = BinarySearchTree.postorder!(node.left)
    right = BinarySearchTree.postorder!(node.right)

    return left + right + [node.value]
  end

  def self.height!(node)
    return -1 unless node
    left_height = 1
    right_height = 1

    left_height += BinarySearchTree.height!(node.left)
    right_height += BinarySearchTree.height!(node.right)

    return [left_height, right_height].max
  end

  def self.max(node)
    return node if node.right.nil?
    BinarySearchTree.max(node.right)
  end

  def self.min(node)
    return node if node.left.nil?
    BinarySearchTree.min(node.left)
  end

  def self.delete_min!(node)
    return nil unless node
    return node.right if node.left == nil

    node.left = BinarySearchTree.delete_min!(node.left)
    node
  end

  def self.delete!(node, value)
    return nil unless node

    if value < node.value
      node.left = BinarySearchTree.delete!(node.left, value) if node.left
    else
      node.right = BinarySearchTree.delete!(node.right, value) if node.right
    end

    if node.value == value
      if node.left == nil && node.right == nil
        node = nil
      elsif node.left
        node = node.left
      else
        node = node.right
      end
    end

    node
  end

  def self.mode(node)

  end

  def self.average(node)
    
  end

  def self.dfs(node, target)
    return node if node.value == target

    children = []
    #check for children and add them to stack
    children.push(node.left) if node.left
    children.push(node.right) if node.right

    #search children
    children.each do |child|
      result = BinarySearchTree.dfs(child, target)
      return result unless result.nil?
    end

    nil
  end

  def self.level_order_traversal(node)
    children = [node]
    children.each do |child|
        children.push(child.left) if child.left
        children.push(child.right) if child.right
    end
    children.each { |child| puts child }
  end




end

tree = BinarySearchTree.new
[4, 2, 1, 3, 0, 9, 8, 10, 16].each do |n|
  tree.insert(n)
end

tree.level_order_traversal

# puts tree.dfs(9)
