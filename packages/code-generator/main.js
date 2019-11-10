'use strict';
module.exports={
    load(){},
    unload(){},
    messages:{
        'open'(){
            Editor.Panel.open('code-generator');
        },
        // 'create-code'(){
        //     Editor.log('Hello World!'+Editor.Project.path);   
        //     var fs = require('fs');
        //     fs.readFile('D:/CocosWorkSpace/2019_11_05_MVC_Barry/packages/UICodeGenerator/test1.ts',{
        //         flag:'w+'
        //     } ,function (err,data) {
        //         if (err) {
        //             return Editor.log(err);
        //         }
        //         Editor.log("The file was saved!");
        //         Editor.log(__dirname);
        //     });
        // }
    }
}