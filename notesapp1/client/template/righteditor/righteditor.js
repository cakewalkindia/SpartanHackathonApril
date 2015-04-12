
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

    function addTags(tagElement){
            if(tagElement==null || tagElement==""){
                return;
            }
            var string = tagElement.value;
            var tagsArray = string.split(',')

            for(var i=0;i<tagsArray.length;i++){
                //Insert each tag using tagsArray[i]

                var existingTagLength = dbMongo.NotesTags.find({$and:[{userid:Meteor.userId()}, {tagname:tagsArray[i]}]}).count();
                if(existingTagLength==0){
                    colTags.createTag(tagsArray[i]);

                }
                else
                    continue;
            }

            return tagsArray;

    }


    Template.righteditorTemplate.rendered = function(){
        $('#txteditor').wysihtml5();
        $("#tags").tagsInput({'height': '50px','width':'100%'})
    };
    Template.righteditorTemplate.events({

        'change #btnfileUpload':function(event,template){
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
            if(title==null || title.trim()==""){
                bootbox.alert("Please enter title for this note.", function() {  });
                return;
            }
            else if(content==null || content.trim()==""){
                bootbox.alert("Please enter content for this note.", function() { });
                return;
            }

            var validTags = addTags(tpl.find("#tags"));
            var sessionnoteid=Session.get('noteid');
            if(sessionnoteid!=null && sessionnoteid!=""){
                colNotes.updateNotes(sessionnoteid,notebookid,title,content);
            }
            else  {
                colNotes.createNotes(title,content,new Date(),new Date(),false,[],validTags,notebookid);
            }

            tpl.find("#txttitle").value=""; var editorObj = $("#txteditor").data('wysihtml5');
            var editor = editorObj.editor;
            editor.setValue("");
            for(var i=0;i<validTags.length;i++)
                $("#tags").removeTag(validTags[i]);
        }
    });
}