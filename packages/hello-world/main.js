'use strict';

module.exports = {
  load () {
    // execute when package loaded
  },

  unload () {
    // execute when package unloaded
  },

  // register your ipc messages here
  messages: {
    'open' () {
      // open entry panel registered in package.json
      Editor.Panel.open('hello-world');
    },
    'say-hello' () {   
      // send ipc message to panel
      Editor.Ipc.sendToPanel('hello-world', 'hello-world:hello');
    },
    'clicked' () {
      Editor.log('Button clicked!');
      Editor.log(__dirname);
      //Editor.error(__dirname);
    }
  },
};