<template>
  <div class="home">
    <div class='box'>
        <div class="logo" id="logo">
            <span v-for="(item, index) in textAreas" :key='item.tid' contenteditable
                @input="updateText(index, $event)" spellcheck="false" @focus="updateFocusEle(index)" :style="{'font-size': item.fontSize+'px', 'color': item.color, 'background-color': item.bgColor}"
            >{{item.value}}</span>
        </div>
    </div>

    <div class='text-add-remove'>
        <div class='additem' v-tooltip="{content: 'append a new text area to logo', show: true}" @click="additem">Add TextArea</div>
        <div class='removeitem' v-tooltip='{content: "remove the focused text area from logo", show: true}' @click="removeitem">Remove TextArea</div>
    </div>

    <div>
        Current Text: &nbsp;<span>{{currentText}}</span>
        <input id="currentTid" hidden v-model="currentTid" />
    </div>

    <div class='customize'>
        <div>Text Color: &nbsp; <input type="color" v-model="textColor" @change="updateColor"/></div>
        <div>Background Color: &nbsp; <input type="color" v-model="bgColor" @change="updateBgColor" /></div>
    </div>

    <div class="customize-misc">
        <div>
            Font Size: <input type="range" min="30" max="200" v-model="fontSize" @change="updateFontSize"/> {{ fontSize }}px
        </div>
    </div>

    <div class="download-share">
        <div class="download"
            v-tooltip="{ content: 'Export your own logo', show: true, classes: 'tooltipClasses' }"
            @click="download"
        >
            Export
        </div>
    </div>
  </div>
</template>

<script>
import domtoimage from 'dom-to-image'
const FileSaver = require('file-saver')

export default {
  name: 'Home',
  data () {
    return {
        currentTid: 0,
        bgColor: "black",
        textColor: "red",
        fontSize: "30",
        currentText: "edit",
        textAreas: [
            {
                tid: 1,
                value: 'edit',
                color: 'white',
                fontSize: '60',
                bgColor: 'black'
            },
            {
                tid: 2,
                value: 'me',
                color: 'yellow',
                fontSize: '60',
                bgColor: 'black'
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
                color: 'white',
                fontSize: '60',
                bgColor: 'black'
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
      download: function(){

      },
      updateText: function(idx, e){    
        this.textAreas[idx].value = '';
        if(e.target.childNodes[0] && e.target.childNodes[0].nodeValue){
            this.textAreas[idx].value = e.target.childNodes[0].nodeValue;
        }
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
      }

  },
  watch:{
      bgColor: function(val, oldVal){
          var idx = this.currentTid;
          idx = idx%this.textAreas.length;
          var textArea = this.textAreas[idx];
          if(!textArea){
              return;
          }
          textArea.bgColor = val;
      },
      textColor: function(val, oldVal){
        var idx = this.currentTid;
          idx = idx%textAreas;
          var textArea = this.textAreas[idx];
          if(!textArea){
              return;
          }
          textArea.color = val;
      },
      fontSize: function(val, oldVal){
          var idx = this.currentTid;
          idx = idx%textAreas;
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
.text-add-remove
    display flex
    justify-content space-around
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
.customize-misc
    display flex
    justify-content space-around
    width 100%
    margin-bottom 50px
    .customize-color > div,
    .customize-misc > div
        padding 8px 0

.box
    border 1px solid #333
    border-radius 10px
    padding 40px
    margin 40px 10px
    max-width 100%
    // width auto
    // display inline-block!important
    .logo
        padding 20px
        text-align center
        font-size 60px
        font-weight 700
        >span 
            padding 5px 5px
            border-radius 7px
</style>
