# grunt-wp-replace

> Replace revved or concated filename for Wordpress source file.

**This plugin depends on another plugin [grunt-filerev](https://github.com/yeoman/grunt-filerev) which generates a global accesscible object `grunt.filerev.summary`.**

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-wp-replace --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:
```js
grunt.loadNpmTasks('grunt-wp-replace');
```
## How to use

### File structure(Before)

Before running any grunt task, here's how your file structure looks like:
```
|
+- your_theme_name
|   +- header-src.php
|   +- footer-src.php
|   +- style-src.css
|   +- js
|      +- all your js files
|   +- css
|      +- all your css files
```
> Note: pay attention to `-src` suffix for those `.php` file, it's required to name your file like this.

In your `.php` file, you should reference assets in relative path.
```html
<link rel="stylesheet" type="text/css" href="css/mycss.css" />
<script type="text/javascript" src="js/myjs.js"></script>
```

### Run grunt task

To use the `wpreplace` task, you should run `filerev` or/and `concat` first in order to generate new filenames. It's recommended to generate these asstes in new folders like `js-dist` or `css-dist` other than in original folder.

### File structure(After)
```
|
+- your_theme_name
|   +- header-src.php
|   +- header.php
|   +- footer-src.php
|   +- footer.php
|   +- style-src.css
|   +- style.css (if your minified or revved, it might be `style.min.a2312abe.css`)
|   +- js
|      +- all your js files
|   +- css
|      +- all your css files
|   +- js-dist
|      +- all your js files that are minified and revved
|   +- css-dist
|      +- all your css files that are minified and revved
```
Running `wpreplace` task will replace static assets reference in all `*-src.php`.

```html
<link rel="stylesheet" type="text/css" href="/wp-content/themes/your_theme_name/css-dist/mycss.min.ac2de23a.css" />
<script type="text/javascript" src="/wp-content/themes/your_theme_name/js-dist/myjs.min.bde2ac21.js"></script>
```
All ready to go, have fun!

## The "wpreplace" task

### Overview
In your project's Gruntfile, add a section named `wpreplace` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  wpreplace: {
    options: {
      templatePath: '/wp-content/themes/your-theme/',
      jsPath: 'js-dist',
      cssPath: 'css-dist',
      concat: [{
        src: ['a.js', 'b.js'],
        dest: ['concated.js']
      }]
    },
    your_target: {
      src: ['header-src.php', 'footer-src.php']
    }
  },
});
```

### Options

#### options.templatePath
Type: `String`
Default value: `''`

The template path of your wordpress theme

#### options.jsPath
Type: `String`
Default value: `''`

The path which javascript files located in your wordpress theme, relative to `templatePath`

#### options.cssPath
Type: `String`
Default value: `''`

The path which css files located in your wordpress theme, relative to `templatePath`

#### options.concat
Type: `Array`
Default value: `[]`

If you concat any files, define them in order to replace their replace, see the `Overview` part for format

#### your_target.src
Type: `Array`
Default value: `[]`

Array of Wordpress source file named with `-src` suffix, eg. footer-src.php or header-src.php.  The plugin will then generate footer.php and header.php with assets filename replaced.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
 - 2014-01-22   v0.1.0   Dirty, ugly but working code.
 - 2014-03-12   v0.1.0   Fix a bug when `concat` not specified
