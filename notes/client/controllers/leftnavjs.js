/**
 * Created by Asif on 11-04-2015.
 */


if (Meteor.isClient) {


    Template.leftnavTemplate.helpers({
        tagslist: function () {
            //alert('notes.call');
            //return colTags.getTagsList();
        },
        tagsCount : function(){
            return dbMongo.NotesTags.find().count()
        },
        notesCount : function(){
           // return colNotes.getTotalCount();

        },notebookList : function(){
           return colNotebook.getNotebookList();

        }, notebookscount : function(){

            return colNotebook.getTotalCount();

        },setNotebookid : function(nbid){


        }
    });

/*
    Template.leftnavTemplate.events ({
        'click .nb' : function(evt , tpl){
            //console.log(evt);



        }

    });
*/

}
