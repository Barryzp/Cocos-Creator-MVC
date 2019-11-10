//不用node.js fs的原因：会有一些小问题，fire-fs和path是ccc官方对fs模块做了一层封装
const FS=require('fire-fs');
const PATH=require('fire-path');

// panel/index.js, this filename needs to match the one registered in package.json
Editor.Panel.extend({
  // css style for panel
  style: FS.readFileSync(Editor.url("packages://hello-world/panel/index.css"),'utf-8')
  ,

  // html template for panel
  template: FS.readFileSync(Editor.url("packages://hello-world/panel/index.html"),'utf-8'),

  // element and variable binding
  $: {
    input: '#input',
    btn: '#btn',
  },


  // method executed when template and styles are successfully loaded and initialized
  ready () {
    var path=__dirname;
    this.vueBtn=new window.Vue({
        el:this.shadowRoot,
        created(){},
        data:{test:"test"},
        methods: {
          onBtnClick(){
            Editor.Ipc.sendToMain('hello-world:clicked')
            Editor.log('a message sent by vue btn.')
          }
        },
    });
    this.$input.value="./Scripts/ContentControl";
    this.$btn.addEventListener('confirm', () => {
      Editor.Ipc.sendToMain('hello-world:clicked',"asdasdas");
      //debugger
      console.log("Click")
      this.createBtnClick();
      Editor.log(path);
    });
  },

  createBtnClick:function(){
  },

  // register your ipc messages here
  messages: {
    'hello-world:hello' (event) {
    }
  }
});