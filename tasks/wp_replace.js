/*
 * grunt-wp-replace
 * https://github.com/jason/grunt-wp-replace
 *
 * Copyright (c) 2014 jasonslyvia
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('wpreplace', 'replace filereved or concated assets filename', function(){
    var options = this.options();

    //简化filerev保存的文件名修改信息，去掉多余的路径信息，只保留新旧文件名
    //形如 {oldFileName.css : newFileName.css}
    var newFiles = {};
    for(var i in grunt.filerev.summary){
      var newKey = i.split('/').pop();
      newKey = newKey.replace(/\.min/i, '');
      var newValue = grunt.filerev.summary[i].split('/').pop();

      newFiles[newKey] = newValue;
    }

    //针对每一个文件进行遍历，依次进行正则匹配
    this.files.forEach(function(file){
      //首先确保文件存在
      file.src.filter(function(filePath){
        if (!grunt.file.exists(filePath)) {
          grunt.log.warn('source file ' + filePath + ' not exist');
          return false;
        }
        else{
          return true;
        }
      }).forEach(function(filePath){

        //获得文件内容
        var content = grunt.file.read(filePath);
        var cssRegExp = /(<link.*?href=[\'\"])(.*?)([\'\"][^>]*>)/gi;
        var jsRegExp = /(<script.*?src=[\'\"])(.*?)([\'\"][^>]*?>\s*<\/script>)/gi;
        var templatePath = options.templatePath;
        var jsPath = templatePath.replace(/\/$/,'') + '/' + options.jsPath.replace(/^\/|\/$/,'') + '/';
        var cssPath = templatePath.replace(/\/$/,'') + '/' + options.cssPath.replace(/^\/|\/$/, '') + '/';
        var concat = options.concat;

        //进行静态资源引用替换
        var newContent = replaceReference(content, cssRegExp, 'css', cssPath, newFiles, concat);
        newContent = replaceReference(newContent, jsRegExp, 'js', jsPath, newFiles, concat);

        //如果替换了新的引用，则再次写入文件
        if (content.length != newContent.length) {
          grunt.log.ok('assets are replaced in '+filePath);
          filePath = filePath.replace(/-src/i, '');

          grunt.file.write(filePath, newContent);
        }
      });
    });
  });

/*
 *  替换文件中出现的静态资源引用，返回替换后的文件内容
 *
 *  @param {string} content 文件内容
 *  @param {object} regExp 进行匹配的正则对象
 *  @param {string} type 进行匹配的资源类型，js或css
 *  @param {string} filePath 静态资源的引用uri，形如/wp-content/themes/your-theme/css/
 *  @param {array} revvedFiles 包含了新旧文件名的对象数组，
 *                             参考 grunt.filerev.summary，
 *                             这里使用简化版本
 *  @param {array} concat 包含了concat前后文件名的对象数组
 *  @return {string}
 */
function replaceReference(content, regExp, type, filePath, revvedFiles, concat){

  var templatePath = filePath.split('/');
  templatePath.pop();
  var typePath = templatePath.pop() + '/';
  templatePath = templatePath.join('/');
  templatePath += '/';

  //WARN：若文件中多次出现同一资源的引入，同时存在concat后的资源，
  //      则可能出现源文件中将多行内容被替换为1行的情况，
  //      正则匹配时就会跳过若干个字符，参考js regexp.lastIndex
  var match;
  while((match = regExp.exec(content)) !== null){
    var asset = match[2].split('/').pop();

    //若该asset被引用
    if (revvedFiles.hasOwnProperty(asset)) {

      //判断其是否被concat
      concat = concat || [];
      var concated = concat.every(function(el, i){
        //若被concat
        if(el.src.join(' ').indexOf(asset) !== -1){
          //若已替换则直接删除本条引用
          if (el.replaced) {
            content = content.replace(new RegExp(match[0], "i"), '');
            //改变lastIndex确保匹配到文件中的每一个字符
            regExp.lastIndex -= match[0].length;
            grunt.log.debug('remove source file ' + asset + ' that already concated');
          }
          //否则将concat后对应的文件替换，同时添加已替换属性
          else{
            //若指定的concat后的文件不存在
            if (!grunt.file.exists(typePath+revvedFiles[el.dest])) {
              grunt.fail.warn('concat file '+el.dest+' for '+el.src.join(',')+' does not exist!');
            }

            var concatedAsset = match[1] + filePath + revvedFiles[el.dest] + match[3];
            content = content.replace(new RegExp(match[0], "i"), concatedAsset);
            //改变lastIndex确保匹配到文件中的每一个字符
            regExp.lastIndex -= (match[0].length - concatedAsset.length);
            el.replaced = true;

            grunt.log.debug('replace concat file '+revvedFiles[el.dest]+' for '+asset);

          }

          //不考虑a,b被concat为x，同时a,d被concat为y的情况
          //不再继续遍历concat
          return false;
        }
        return true;
      });

      //concated为true说明concat.every全部return true，即
      //该js并未被concat
      //因此直接替换为filerev后的文件即可
      if (concated) {

        //若是style.css，
        //将其从css-dist文件夹移到根目录下以便wordpress识别该主题
        if (asset.match(/^style\.css$/i)) {
          var nCss = revvedFiles[asset];

          grunt.file.copy(typePath+nCss, nCss, {encoding: 'utf8'});
          content = content.replace(new RegExp(match[0], "i"), match[1] + templatePath + nCss + match[3]);
          grunt.log.subhead('style.css found! this is a Wordpress theme in no doubt!');
        }
        else{
          content = content.replace(new RegExp(match[0], "i"), match[1] + filePath + revvedFiles[asset] + match[3]);
        }
        grunt.log.debug(type+' replace: ' + asset + ' : ' + revvedFiles[asset]);
      }
    }
  }

  return content;
}

};
