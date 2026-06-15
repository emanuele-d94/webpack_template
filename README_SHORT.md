# SHORT WEBPACK TEMPLATE SETUP
## STEPS

1. `npm init -y --init-type=module`
2. `npm install --save-dev webpack webpack-cli`
3. Make a src directory
4. Make index.js file inside src directory
5. `npm install --save-dev html-webpack-plugin`
6. Make a template.html inside src (you can name this file whatever you want) and fill that with the usual HTML boilerplate.
7. `npm install --save-dev style-loader css-loader`
8. Make a styles.css file inside /src
9. Import your CSS file into one of your JavaScript files like src/index.js

    `import "./styles.css";`

10. `npm install --save-dev html-loader`
11. `npm install --save-dev webpack-dev-server`

12. Make a file inside the project folder (outside /src): webpack.config.js with the following content

```
    // webpack.config.js
    import path from "node:path";
    import HtmlWebpackPlugin from "html-webpack-plugin";
    
    export default {
        mode: "development",
        entry: "./src/index.js",
        output: {
        filename: "main.js",
        path: path.resolve(import.meta.dirname, "dist"),
        clean: true,
        },
    devtool: "eval-source-map",
    devServer: {
        watchFiles: ["./src/template.html"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
        }),
    ],
    module: {
    rules: [
        {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
        },
        {
            test: /\.html$/i,
            use: ["html-loader"],
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: "asset/resource",
        },
        ],
        },
    };
```
16. Select port in webpack.config.js , devServer port property
17. Launch the server: npx webpack serve

18. Set multi config files:
19. `npm install --save-dev webpack-merge`
20. Remove webpack.config.js and add: 

├── webpack.common.js

├── webpack.dev.js

├── webpack.prod.js

21. Add scripts to package.json:
      "scripts": {
    "build": "webpack --config webpack.prod.js",
    "dev": "webpack serve --config webpack.dev.js",
    "deploy": "git subtree push --prefix dist origin gh-pages"
    }

## DEPLOY ON GIT HUB PAGES:
Make a new branch to deploy from by running:

`git branch gh-pages` 

You only need to do this the first time you deploy. The rest of the steps should be done every time you deploy or redeploy your project.

Make sure you have all your work committed. You can use git status to see if there’s anything that needs committing.

`git checkout gh-pages`

`git merge main --no-edit`

to change branch and sync your changes from main so that you’re ready to deploy.

Now let’s bundle our application into dist with your build command

`npm run build`

Now there are a few more commands. Run each of these in order:

`git add dist -f`

`git commit -m "Deployment commit"`

`git subtree push --prefix dist origin gh-pages`

`git checkout main`

Recall that the source branch for GitHub Pages is set in your repository’s settings. Get this changed to the gh-pages branch. That should be everything!
