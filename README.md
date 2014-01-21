# grunt-wp-replace

> Replace revved or concated filename for Wordpress source file.

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

## The "wp_replace" task

### Overview
In your project's Gruntfile, add a section named `wp_replace` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  wp_replace: {
    options: {
      templatePath: '/wp-content/themes/your-theme/',
      jsPath: '/wp-content/themes/your-theme/js-dist/',
      cssPath: '/wp-content/themes/your-theme/css-dist/',
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

the template path of your wordpress theme

#### options.jsPath
Type: `String`
Default value: `''`

the path which javascript files located in your wordpress theme

#### options.cssPath
Type: `String`
Default value: `''`

the path which css files located in your wordpress theme

#### options.concat
Type: `Array`
Default value: `'.'`

if you concat any files, define them in order to replace their replace, see the `Overview` part for format

### Usage Examples

#### Default Options
TODO

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
