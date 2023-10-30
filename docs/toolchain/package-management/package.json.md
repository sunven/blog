# package.json

## `workspace:` prefix in a package.json

<https://pnpm.io/workspaces>
<https://yarnpkg.com/features/workspaces#what-does-it-mean-to-be-a-workspace>

## workspaces

install 时将 workspaces 下面的包，软链到根目录的 node_modules 中，类似npm link

- monorepo
- npm ls -g --depth=0
- npm ls react --depth=0
- 文件夹名发生变化，需要重新install

## npm:sass

package.json中，{ “node-sass": "npm:sass"}

1. sass 为纯 JavaScript 实现，已经可以实现sass > css，但慢。
2. node-sass、dart-sass 更快
3. 这里的 "npm:" 前缀表示需要从 npm 包管理器中安装这个依赖项
4. “node-sass": "npm:sass" 表示用node-sass时实际用sass
