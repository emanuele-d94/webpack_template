# webpack_template
Webpack template to start e new web-app using HTML-CSS-JS with webpack

Follow the following steps to start the project

## STEPS 
1. This should create a package.json file inside the project directory you just made and entered. 

    `npm init -y --init-type=module`

2. Now we can install Webpack 

   `npm install --save-dev webpack webpack-cli`

   The --save-dev flag (also use -D as a shortcut) tells npm to record our two packages as development dependencies. 
   We will only be using Webpack during development. 
   The actual code that makes Webpack run will not be part of the code that the browser will run.
   
   Also npm created a node_modules directory and a package-lock.json file for us. 
   node_modules is where Webpack’s actual code (and a whole bunch of other stuff) lives, and package-lock.json is just another file npm uses to track more specific package information.


3. Let’s create a src directory and an index.js file inside src directory


4. Back in your project root (so outside of src), create a webpack.config.js file that contains the following:

   ```// webpack.config.js
   import path from "node:path";
   
   export default {
   mode: "development",
   entry: "./src/index.js",
   output: {
      filename: "main.js",
      path: path.resolve(import.meta.dirname, "dist"),
      clean: true,
      },
   }; 

- mode: For now, we will just leave this in development mode, as it will be more useful to us. We will revisit this and production mode in a later lesson.
- entry: A file path from the config file to whichever file is our entry point, which in this case is src/index.js.
- output: An object containing information about the output bundle.
- filename: The name of the output bundle - it can be anything you want.
- path: The path to the output directory, in this case, dist. If this directory doesn’t already exist when we run Webpack, it will automatically create it for us as well. Don’t worry too much about why we have the path.resolve part - this is just the way Webpack recommends we specify the output directory.
- clean: If we include this option and set it to true, then each time we run Webpack to bundle, it will empty the output directory first before bundling the files into it. This helps us keep dist clean, so it only contains the files produced by the most recent bundling.


5. With these files all in place, let’s run Webpack and see what happens!

   `npx webpack`

   You should see that Webpack has created a dist directory for us containing a main.js file!
   If you run this file with node dist/main.js the imported modules will be executed.
   You’ve just made your first bundle with Webpack!


6. Run the following command to install HtmlWebpackPlugin (also as a dev dependency):

   `npm install --save-dev html-webpack-plugin`


7. We should also create a template.html inside src (you can name this file whatever you want) and fill that with the usual HTML boilerplate. 
We do not need to put a script tag in this file! HtmlWebpackPlugin will automatically add our output bundle as a script tag. We wouldn’t want to double up by including our own one as well! 


8. Inside our webpack.config.js, we can add a few little bits.

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
      plugins: [
         new HtmlWebpackPlugin({
            template: "./src/template.html",
         }),
      ],
   };
```

9. We don’t just need one new package for CSS, we need two:
   `npm install --save-dev style-loader css-loader`

    Make a styles.css file inside /src

10. Update the webpack.config.js
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
         ],
      },
   };
```

11. You can now import your CSS file into one of your JavaScript files. src/index.js
    
`import "./styles.css";`

12. Loading images
    1. Image files used in our CSS inside url(). 
    Lucky us! css-loader already handles this for us, so there’s nothing extra to do for image paths in CSS!
    2. Image files we reference in our HTML template, e.g. as the src of an < img >
       
    `npm install --save-dev html-loader`


13. Update webpack config
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

14. Webpack dev server
    `npm install --save-dev webpack-dev-server`

15. Update webpack config

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


16. npx webpack serve