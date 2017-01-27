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

  end

  def insert(value)

  end

  def find(value)

  end

  def inorder

  end

  def postorder

  end

  def preorder

  end

  def height

  end

  def min

  end

  def max

  end

  def delete(value)

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
    return [node.value] if node.left.nil? && node.right.nil?

    return BinarySearchTree.inorder!(node.left) + [node.value] + BinarySearchTree.inorder!(node.right)


  end

  def self.postorder!(node)

  end

  def self.height!(node)
    return -1 unless node
    return 0 if node.left.nil? && node.right.nil?
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


end
