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

Array of Wordpress source file named with -src suffix, eg. footer-src.php or header-src.php.  The plugin will then generate footer.php and header.php with assets filename replaced.

### Usage Examples

#### Default Options
TODO

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
