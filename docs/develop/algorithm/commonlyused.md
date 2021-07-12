# 常用算法

## 找出某个节点的所有父节点

```js
var json = [{
  "Id": "8797095327872057671",
  "MenuName": "Node1",
  "Children": [{
    "Id": "8797095327872057672",
    "MenuName": "Node2",
    "Children": [{
      "Id": "8797095327872057681",
      "MenuName": "Node3",
      "Children": [{
        "Id": "8797095327872057808",
        "MenuName": "Node4",
        "Children": []
      }, ]
    }, ]
  }, {
    "Id": "8797095327872057673",
    "MenuName": "Node5",
    "Children": []
  }]
}];
function find(data, id, arr) {
  if (!arr) {
    arr = []
  }
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if (element.Id == id) {
      //找到返回
      return arr;
    }
    if (element.Children.length > 0) {
      if (find(element.Children, id, arr)) {
        arr.push(element.Id)
        //将父节点添加到arr，继续返回true
        return arr;
      }
    }
  }
}
console.log(find(json, "8797095327872057808"))
//["8797095327872057681", "8797095327872057672", "8797095327872057671"]
```

## 简单格式的(pid)treeData转复杂格式(children)

### 1

```js
var arr = [{
    'id': 1,
    'parentid': 0
  },
  {
    'id': 4,
    'parentid': 2
  },
  {
    'id': 3,
    'parentid': 1
  },
  {
    'id': 5,
    'parentid': 0
  },
  {
    'id': 6,
    'parentid': 0
  },
  {
    'id': 2,
    'parentid': 1
  },
  {
    'id': 7,
    'parentid': 4
  },
  {
    'id': 8,
    'parentid': 1
  }
];
function unflatten(arr) {
  var tree = [],
    mappedArr = {},
    arrElem,
    mappedElem;
  // First map the nodes of the array to an object -> create a hash table.
  for (var i = 0, len = arr.length; i < len; i++) {
    arrElem = arr[i];
    mappedArr[arrElem.id] = arrElem;
    mappedArr[arrElem.id]['children'] = [];
  }
  for (var id in mappedArr) {
    if (mappedArr.hasOwnProperty(id)) {
      mappedElem = mappedArr[id];
      // If the element is not at the root level, add it to its parent array of children.
      if (mappedElem.parentid) {
        mappedArr[mappedElem['parentid']]['children'].push(mappedElem);
      }
      // If the element is at the root level, add it to first level elements array.
      else {
        tree.push(mappedElem);
      }
    }
  }
  return tree;
}
var tree = unflatten(arr);
console.log(tree);
document.body.innerHTML = "<pre>" + (JSON.stringify(tree, null, " "))
```

[http://jsfiddle.net/alexandrupausan/qjxpLhfu/](http://jsfiddle.net/alexandrupausan/qjxpLhfu/)

### 2

```js
var json = [{
    id: "105",
    pId: "13",
    name: "105"
  },
  {
    id: "1005",
    pId: "105",
    name: "1005"
  },
  {
    id: "10",
    pId: "1",
    name: "10"
  },
  {
    id: "1001",
    pId: "100",
    name: "1001"
  },
  {
    id: "10001",
    pId: "1001",
    name: "10001"
  },
  {
    id: "11",
    pId: "1",
    name: "11"
  },
  {
    id: "1000",
    pId: "100",
    name: "1000"
  },
  {
    id: "100",
    pId: "10",
    name: "100"
  },
  {
    id: "101",
    pId: "11",
    name: "101"
  },
  {
    id: "1002",
    pId: "101",
    name: "1002"
  },
  {
    id: "103",
    pId: "11",
    name: "102"
  },
  {
    id: "13",
    pId: "1",
    name: "13"
  }
];
function abc(obj, arr) {
  for (let j = 0; j < arr.length; j++) {
    const item = arr[j];
    if (obj.pId == item.id) {
      item.chriden = item.chriden || [];
      item.chriden.push(obj);
      return true;
    }
    if (item.chriden) {
      if (abc(obj, item.chriden)) {
        return true;
      }
    }
  }
}
function test(arr) {
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (abc(element, arr)) {
      arr.splice(index, 1);
      test(arr);
      return;
    }
  }
}
test(json);
console.log(json);
document.body.innerHTML = "<pre>" + (JSON.stringify(json, null,"  "))
```