# Welcome to ImmyBot Docs Github Repo

Changes made to the main branch here are pushed to https://docs.immy.bot/ automatically.

Feel free to contribute! We may even make you a [contributor](https://immy.bot/i-want-to-be-a-contributor/)

To test locally, start by cloning this repo then opening the folder in VS Code.

VS Code will recommend certain extensions when opening it the first time, we recommend you install these.

You will also need to get Yarn and Vitepress installed locally.

Yarn: https://classic.yarnpkg.com/en/packages
VitePress: https://vitepress.dev/

You can do this by running the following commands in an elevated terminal, assuming that you have NPM installed locally.

```
npm -add -D vitepress
npm install --global yarn
```

To host locally, use a terminal and navigate to your GitHub repo clone
Example: CD C:\users\<username>\documents\github\ImmyBot-Documentation
Once in the root directory for the repo clone, run:

```
yarn docs:dev
```

There will be a link to the localhost URL in your terminal, by default it is: http://localhost:5175/

