/**
 * Created by Asif on 11-04-2015.
 */


if(Meteor.isClient) {
    Template.leftnavTemplate.events({
        "click #btnsubmit": function () {
            colNotebook.createNotebook("testing notebook create");
        },

        "click #createNotebook":function(event,tpl){
            var name=tpl.find("#notebookName").value;
            //var name = $('#notebookName')[0].value;
            //
            colNotebook.createNotebook(name);

            // Clear form
            $('#notebookName')[0].value = "";
            $('#notebookModal').modal('hide');
            // Prevent default form submit
            return false;
        }
    });


    Template.leftnavTemplate.helpers(
        {
            notebookList: function () {
                return colNotebook.getNotebookList();
            },notebookscount : function(){

               return colNotebook.getTotalCount();

            },tagslist: function () {

               return colTags.getTagsList();
            },
            tagsCount : function(){
                return dbMongo.NotesTags.find().count()
            }

        }
    )
}