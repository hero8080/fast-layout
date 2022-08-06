#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
//获取配置||默认配置
let config={}
try {
  //取根目录的配置
  let configFilePath=path.resolve(__dirname.split('node_modules')[0]+'/fast_layout.config.js')
  config=require(configFilePath)
}catch (_){
  config=require('../fast_layout_default.config.js')
}
//颜色配置
let colors = config.color
//导出路径
let filePath=config.filePath
if(filePath.substr(0,1)==='/'){
  filePath=filePath.substr(1)
}
let dirPath=__dirname.replace(/\\/ig,'\/').split('node_modules')[0]
let exportsPath =dirPath+ filePath

//默认文件
//存在init
if(process.argv.indexOf('--init')!==-1){
  let initFilePath=dirPath+'fast_layout.config.js'
  console.log({initFilePath})
  fs.copyFile(path.resolve(__dirname,'../fast_layout_default.config.js'), initFilePath,0, ()=>{
    console.log('复制完成')
  })
  return
}

//布局生成
let layout = ''

//公共样式
layout += `/*字体*/
body,input,textarea,button,select{
    font-family: "PingFang SC","Lantinghei SC","Microsoft YaHei","HanHei SC","Helvetica Neue","Open Sans",Arial,"Hiragino Sans GB","微软雅黑",STHeiti,"WenQuanYi Micro Hei",SimSun,sans-serif;
}
/*边距*/
body,p,form,h1,h2,h3,h4,h5,h6,ul,ul>li,input,textarea{
    margin: 0;
    padding: 0;
}
/*debug*/
.debug *{
    box-shadow: 0 0 0 1px red;
}
[class*="g_radius"]{
    overflow: hidden;
}
/*开启硬件加速*/
.open_hardware_speedup{
  transform: translateZ(0);
}
/*盒模型*/
.g_box_relative{
    box-sizing: border-box;
    line-height: 1;
    position: relative;
}
/*a链接*/
a{
    color: inherit;
    text-decoration: none;
}
/*重置a链接选中样式*/
a:focus{
  outline: none !important;
}
/*fieldset*/
.g_fieldset {
    border: 1px solid #c0c0c0;
    margin: 0 2px;
    padding: 0.35em 0.625em 0.75em;
}
/*删除表格里单元格间的间距*/
.g_table {
  border-collapse: collapse;
  border-spacing: 0;
}
/*文字溢出*/
.g_ellipsis {
    text-align: justify;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.g_ellipsis_flex {
    text-align: justify;
    width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.g_ellipsis1 {
    text-align: justify;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    line-height: initial;
}
.g_ellipsis2 {
    text-align: justify;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: initial;
}
.g_ellipsis3 {
    text-align: justify;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-height: initial;
}
.g_ellipsis4 {
    text-align: justify;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    line-height: initial;
}

/*绝对定位*/
.g_absolute{
    position: absolute;
}
.g_relative{
    position: relative;
}
.g_fixed{
    position: fixed;
}
/*滚动条*/
/*::-webkit-scrollbar-track-piece {
    background: 0 0;
}
::-webkit-scrollbar-corner,::-webkit-scrollbar-track{
  background: transparent
}
::-webkit-scrollbar-thumb {
    background-color: #b6c6ce;
    border: 3px solid transparent;
    background-clip: padding-box;
    border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
    background-color: #4f6f7f;
}
::-webkit-scrollbar {
    width: 11px;
    height: 10px;
}*/
.g_hidden{
    overflow:hidden
}
.g_scroll_y {
    overflow-y: auto;
}
.g_scroll_y_always {
    overflow-y: scroll;
}
.g_scroll_x {
    overflow-x: auto;
}
.g_scroll_x_always {
    overflow-x: scroll;
}
/*内容横向滚动*/
.g_content_scroll_x {
  width: 100%;
  white-space: nowrap;
  overflow-x: auto;
}
.g_content_nowrap{
    white-space: nowrap;
}
.g_content_scroll_x > p, .g_content_scroll_x > div, .g_content_scroll_x > view ,.g_inline_block {
  display: inline-block;
}
.block{
    display: block;
}
.bw100{
    width: 100%;
    display: block;
}
.none{
    display: none;
}
.flex{
    display: flex;
}
.flex1{
    flex:1
}
.flex2{
    flex:2
}
.flex3{
    flex:3
}
.flex4{
    flex:4
}
.flex5{
    flex:5
}
.flex8{
    flex:8
}
.flex_wrap{
    display: flex;
    flex-wrap: wrap;
}
.flex_center,.flex_items_center{
    display: flex;
    align-items: center;
}
.flex_items_center>div,.flex_items_center>p,.flex_items_center>a{
    flex:1
}
.flex_right{
    display: flex;
    justify-content: flex-end;
}
.flex_reverse{
    display: flex;
    flex-direction: row-reverse;
}
.flex_content_center{
    display: flex;
    align-items: center;
    justify-content: center;
}
.flex_column{
    display: flex;
    flex-direction: column;
    align-items: stretch;
}
.flex_items_stretch{
    align-items: stretch;
}
.flex_column_center{
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}
.self_start{
    align-self: flex-start;
}
.self_stretch{
    align-self: stretch;
}
.self_end{
    align-self: flex-end;
}
.g_stretch100{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.g_full_screen {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 0;
}
.margin0{
    margin: 0 !important;
}

/*图片*/
.g_img{
    display: flex;
    align-items: center;
    justify-content: center;
}
.g_img img{
    width: 100%;
    border: none;
    outline: none;
    display: block;
    height: auto;
}
.child_block>a,.child_block>div,.child_block>p,.block{
    display: block;
}

/*背景类*/
.g_bg_cover{
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
.g_bg_contain{
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}
.g_bg_height_auto{
    background-size: auto 100%;
    background-position: center;
    background-repeat: no-repeat;
}

/*文本*/
.bold{
    font-weight: bold;
}
.text_left{
    text-align: left;
}
.text_center{
    text-align: center;
}
.text_right{
    text-align: right;
}
.text_justify{
    text-align: justify;
}
.block_center{
    margin: auto;
}

/*动画*/
.g_transition{
    transition: all 0.3s;
}

/*圆角*/
.g_radius2{
    border-radius: 2px;
}
.g_radius4{
    border-radius: 4px;
}
.g_radius6{
    border-radius: 6px;
}
.g_radius8{
    border-radius: 8px;
}
.g_radius10{
    border-radius: 10px;
}
.g_radius_all{
    border-radius: 500px;
}
.g_pointer{
    cursor: pointer;
}`
let addLayput = (num) => {
  layout += `\n
.g_pad${num}t,.g_pad${num}t_s>div,.g_pad${num}t_s>p,.g_pad${num}t_s>a{
    padding-top: ${num}px;
}
.g_pad${num}b,.g_pad${num}b_s>div,.g_pad${num}b_s>p,.g_pad${num}b_s>a{
    padding-bottom: ${num}px;
}
.g_pad${num}l,.g_pad${num}l_s>div,.g_pad${num}l_s>p,.g_pad${num}l_s>a{
    padding-left: ${num}px;
}
.g_pad${num}r,.g_pad${num}r_s>div,.g_pad${num}r_s>p,.g_pad${num}r_s>a{
    padding-right: ${num}px;
}
.g_pad${num}lr,.g_pad${num}lr_s>div,.g_pad${num}lr_s>p,.g_pad${num}lr_s>a{
    padding-left:  ${num}px;
    padding-right:  ${num}px;
}
.g_pad${num}tb,.g_pad${num}tb_s>div,.g_pad${num}tb_s>p,.g_pad${num}tb_s>a{
    padding-top: ${num}px;
    padding-bottom: ${num}px;
}
.g_pad${num},.g_pad${num}_s>div,.g_pad${num}_s>p,.g_pad${num}_s>a{
    padding: ${num}px;
}

.g_mar${num}t,.g_mar${num}t_s>div,.g_mar${num}t_s>p,.g_mar${num}t_s>a{
    margin-top: ${num}px;
}
.g_mar${num}b,.g_mar${num}b_s>div,.g_mar${num}b_s>p,.g_mar${num}b_s>a{
    margin-bottom: ${num}px;
}
.g_mar${num}l,.g_mar${num}l_s>div,.g_mar${num}l_s>p,.g_mar${num}l_s>a{
    margin-left: ${num}px;
}
.g_mar${num}r,.g_mar${num}r_s>div,.g_mar${num}r_s>p,.g_mar${num}r_s>a{
    margin-right: ${num}px;
}
.g_mar${num}lr,.g_mar${num}lr_s>div,.g_mar${num}lr_s>p,.g_mar${num}lr_s>a{
    margin: 0 ${num}px;
}
.g_mar${num}tb,.g_mar${num}tb_s>div,.g_mar${num}tb_s>p,.g_mar${num}tb_s>a{
    margin: ${num}px auto;
}
.g_mar${num},.g_mar${num}_s>div,.g_mar${num}_s>p,.g_mar${num}_s>a{
    margin: ${num}px;
}`
}
layout += `\n
/*边距类*/
/*
* g_padxx_s //表示对子元素进行padding调整
* g_marxx_s //表示对子元素进行margin调整
*/
`
for (let i = 1; i < 25; i++) {
  let num = i * 2
  addLayput(num)
}
layout += `\n
/*边距类-高阶*/`
for (let i = 5; i < 11; i++) {
  let num = i * 10
  addLayput(num)
}

//定位类
layout+=`\n
/*定位类*/
.absolute_top{
  position: absolute;
  top:0;
}
.absolute_bottom{
  position: absolute;
  bottom:0;
}
.absolute_left{
  position: absolute;
  left:0;
}
.absolute_right{
  position: absolute;
  right:0;
}
.absolute_center{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50% -50%);
  right:0;
}
.absolute_centerX{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.absolute_centerY{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}`
//层级类
layout += `\n
/*层级类*/`
for (let i = 0; i < 11; i++) {
  layout += `
.g_zindex${i}{
    z-index: ${i};
}`
}

//透明度
layout += `\n
/*透明度*/`
for (let i = 0; i < 11; i++) {
  let _name=''
  let _opacity=''
  if(i===0||i===10){
    _name=i/10
    _opacity=i/10
  }else{
    _name='0_'+i
    _opacity='0.'+i
  }
  layout += `
.g_opacity_${_name}{
    opacity: ${_opacity};
}`
}

//字体类
layout += `\n
/*字体类*/`
for (let i = 1; i < 22; i++) {
  layout += `
.g_h${9 + i}{
    font-size: ${9 + i}px;
}`
}
layout += `\n
/*字体类_高阶*/`
for (let i = 16; i < 30; i++) {
  layout += `
.g_h${i * 2}{
    font-size: ${i * 2}px;
}`
}

//行高类
layout += `\n
/*行高类*/`
for (let i = 0; i <= 10; i++) {
  let num = 1 + i/10
  let _className=String(num).split('.').join('_')
  layout += `
.g_line_${_className}h{
    line-height: ${num};
}`
}


//宽高类
layout += `\n
/*宽高类*/`
layout += `
.g_wid100_vw{
    width: 100vw;
}
.g_wid100_vh{
    height: 100vh;
}
.g_wid100_all{
    width: 100vw;
    height: 100vh;
}
`
layout += `\n`
for (let i = 1; i < 30; i++) {
  let num = i * 2
  layout += `
.g_wid${num}{
    width: ${num}px;
}
.g_wid${num}_h{
    height: ${num}px;
}
.g_wid${num}_ah{
    width: ${num}px;
    height: ${num}px;
}`
}
for (let i = 6; i < 40; i++) {
  let num =  i * 10
  layout += `
.g_wid${num}{
    width: ${num}px;
}
.g_wid${num}_h{
    height: ${num}px;
}
.g_wid${num}_ah{
    width: ${num}px;
    height: ${num}px;
}`
}
layout += `\n
/*宽高类_高阶*/`
for (let i = 1; i < 10; i++) {
  let num = 350 + i * 50
  layout += `
.g_wid${num}{
    width: ${num}px;
}
.g_wid${num}_h{
    height: ${num}px;
}
.g_wid${num}_ah{
    width: ${num}px;
    height: ${num}px;
}`
}

//百分比宽高
layout += `\n
/*百分比宽高*/`
for (let i = 1; i <= 10; i++) {
  let num=i*10
  layout += `
.g_wid${num}_p{
    width: ${num}%;
}`
}

//占用比例
layout += `\n
/*占用比例*/`
for (let i = 1; i <= 10; i++) {
  let num=(1/i*100).toFixed(3)
  layout += `
.g_wid${i}_d{
    width: ${num}%;
}`
}

//颜色类
layout += `\n
/*颜色类*/`
let keyIndex = 0
for (let key in colors) {
  if (keyIndex == 0) {
    let colorStr = '\n:root,page{\n'
    for (let key2 in colors) {
      colorStr += `    --g_color_${key2}:${colors[key2]};\n`
    }
    colorStr += '}'
    layout += colorStr
  }
  keyIndex++
  layout += `
.g_color_${key}{
    color: var(--g_color_${key});
}
.g_bgcolor_${key}{
    background-color: var(--g_color_${key});
}`
}

//栅格布局
let createGrid=()=>{
  layout+=`
[class*="g_grid"]{
    display: flex;
    flex-wrap: wrap;
}
`
  layout += `\n
/*栅格布局*/`
  for (let i = 2; i < 9; i++) {
    let str = `
.g_grid_8_10>div,.g_grid_8_10>a{
    width: calc((99.999% - 7 * 10px) / 8);
}
.g_grid_8_10>div:not(:nth-child(8n-7)),.g_grid_8_10>a:not(:nth-child(8n-7)){
    background-color: dodgerblue;
    margin-left: 10px;
}`
    layout += `
`
    layout += `
.g_grid_${i}>div,.g_grid_${i}>a{
    width: calc((99.999% - ${i - 1}) / ${i});
}`
    for (let j = 1; j < 13 - i; j++) {
      let margin = j * 8
      layout += `
.g_grid_${i}_${margin}>div,.g_grid_${i}_${margin}>a{
    width: calc((99.999% - ${i - 1} * ${margin}px) / ${i});
}
.g_grid_${i}_${margin}>div:not(:nth-child(${i}n-${i - 1})),.g_grid_${i}_${margin}>a:not(:nth-child(${i}n-${i - 1})){
    margin-left: ${margin}px;
}`
    }
  }
}
// createGrid()
let createBoxShadow=()=>{
  layout+=`
.g_box_shadow,.g_box_shadow_hover{
  box-shadow: 0 2px 12px 0 rgb(0,0,0,0.1);
}
.g_box_shadow_hover{
  transition: all 0.3s;
}
.g_box_shadow_hover:hover{
  box-shadow: 0 2px 12px 0 rgb(0,0,0,0.2);
}
`
}
// console.log(layout)
//生成文件

let pathsInfo = path.parse(exportsPath)
fs.mkdirSync(pathsInfo.dir, {recursive: true})
fs.writeFile(exportsPath, layout, (error) => {
  if(error){
    console.log(error);
  }else{
    console.log('fast-layout已生成:'+exportsPath);
  }
})

