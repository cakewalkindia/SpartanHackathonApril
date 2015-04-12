
NotesAttachment=new FS.Collection('notesattachment',{
    stores:[new FS.Store.FileSystem('notesattachment',{path:'C:/attachment'})]
});


if (Meteor.isClient) {

    /*Template.hello.helpers({
     notesattachment:function(){
     return NotesAttachment.find();
     }
     });*/


    Template.righteditorTemplate.helpers({
        notebookList : function(){
            return colNotebook.getNotebookList();
        }


    })



    Template.righteditorTemplate.rendered = function(){
        $('#txteditor').wysihtml5();
    };
    Template.righteditorTemplate.events({

        'change .fileInput':function(event,template){
            FS.Utility.eachFile(event,function(file){
                var fileObj=new FS.File(file);
                /*NotesAttachment.insert({NoteId:'1', Name:fileObj.original,Attachment_Path:'C:/projectUploads',UserId:Meteor.userId()},function(err){
                 console.log(err);*/
                NotesAttachment.insert(fileObj,function(err){
                    console.log(err);
                })
            })
        },
        'click #btnSaveNote':function(event,tpl){
            var notebookid=tpl.find("#selNotebook").value;
            var title=tpl.find("#txttitle").value;
            var content=tpl.find('#txteditor').value;
            colNotes.createNotes(title,content,new Date(),new Date(),false,[],[],notebookid);
        }
    });
}