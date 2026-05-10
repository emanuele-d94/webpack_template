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
19. npm install --save-dev webpack-merge
20. Remove webpack.config.js and add: 

├── webpack.common.js

├── webpack.dev.js

├── webpack.prod.js

