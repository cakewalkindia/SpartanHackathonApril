/**
 * Created by Asif on 11-04-2015.
 */

if(Meteor.isClient) {


    colNotebook = ({
        notebookExist: function (_notebookname) {
            var nbcount = dbMongo.Notebook.find({'notebookname': _notebookname}).count();
            return nbcount > 0 ? true : false;
        },
        createNotebook: function (_notebookname) {
            if (colNotebook.notebookExist() == false) {
                var db = new dbObjects();
                db.notebook.notebookname = _notebookname;
                db.notebook.userid = Meteor.userId();
                Meteor.call('addNotebooks',db.notebook);
            } else {
                alert('notbook with same name exists')
            }
        }, getDefaultnotebookid: function () {

            if (colNotebook.getTotalCount() <=0 ){
                colNotebook.createNotebook('First Notebook');

                // return dbMongo.Notebook.findOne({ userid: Meteor.userId() ,sort : { _id : 0 } }).fetch()._id;

            }
            // return dbMongo.Notebook.findOne({ userid: Meteor.userId() ,sort : { _id : 0 } })._id;
            return dbMongo.Notebook.findOne({ userid: Meteor.userId() })._id;

        }, getTotalCount : function(){
            var nbcount = dbMongo.Notebook.find({ userid: Meteor.userId() }).count();
            return nbcount;


        }, getNotebookList : function () {

            return dbMongo.Notebook.find({ userid: Meteor.userId() }).fetch();
        }


    });

}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup

        Meteor.methods({
                'addNotebooks': function (objNotebook) {
                    dbMongo.Notebook.insert(objNotebook);
                },
                'getNotebookList' : function (){

                    return "getnotebooklist";

                    if (colNotebook.getTotalCount() <=0 ){
                        colNotebook.createNotebook("First Notebook");

                    }

                    return dbMongo.Notebook.find({ userid: Meteor.userId() }).fetch();
                }

            }
        )

    });
}