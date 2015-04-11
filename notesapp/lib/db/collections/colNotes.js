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
            Meteor.call('addNotes',db.notes);
        },
        updateNotes:function(_noteid,_sharedWith){
            Meteor.call('updateNotes',_noteid,_sharedWith);
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
                'updateNotes':function(_noteid,_sharedWith){
                    var arrSharedWith = dbMongo.Notes.find({_id:_noteid}).fetch().sharedWith;
                    $.each(_sharedWith, function(i,id){
                        if(arrSharedWith.indexOf(id) == -1){
                            arrSharedWith.push(id);
                        }
                    });
                    dbMongo.Notes.update({_id:_noteid},{$set:{sharedWith:arrSharedWith, shared:true}});
                }

            }
        )

    });
}
