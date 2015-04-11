/**
 * Created by admin_2 on 4/11/2015.
 */


dbObjects = function(){

    this.notebook = {
        notebookname:"",
        userid:""
    },
    this.tag ={
        tagname:"",
        userid:""
    },
    this.notes = {
        title:"",
        content:"",
        createddate: new Date(),
        modifieddate:new Date(),
        shared:false,
        sharedWith:[],
        tags:[],
        notebookid:"",
        userid:""
    }

}


