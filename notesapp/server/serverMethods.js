/**
 * Created by Asif on 11-04-2015.
 */

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

