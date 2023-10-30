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
