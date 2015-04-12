/**
 * Created by admin_2 on 4/11/2015.
 */

/**
 * Created by Asif on 11-04-2015.
 */

if(Meteor.isClient) {


    colNotes = ({
        createNotes: function (_title, _content,  _createddate, _modifieddate, _shared, _sharedWith, _tags, _notebookid) {
            var db = new dbObjects();
            db.notes.title = _title;
            db.notes.content = _content;
            db.notes.createddate = _createddate;
            db.notes.modifieddate = _modifieddate;
            db.notes.shared = _shared;
            db.notes.sharedWith = _sharedWith;
            db.notes.tags = _tags;
            db.notes.notebookid = _notebookid;
            db.notes.userid = Meteor.userId();
            db.notes.editedBy="You";
            if(_notebookid!=null &&  _notebookid==""){
                colNotebook.createNotebook('First Notebook');
                db.notes.notebookid= dbMongo.Notebook.find({ userid: Meteor.userId() }).fetch()[0]._id;
            }
            Meteor.call('addNotes',db.notes);
        },
        updateNotes:function(_noteid,_notebookid,_title,_content){
        var _tags=colTags.getTagsToAssign();
           // Meteor.call('updateNotes',_noteid,_notebookid,_title,_content,_tags);

            //dbObjects.history.title=_title;
            //dbObjects.history.content=_content;
            //dbObjects.history.tags=_tags;
            //dbObjects.history.editedBy=_editedBy;
            //dbObjects.history.modifieddate=new Date();

            var editedBy="";
            var notesUserId =dbMongo.Notes.find({_id:_noteid}).fetch();
            if(notesUserId[0].userid==Meteor.userId())
            {
                editedBy="You";
            }
            else{
                var userEmail=Meteor.users.find({_id:Meteor.userId()}).fetch();
                editedBy=userEmail[0].emails[0].address;
            }
            var obj={title:_title,content:_content,tags:_tags,editedBy:editedBy,modifieddate:new Date()}
            dbMongo.Notes.update({_id:_noteid},{$set:{title:obj.title,content:obj.title,tags:obj.tags,editedBy:editedBy} });
            dbMongo.Notes.update({_id:_noteid},{$push:{history:obj} });

            //dbMongo.Notes.update({_id:_noteid},{$set:{title:_title,content:_content,tags:_tags,editedBy:editedBy,$push:{history:dbObjects.history} }});
        },
        getNotesList:function(){
            //Meteor.call('getNotesList');

            var type = Session.get("type");
            var noteslist;
            if(type=='tags'){
                var tagname =  Session.get("tagname");
                return  dbMongo.Notes.find({userid : Meteor.userId(), tags:tagname}).fetch();
            }
            else if(type=="search"){
                var strSearch = Session.get("seachvalue");
                noteslist = dbMongo.Notes.find({$or:[{title:{$regex:strSearch}},{content:{$regex:strSearch}},{sharedWith:{$regex:strSearch}}]}).fetch();
            }
            else if(type == "notes"){
                noteslist =  dbMongo.Notes.find({userid : Meteor.userId()}).fetch();
            }else{
                var notebookid = Session.get("notebookid");

                if(notebookid =="" || typeof notebookid == "undefined"){
                    notebookid= colNotebook.getDefaultnotebookid();
                    Session.set("notebookid",notebookid);
                }
                noteslist =  dbMongo.Notes.find({userid : Meteor.userId(), notebookid:notebookid}).fetch();
            }
            Session.set("notelist", noteslist);
            return Session.get("notelist");

        },
        getNote:function(noteid){
          var  note =  dbMongo.Notes.find({userid : Meteor.userId(), _id:noteid}).fetch();
            return note;
        },
        getTotalCount :function(){
            return  dbMongo.Notes.find({userid : Meteor.userId()}).count();
        },
        getTagsInNotes:function(tagname){
            return  dbMongo.Notes.find({userid : Meteor.userId(), tags:tagname}).count();
        }




    });

}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup

        Meteor.methods({
                'addNotes': function (objNote) {
                    dbMongo.Notes.insert(objNote);
                },
                'updateNotes':function(_noteid,_notebookid,_title,_content,_tags){

                    dbObjects.history.title=_title;
                    dbObjects.history.content=_content;
                    dbObjects.history.tags=_tags;
                    dbObjects.history.editedBy=_editedBy;
                    dbObjects.history.modifieddate=new Date();

                    var editedBy="";
                    var notesUserId =dbMongo.Notes.find({_id:_noteid}).userid;
                    if(notesUserId==Meteor.userId())
                    {
                        editedBy="You";
                    }
                    else{
                        var userEmail=Meteor.users.find({_id:Meteor.userId()}).fetch().email[0].address;
                        editedBy=userEmail;
                    }


                    dbMongo.Notes.update({_id:_noteid},{$set:{title:_title,content:_content,tags:_tags,editedBy:editedBy,$push:{history:dbObjects().history} }});
                },
                'getNotesList':function(){
                    return dbMongo.Notes.find({userid : Meteor.userId()}).fetch();
                }

            }
        )

    });
}
