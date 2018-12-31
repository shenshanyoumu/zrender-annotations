//基于双向链表实现简单的LRU缓存对象
var LinkedList = function() {
  // 链表头部的节点在LRU替换过程中首先被替换
  this.head = null;
  this.tail = null;
  this._len = 0;
};

var linkedListProto = LinkedList.prototype;

linkedListProto.insert = function(val) {
  var entry = new Entry(val);
  this.insertEntry(entry);
  return entry;
};

/**
 * 在链表尾部插入节点
 */
linkedListProto.insertEntry = function(entry) {
  if (!this.head) {
    this.head = this.tail = entry;
  } else {
    this.tail.next = entry;
    entry.prev = this.tail;
    entry.next = null;
    this.tail = entry;
  }
  this._len++;
};

/**
 * 移除特定的记录节点
 */
linkedListProto.remove = function(entry) {
  var prev = entry.prev;
  var next = entry.next;
  if (prev) {
    prev.next = next;
  } else {
    // 如果被移除的是头部节点，则重置头部指针
    this.head = next;
  }
  if (next) {
    next.prev = prev;
  } else {
    // 如果被移除的是尾部节点，则重置尾部指针
    this.tail = prev;
  }
  entry.next = entry.prev = null;
  this._len--;
};

/**
 * 链表长度
 */
linkedListProto.len = function() {
  return this._len;
};

/**
 * 清空链表
 */
linkedListProto.clear = function() {
  this.head = this.tail = null;
  this._len = 0;
};

/**
 * 链表中元素实例
 * @param {*} val 节点值
 */
var Entry = function(val) {
  this.value = val;

  // 双向链表，两个指针
  this.next;
  this.prev;
};

/**
 * LRU对象
 * @param {*} maxSize LRU缓冲对象最大尺寸
 */
var LRU = function(maxSize) {
  // 双向链表实例
  this._list = new LinkedList();

  //   为了加快链表遍历效率，可以将链表中的键值对保存在map结构中
  this._map = {};

  //   缓存对象的最大尺寸
  this._maxSize = maxSize || 10;

  //   最近被移除的节点
  this._lastRemovedEntry = null;
};

var LRUProto = LRU.prototype;

/**
 * 在LRU对象中保存键值对
 */
LRUProto.put = function(key, value) {
  var list = this._list;
  var map = this._map;
  var removed = null;

  //如果新添加的键值对
  if (map[key] == null) {
    var len = list.len();
    var entry = this._lastRemovedEntry;

    // 如果LRU已经满，则需要进行替换操作
    if (len >= this._maxSize && len > 0) {
      //  删除最近最少使用的节点，并删除map结构中对应键值对
      var leastUsedEntry = list.head;
      list.remove(leastUsedEntry);
      delete map[leastUsedEntry.key];

      removed = leastUsedEntry.value;
      this._lastRemovedEntry = leastUsedEntry;
    }

    if (entry) {
      entry.value = value;
    } else {
      entry = new Entry(value);
    }

    entry.key = key;
    list.insertEntry(entry);
    map[key] = entry;
  }

  return removed;
};

/**
 * 如果LRU中某个记录节点再次被访问，则需要将给节点移动到链表尾部插入
 * 表示该节点是处于活跃状态的
 */
LRUProto.get = function(key) {
  var entry = this._map[key];
  var list = this._list;
  if (entry != null) {
    if (entry !== list.tail) {
      list.remove(entry);
      list.insertEntry(entry);
    }

    return entry.value;
  }
};

/**
 * Clear the cache
 */
LRUProto.clear = function() {
  this._list.clear();
  this._map = {};
};

export default LRU;
