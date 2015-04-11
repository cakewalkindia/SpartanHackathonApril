/**
 * Created by Asif on 11-04-2015.
 */

if(Meteor.isClient){
  Template.centerlistTemplate.helpers({
      notes:function(){
         var noteList = colNotes.getNotesList();
         Session.set("notelist",noteList);
          return Session.get("notelist");
      }

  });

    Template.registerHelper("prettifyDate", function(timestamp) {
        return new Date(timestamp).toString('yyyy-MM-dd')
    });

}
