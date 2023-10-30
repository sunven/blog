# other

## concurrently

concurrently 'cd ./component && yarn start' 'cd ./lib && yarn start' 'cd ./main && yarn start'
concurrently --raw 'npm:start-main'  'npm:start-component'
