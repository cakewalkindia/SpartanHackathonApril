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
        }, getDefaultnotebook: function () {

            if (colNotebook.getTotalCount() <=0 ){
                colNotebook.createNotebook('First Notebook');

                return dbMongo.Notebook.findOne({ userid: Meteor.userId() ,sort : { _id : 0 } }).fetch();

            }else
            {
                return dbMongo.Notebook.findOne({ userid: Meteor.userId() ,sort : { _id : 0 } }).fetch();

            }


        }, getTotalCount : function(){
            var nbcount = dbMongo.Notebook.find({ userid: Meteor.userId() }).count();
            return nbcount;


        }, getNotebookList : function () {

            if (colNotebook.getTotalCount() <=0 ){
                colNotebook.createNotebook("First Notebook");

            }

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
                }

            }
        )

    });
}