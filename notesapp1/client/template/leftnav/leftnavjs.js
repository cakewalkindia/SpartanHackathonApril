/**
 * Created by Asif on 11-04-2015.
 */


if(Meteor.isClient) {
    Template.leftnavTemplate.events({
        "click #btnsubmit": function () {
            colNotebook.createNotebook("testing notebook create");
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