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

    Template.centerlistTemplate.events({
        'click .clsnotes':function(event,tpl){
           var noteid = event.currentTarget.id;
            Session.set("noteid", noteid);
            var objnote = colNotes.getNote(noteid);
            var ddlnotebooklist = $("#selNotebook");
            ddlnotebooklist.val(objnote[0].notebookid);
            var editorObj = $("#txteditor").data('wysihtml5');
            var editor = editorObj.editor;
            editor.setValue(objnote[0].content);

            var txttitle = $("#txttitle");
            txttitle.val(objnote[0].title);
        },
        'click #btnSearch':function(event, tpl){
            var strSeach = tpl.find("#txtSearch").value;
            Session.set("seachvalue",strSeach);
            Session.set("type","search");
            Session.set("notebookid","");
            Session.set("noteid", "");
            tpl.find("#txtSearch").value="";
            return colNotes.getNotesList();
        }
    });

    Template.registerHelper("prettifyDate", function(timestamp) {
       // return new Date(timestamp).toString('yyyy-MM-dd')
        return moment(new Date(timestamp)).fromNow();
    });

}
