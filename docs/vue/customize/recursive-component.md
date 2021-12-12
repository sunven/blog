# 递归组件

## Tree.vue

```javascript
<template>
  <div>
    <TreeNode
      class="tree"
      v-for="item in data"
      :key="item.id"
      :node="item"
    ></TreeNode>
  </div>
</template>

<script>
import TreeNode from "@/components/TreeNode.vue";
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  components: { TreeNode }
};
</script>

<style lang="scss" scoped>
.tree {
  text-align: left;
}
</style>
```

## TreeNode.vue

```javascript
<template>
  <div>
    <div
      @click="toggle"
      :style="{paddingLeft}"
    >
      <label for="">{{node.text}}</label><span v-if="hasChild">{{open?"-":"+"}}</span>
    </div>
    <div
      v-if="hasChild"
      v-show="open"
    >
      <tree-node
        v-for="item in node.children"
        :node="item"
        :key="item.id"
        :level="level+1"
      ></tree-node>
    </div>
  </div>
</template>

<script>
export default {
  name: "tree-node",
  props: {
    node: {
      type: Object
    },
    level: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      open: false
    };
  },
  computed: {
    hasChild() {
      return this.node.children && this.node.children.length > 0;
    },
    paddingLeft() {
      return this.level - 1 + "em";
    }
  },
  methods: {
    toggle() {
      if (this.hasChild) {
        this.open = !this.open;
      }
    }
  }
};
</script>
```

## data

```javascript
;[
  {
    id: '00',
    text: '中国',
    children: [
      {
        id: '01',
        text: '湖北',
        children: [
          {
            id: '0101',
            text: '武汉',
            children: [
              { id: '010101', text: '光谷' },
              { id: '010102', text: '江夏' },
            ],
          },
          {
            id: '0102',
            text: '宜昌',
            children: [
              {
                id: '010201',
                text: '远安',
                children: [{ id: '01020101', text: '河口' }],
              },
              { id: '010202', text: '当阳' },
            ],
          },
        ],
      },
      {
        id: '02',
        text: '上海',
        children: [
          { id: '0201', text: '黄埔' },
          {
            id: '0202',
            text: '长宁',
            children: [
              { id: '020101', text: '金钟路' },
              { id: '020202', text: '北新泾' },
            ],
          },
        ],
      },
      { id: '03', text: '北京' },
    ],
  },
]
```
