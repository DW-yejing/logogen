<template>
  <div class="home">
    <Ribbon></Ribbon>
    <div class='box' id="box">
        <div class="logo" id="logo" :style="{ 'font-size': fontSize + 'px', 'background-color': logoBgColor}">
            <span v-for="(item, index) in textAreas" :key='item.tid' contenteditable v-text="item.value"
                @blur="updateText(index, $event)" spellcheck="false" @focus="updateFocusEle(index)" 
                :style="{'font-size': item.fontSize+'px', 'color': item.color, 'background-color': item.bgColor, 'font-family':item.tfont }"
            ></span>
        </div>
    </div>

    <div class='text-add-remove'>
        <div class='additem' v-tooltip="{content: 'append a new text area to logo', show: false}" @click="additem">Add TextArea</div>
        <div class='removeitem' v-tooltip='{content: "remove the focused text area from logo", show: false}' @click="removeitem">Remove TextArea</div>
    </div>

    <div class="currentText">
        Current Text: &nbsp;<span>{{currentText}}</span>
        <input id="currentTid" hidden v-model="currentTid" />
    </div>


    <div class='customize'>
        <div class="customize-color">
            <div>Text Color: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <input type="color" v-model="textColor" @change="updateColor"/></div>
            <div>Background Color: &nbsp; <input type="color" v-model="bgColor" @change="updateBgColor" /></div>
            <div>Logo Background: &nbsp; <input type="color" v-model="logoBgColor"/></div>
        </div>

        <div class="customize-misc">
            <div>
                Font Size: <input type="range" min="30" max="200" v-model="fontSize" @change="updateFontSize"/> {{ fontSize }}px
            </div>
            <div>
                Fonts: <select id="fontSelector" @change="updateFont()">
                    <option v-for="item in webFonts" :key="item">{{item}}</option>
                    <option v-for="item in fonts" :key="item">{{item}}</option>
                </select>
            </div>
        </div>
    </div>

    <div class="download-share">
        <div class="download"
            v-tooltip="{ content: 'Export your own logo', show: false, classes: 'tooltipClasses' }"
            @click="download"
        >
            Export
        </div>
    </div>
  </div>
</template>

<script>
import domtoimage from 'dom-to-image';
import Ribbon from "./Ribbon";
const FileSaver = require('file-saver');

export default {
  name: 'Home',
  components: {
      Ribbon
  },
  data () {
    return {
        currentTid: 0,
        bgColor: '#000000',
        textColor: "#ffffff",
        fontSize: "60",
        currentText: "edit",
        fonts:[],
        webFonts: ['Comic Sans MS', 'Arial', 'Lucida Family', 'Arial Black', 'Arial Narrow', 'Verdana', 'Georgia', 'Times New Roman', ' Trebuchet MS', 'Courier New', 'Impact', 'Tahoma', 'Courier', 'Lucida Sans Unicode', 'Lucida Console', 'Garamond', 'MS Sans Serif', 'MS Serif'],
        logoBgColor: '#000000',
        textAreas: [
            {
                tid: 1,
                value: 'edit',
                color: '#FFFFFF',
                fontSize: '60',
                bgColor: '#000000',
                tfont: 'Arial'
            },
            {
                tid: 2,
                value: 'me',
                color: '#000000',
                fontSize: '60',
                bgColor: '#FF9900',
                tfont: 'Arial'
            }
        ]
    }
  },
  methods: {
      additem: function(){
          if(this.currentTid>=this.textAreas.length || this.currentTid<0){
              this.currentTid = textAreas.length-1;
          }
          this.currentTid = this.currentTid+1;
          var newNode = {
                tid: this.textAreas.length+1,
                value: 'more',
                color: '#FFFFFF',
                fontSize: '60',
                bgColor: '#000000',
                tfont: 'Arial'
            };
          var index = parseInt(this.currentTid);
          if(index<this.textAreas.length){
              for(var i=index; i<this.textAreas.length; i++){
                this.textAreas[i].tid = i+1;
              }
          }
          
          this.textAreas.splice(index, 0, newNode);
      },
      removeitem: function(){
          if(currentTid>=this.textAreas.length || currentTid<0){
              this.currentTid = textAreas.length-1;
          }
          var index = parseInt(this.currentTid);
          if(index<this.textAreas.length){
              for(var i=index+1; i<this.textAreas.length; i++){
                this.textAreas[i].tid = i-1;
              }
          }
          this.textAreas.splice(index, 1)
      },
      downloadIamge(imgsrc, name) {//下载图片地址和图片名
        let image = new Image();
        // 解决跨域 Canvas 污染问题
        image.setAttribute("crossOrigin", "anonymous");
        image.onload = function() {
            let canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            let context = canvas.getContext("2d");
            context.drawImage(image, 0, 0, image.width, image.height);
            let url = canvas.toDataURL("image/png"); 
            let a = document.createElement("a"); 
            let event = new MouseEvent("click"); 
            a.download = name || "photo"; 
            a.href = url; 
            a.dispatchEvent(event); 
        };
        image.src = imgsrc;
      },
      download: function(){
        var that=this
        var node = document.getElementById('logo')
        domtoimage.toPng(node).then(function(res) {
            console.log(res)
            that.downloadIamge(res,"logo")
        })
      },
      updateText: function(idx, e){    
        this.textAreas[idx].value = '';
        if(e.target && e.target.innerText){
            this.textAreas[idx].value = e.target.innerText;
        }
        this.currentText = this.textAreas[idx].value;
      },
      updateColor: function(){
          var index = parseInt(this.currentTid);
          this.textAreas[index].color=this.textColor;
      },
      updateBgColor: function(){
        var index = parseInt(this.currentTid);
        this.textAreas[index].bgColor=this.bgColor;
      },
      updateFontSize: function(){
        var index = parseInt(this.currentTid);
        this.textAreas[index].fontSize=this.fontSize;
      },
      updateFocusEle: function(idx){
          this.currentTid = idx;
          this.currentText = this.textAreas[this.currentTid].value;
          this.textColor = this.textAreas[idx].color;
          this.bgColor = this.textAreas[idx].bgColor;
          this.fontSize = this.textAreas[idx].fontSize;
          var selectedFont = this.textAreas[idx].tfont;
          var fontSelector = document.getElementById("fontSelector");
          for(var i=0,j=this.webFonts.length; i<j; i++){
              if (fontSelector.options[i].value == selectedFont){
                fontSelector.options[i].selected = true;
                break;
              }
          }
      },
      updateFont: function(){
          var fontSelector = document.getElementById("fontSelector");
          var font = fontSelector.options[fontSelector.selectedIndex].innerText;
          var index = parseInt(this.currentTid);
          this.textAreas[index].tfont = font;
      }

  },
  watch:{
      bgColor: function(val, oldVal){
          var idx = this.currentTid;
          var len = this.textAreas.length;
          idx = idx%len;
          var textArea = this.textAreas[idx];
          if(!textArea){
              return;
          }
          textArea.bgColor = val;
      },
      textColor: function(val, oldVal){
          var idx = this.currentTid;
          var len = this.textAreas.length;
          idx = idx%len;
          var textArea = this.textAreas[idx];
          if(!textArea){
              return;
          }
          textArea.color = val;
      },
      fontSize: function(val, oldVal){
          var idx = this.currentTid;
          var len = this.textAreas.length;
          idx = idx%len;
          var textArea = this.textAreas[idx];
          if(!textArea){
              return;
          }
          textArea.fontSize = val;
      }
  }



}
</script>

<style lang="stylus" scoped>
.home
  display flex
  flex-direction  column
  align-items center
  width 60%
  padding 20px 20%
.text-add-remove
    display flex
    justify-content space-around
    width 80%
    & > div
        width 200px
        height 40px
        border-radius 3px
        line-height 40px
        text-align center
        cursor pointer
    .additem
    .removeitem
        color black
        background #f90

.download-share
  display flex
  justify-content space-around
  & > div
      width 100px
      height 40px
      border-radius 3px
      line-height 40px
      text-align center
      cursor pointer
  .download
      color black
      background #f90
.customize
    display flex
    justify-content space-around
    width 100%
    margin-bottom 50px
    .customize-color > div,
    .customize-misc > div
        padding 10px 100px
        width max-content

.box
    border 1px solid #333
    border-radius 10px
    padding 40px
    margin 40px 10px
    max-width 100%
    .logo
        padding 20px
        text-align center
        font-size 60px
        font-weight 700
        >span 
            padding 5px 5px
            border-radius 7px
.currentText
    margin 20px
</style>
