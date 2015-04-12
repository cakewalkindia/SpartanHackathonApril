/**
 * Created by Asif on 11-04-2015.
 */


if(Meteor.isClient){
    Template.leftnavTemplate.helpers({
    tagslist: function () {
        //alert('notes.call');
        return colTags.getTagsList();
    },
    tagsCount : function(){
        return dbMongo.Tags.find().count()
    },
    notesCount : function(){
        return colNotes.getTotalCount();

    },notebookList : function(){

            return colNotebook.getNotebookList();


    }, notebookscount : function(){

        return colNotebook.getTotalCount();

    },
        notesinthebook : function(){
            return colNotebook.getNoteCountForNotebook(this._id);
        },
        tagCount : function(){
            return colTags.getTotalTags();
        },
        tagsInNotes:function(){
            return colNotes.getTagsInNotes(this.tagname);
        }
    });

    Template.leftnavTemplate.events({

        "click #createNotebook":function(event,tpl){
            var name=tpl.find("#notebookName").value;
            //var name = $('#notebookName')[0].value;
            //
            colNotebook.createNotebook(name);

            // Clear form
            $('#notebookName')[0].value = "";
            $('#notebookModal').modal('hide');
            clearEditor();
            // Prevent default form submit
            return false;
        },
        "click .nb":function(event, tpl){
            var notebookid = event.currentTarget.id;
            Session.set("type","notebook");
            Session.set("notebookid",notebookid);
            Session.set("noteid", "");
            clearEditor();
            return colNotes.getNotesList();
        },

        "click .clsnotedisplay" : function(event,tpl){
            Session.set("type","notes");
            Session.set("notebookid","");
            Session.set("noteid", "");
            clearEditor();
            return colNotes.getNotesList();
        },
        "click .clsTagsNotes":function(event,tpl){
            var tagname = event.currentTarget.getAttribute("data-tagname");
            Session.set("type","tags");
            Session.set("notebookid","");
            Session.set("noteid", "");
            Session.set("tagname", tagname);
            clearEditor();
            return colNotes.getNotesList();
        }
    })

    function clearEditor(){
        var editorObj = $("#txteditor").data('wysihtml5');
        var editor = editorObj.editor;
        editor.setValue('');

        var validTags=$("#tags")[0].value.split(',');
        for(var i=0;i<validTags.length;i++) {
            $("#tags").removeTag(validTags[i]);
        }

        var txttitle = $("#txttitle");
        txttitle.val('');

    }
}