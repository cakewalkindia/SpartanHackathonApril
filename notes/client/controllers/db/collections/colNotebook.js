/**
 * Created by Asif on 11-04-2015.
 */

jNotebook = new Mongo.Collection('notebook');
//dbMongo.Notebook
if(Meteor.isClient) {


    colNotebook = ({
        notebookExist: function (_notebookname) {
            var nbcount = jNotebook.find({notebookname : _notebookname , userid: Meteor.userId() }).count();
            return nbcount > 0 ? true : false;
        },
        createNotebook: function (_notebookname) {
            if (colNotebook.notebookExist() == false) {

                var db = new dbObjects();
                db.notebook.notebookname = _notebookname;
                db.notebook.userid = Meteor.userId();

                console.log(db.notebook);

               Meteor.call('addNotebooks',db.notebook);

               // jNotebook.insert(db.notebook);

            } else {

                alert('notebook with same name exists')
            }
        }, getDefaultnotebook: function () {

            if (colNotebook.getTotalCount() <=0 ){
                //colNotebook.createNotebook('First Notebook');
                //return colNotebook.getNotebookList();
                 return jNotebook.findOne({ userid: Meteor.userId() ,sort : { _id : 0 } }).fetch();

            }else
            {
                return jNotebook.findOne({ userid: Meteor.userId() ,sort : { _id : 0 } }).fetch();

            }


        }, getTotalCount : function(){
            var nbcount = jNotebook.find({ userid: Meteor.userId() }).count();
            return nbcount;


        }, getNotebookList : function () {

            if (colNotebook.getTotalCount() <=0 ){
               // colNotebook.createNotebook('First Notebook');
            }

            return jNotebook.find({ userid: Meteor.userId() }).fetch();
        }



    });

}




if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup

        Meteor.methods({
                'addNotebooks': function (objNotebook) {
                    dbMongo.NoteBooks.insert(objNotebook);
                }

            }
        )

    });
}

