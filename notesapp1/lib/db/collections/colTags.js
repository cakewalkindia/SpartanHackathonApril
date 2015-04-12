/**
 * Created by admin_2 on 4/11/2015.
 */

if(Meteor.isClient) {


    colTags = ({
        tagExist: function (_tagname) {
            var nbcount = dbMongo.NotesTags.find({'tagname': _tagname}).count();
            return nbcount > 0 ? true : false;
        },
        createTag: function (_tagname) {
            if (colTags.tagExist() == false) {
                var db = new dbObjects();
                db.tag.tagname = _tagname;
                db.tag.userid = Meteor.userId();
                Meteor.call('addTags',db.tag);
            } else {
                alert('tag with same name exists')
            }
        }, getDefaultTag: function () {

        },
        getTagsList: function () {

            return dbMongo.NotesTags.find({userid: Meteor.userId()}).fetch();

        },
        getTotalTags : function(){
            return dbMongo.NotesTags.find({userid:Meteor.userId()}).count();
        }



    });

}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup

        Meteor.methods({
                'addTags': function (objTag) {
                    dbMongo.NotesTags.insert(objTag);
                }

            }
        )

    });
}