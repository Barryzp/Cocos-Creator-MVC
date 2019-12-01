//不用node.js fs的原因：会有一些小问题，fire-fs和path是ccc官方对fs模块做了一层封装
const FS=require('fire-fs');
const PATH=require('fire-path');
Editor.Panel.extend({
  style: FS.readFileSync(Editor.url("packages://code-generator/panel/index.css"),'utf-8'),
  template: FS.readFileSync(Editor.url("packages://code-generator/panel/index.html"),'utf-8'),

  $: {
    contentinput: '#contentinput',
    btn: '#btn',
    normalinput:'#normalinput',
  },

  ready () {
    var self=this;
    this.$contentinput.value = "NewContentControl";
    this.$normalinput.value = "Scripts/NewScript";
    this.$btn.addEventListener('confirm', () => {
      this.createContentControl();
    });
    this.vueBtn = new window.Vue({
      el: this.shadowRoot,
      created() { },
      data: { test: "test" },
      methods: {
        onBtnClick() {
          self.createNormalControl();
        }
      },
    });
  },

  createContentControl:function(){
    let filename=this.$contentinput.value+'';
    let scirptContent=`
import BaseContentControl from "../Framework/BaseContentControl";
const {ccclass, property} = cc._decorator;

@ccclass
export default class ${filename} extends BaseContentControl {

    /** 定义的相关绑定脚本
    label:LabelBinder=null;
    btn1Control:ButtonBinder=null;
    */
    onLoad(){
        super.onLoad();
    }

    start(){
        super.start();

        /*  初始化
        this.btn1Control=this.findComponet("button1");
        this.btn1Control.setClickHandler(this.helloWorld,this,"10");
        */
    }

    /** 按钮事件的绑定
    helloWorld(target,customData){
        console.log("hello world."+customData)
    }*/
}`;

    let relativePath="Scripts/ContentControl/"+filename;
    let scriptPath = `db://assets/${relativePath}`;
    this.createScript(filename,scriptPath,scirptContent);
  },

  createNormalControl:function(){
    let relativePath=this.$normalinput.value+'';
    let paths=relativePath.split('/');
    let filename=paths[paths.length-1];
    let scriptPath = `db://assets/${relativePath}`;
    let scirptContent=
`
const {ccclass, property} = cc._decorator;

@ccclass
export default class ${filename} extends cc.Component {
  
  onLoad() { 

  }

  start() { 

  }

  update(dt) { 

  }
  
}`;
    this.createScript(filename,scriptPath,scirptContent);
  },

  createScript(filename,filepath,content){
    Editor.assetdb.create(filepath + '.ts', content, function (err, results) {
      if(err){
        Editor.error(`${filename} created failed!`);
        return;
      }

      Editor.log(`${filename} created successfully!`);
    });
  },

  messages: {
    'hello-world:hello' (event) {
    }
  }
});