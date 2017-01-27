require 'byebug'

class BSTNode
  attr_accessor :left, :right
  attr_reader :value

  def initialize(value)
    @value = value
    @left = nil
    @right = nil
  end
end

class BinarySearchTree
  def initialize
    @root = nil
  end

  def insert(value)
    if !@root
      @root = BSTNode.new(value)
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

  end

  def preorder

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

  end

  def self.inorder!(node)
    return [] unless node

    left = BinarySearchTree.inorder!(node.left)
    right = BinarySearchTree.inorder!(node.right)

    return left + [node.value] + right
  end

  def self.postorder!(node)

  end

  def self.height!(node)
    return -1 unless node
    1 + [BinarySearchTree.height!(node.left), BinarySearchTree.height!(node.right)].max
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


end
