# compiler

```json
{
  "type": 1,
  "tag": "div",
  "attrsList": [
    {
      "name": "id",
      "value": "app"
    }
  ],
  "attrsMap": {
    "id": "app"
  },
  "rawAttrsMap": {
    "id": {
      "name": "id",
      "value": "app"
    }
  },
  "children": [
    {
      "type": 1,
      "tag": "p",
      "attrsList": [],
      "attrsMap": {
        "v-if": "count===1"
      },
      "rawAttrsMap": {
        "v-if": {
          "name": "v-if",
          "value": "count===1"
        }
      },
      "children": [
        {
          "type": 2,
          "expression": "\"1:\"+_s(count)",
          "tokens": [
            "1:",
            {
              "@binding": "count"
            }
          ],
          "text": "1:{{ count }}",
          "static": false
        }
      ],
      "if": "count===1",
      "ifConditions": [
        {
          "exp": "count===1",
          "block": {
            "type": 1,
            "tag": "p",
            "attrsList": [],
            "attrsMap": {
              "v-if": "count===1"
            },
            "rawAttrsMap": {
              "v-if": {
                "name": "v-if",
                "value": "count===1"
              }
            },
            "children": [
              {
                "type": 2,
                "expression": "\"1:\"+_s(count)",
                "tokens": [
                  "1:",
                  {
                    "@binding": "count"
                  }
                ],
                "text": "1:{{ count }}",
                "static": false
              }
            ],
            "if": "count===1",
            "plain": true,
            "static": false,
            "staticRoot": false,
            "ifProcessed": true
          }
        },
        {
          "exp": "count===2",
          "block": {
            "type": 1,
            "tag": "span",
            "attrsList": [],
            "attrsMap": {
              "v-else-if": "count===2"
            },
            "rawAttrsMap": {
              "v-else-if": {
                "name": "v-else-if",
                "value": "count===2"
              }
            },
            "children": [
              {
                "type": 2,
                "expression": "\"2:\"+_s(count)",
                "tokens": [
                  "2:",
                  {
                    "@binding": "count"
                  }
                ],
                "text": "2:{{ count }}",
                "static": false
              }
            ],
            "elseif": "count===2",
            "plain": true,
            "static": false,
            "staticRoot": false
          }
        },
        {
          "block": {
            "type": 1,
            "tag": "div",
            "attrsList": [],
            "attrsMap": {
              "v-else": ""
            },
            "rawAttrsMap": {
              "v-else": {
                "name": "v-else",
                "value": ""
              }
            },
            "children": [
              {
                "type": 2,
                "expression": "\"other:\"+_s(count)",
                "tokens": [
                  "other:",
                  {
                    "@binding": "count"
                  }
                ],
                "text": "other:{{ count }}",
                "static": false
              }
            ],
            "else": true,
            "plain": true,
            "static": false,
            "staticRoot": false
          }
        }
      ],
      "plain": true,
      "static": false,
      "staticRoot": false,
      "ifProcessed": true
    },
    {
      "type": 3,
      "text": " ",
      "static": true
    },
    {
      "type": 1,
      "tag": "ul",
      "attrsList": [],
      "attrsMap": {},
      "rawAttrsMap": {},
      "children": [
        {
          "type": 1,
          "tag": "li",
          "attrsList": [],
          "attrsMap": {
            "v-for": "(item,index) in count"
          },
          "rawAttrsMap": {
            "v-for": {
              "name": "v-for",
              "value": "(item,index) in count"
            }
          },
          "children": [
            {
              "type": 2,
              "expression": "_s(index)+\":\"+_s(item)",
              "tokens": [
                {
                  "@binding": "index"
                },
                ":",
                {
                  "@binding": "item"
                }
              ],
              "text": "{{index}}:{{item}}",
              "static": false
            }
          ],
          "for": "count",
          "alias": "item",
          "iterator1": "index",
          "plain": true,
          "static": false,
          "staticRoot": false,
          "forProcessed": true
        }
      ],
      "plain": true,
      "static": false,
      "staticRoot": false
    },
    {
      "type": 3,
      "text": " ",
      "static": true
    },
    {
      "type": 1,
      "tag": "a1",
      "attrsList": [
        {
          "name": ":count",
          "value": "count"
        }
      ],
      "attrsMap": {
        ":count": "count"
      },
      "rawAttrsMap": {
        ":count": {
          "name": ":count",
          "value": "count"
        }
      },
      "children": [],
      "plain": false,
      "hasBindings": true,
      "attrs": [
        {
          "name": "count",
          "value": "count",
          "dynamic": false
        }
      ],
      "static": false,
      "staticRoot": false
    },
    {
      "type": 3,
      "text": " "
      "static": true
    },
    {
      "type": 1,
      "tag": "button",
      "attrsList": [
        {
          "name": "@click",
          "value": "count++"
        }
      ],
      "attrsMap": {
        "@click": "count++"
      },
      "rawAttrsMap": {
        "@click": {
          "name": "@click",
          "value": "count++"
        }
      },
      "children": [
        {
          "type": 3,
          "text": "change count"
          "static": true
        }
      ],
      "plain": false,
      "hasBindings": true,
      "events": {
        "click": {
          "value": "count++",
          "dynamic": false
        }
      },
      "static": false,
      "staticRoot": false
    }
  ],
  "plain": false,
  "attrs": [
    {
      "name": "id",
      "value": "\"app\""
    }
  ],
  "static": false,
  "staticRoot": false
}
```

```js
function renderFun() {
  with (this) {
    return _c(
      'div',
      { attrs: { id: 'app' } },
      [
        count === 1
          ? _c('p', [_v('1:' + _s(count))])
          : count === 2
          ? _c('span', [_v('2:' + _s(count))])
          : _c('div', [_v('other:' + _s(count))]),
        _v(' '),
        _c(
          'ul',
          _l(count, function(item, index) {
            return _c('li', [_v(_s(index) + ':' + _s(item))]);
          }),
          0
        ),
        _v(' '),
        _c('a1', { attrs: { count: count } }),
        _v(' '),
        _c(
          'button',
          {
            on: {
              click: function($event) {
                count++;
              },
            },
          },
          [_v('change count')]
        ),
      ],
      1
    );
  }
}
```
