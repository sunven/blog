# webpack5

## web 中 process 不可用

- node环境的，web不建议用
- 可以用 process.env.xxx, 但打印process.env为空

Level 5: Runtime Errors
<https://webpack.js.org/migrate/5/#run-a-single-build-and-follow-advice>
解决：
<https://stackoverflow.com/questions/65018431/webpack-5-uncaught-referenceerror-process-is-not-defined>
