/**
 * Created by Asif on 11-04-2015.
 */

if(Meteor.isClient){
  Template.centerlistTemplate.helpers({
      notes:function(){
         var noteList = colNotes.getNotesList();
         Session.set("notelist",noteList);
          return Session.get("notelist");
      },
      displayfixedlengthstring:function(str){
          return str.substr(0,100)+"...";


         // var tempStr = str.substr(0,100);
        //  var count=0;
        //  for(i=tempStr.length;i=25;i--){
             // if(tempStr[i-1] == " "){
               //   count=i;
               //   break;
            //  }
        //  }
         // return str.substr(0,count)+"...";
      }

  });

    Template.centerlistTemplate.events({
        'click .clsnotes':function(event,tpl){
           var noteid = event.currentTarget.id;
            Session.set("noteid", noteid);
            clearEditor();
            showEditor();
            var objnote = colNotes.getNote(noteid);
            var ddlnotebooklist = $("#selNotebook");
            ddlnotebooklist.val(objnote[0].notebookid);
            var editorObj = $("#txteditor").data('wysihtml5');
            var editor = editorObj.editor;
            editor.setValue(objnote[0].content);

           /** var validTags=$("#tags")[0].value.split(',');
            for(var i=0;i<validTags.length;i++) {
                $("#tags").removeTag(validTags[i]);
            }**/

            var tags = objnote[0].tags;
            $.each(tags, function(i,tag){
                $("#tags").addTag(tag);
            })

            var txttitle = $("#txttitle");
            txttitle.val(objnote[0].title);
        },
        'click #btnSearch':function(event, tpl){
            var strSearch = tpl.find("#txtSearch").value;
            if(strSearch !="") {
                Session.set("seachvalue", strSearch);
                Session.set("type", "search");
                Session.set("notebookid", "");
                Session.set("noteid", "");
                tpl.find("#txtSearch").value = "";
                clearEditor();
                collapseEditor();
                return colNotes.getNotesList();
            }else{
                bootbox.alert("Please enter your search text.", function() {
                    return;
                });
            }
        }
    });

    Template.registerHelper("prettifyDate", function(timestamp) {
       // return new Date(timestamp).toString('yyyy-MM-dd')
        return moment(new Date(timestamp)).fromNow();
    });

     function clearEditor(){
         var editorObj = $("#txteditor").data('wysihtml5');
         var editor = editorObj.editor;
         editor.setValue('');
         if($("#tags").length>0) {
             var validTags = $("#tags")[0].value.split(',');
             for (var i = 0; i < validTags.length; i++) {
                 $("#tags").removeTag(validTags[i]);
             }
         }
         var txttitle = $("#txttitle");
         txttitle.val('');

     }

    function collapseEditor(){
       // $(".panelCenter").addClass("showEditor");
       // $(".panelRight").addClass("collapseEditor");
        $("#divEditor")[0].style.display="none";
        $(".panelRight")[0].style.width="0%";
        $(".panelCenter")[0].style.width="78%"
    }
    function showEditor(){
        // $(".panelCenter").addClass("showEditor");
        // $(".panelRight").addClass("collapseEditor");
        $("#divEditor")[0].style.display="";
        $(".panelRight")[0].style.width="50%";
        $(".panelCenter")[0].style.width="28%"
    }
}
