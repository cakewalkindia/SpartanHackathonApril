/**
 * Created by Asif on 11-04-2015.
 */

//dbMongo.Notebook = new Mongo.Collection('notebook');
//dbMongo.Notebook
if(Meteor.isClient) {


    colNotebook = ({
        notebookExist: function (_notebookname) {
            var nbcount = dbMongo.Notebook.find({notebookname : _notebookname , userid: Meteor.userId() }).count();
            return nbcount > 0 ? true : false;
        },
        createNotebook: function (_notebookname) {
            if (colNotebook.notebookExist() == false) {

                var db = new dbObjects();
                db.notebook.notebookname = _notebookname;
                db.notebook.userid = Meteor.userId();

                console.log(db.notebook);

               Meteor.call("createnotebook",db.notebook);

               // dbMongo.Notebook.insert(db.notebook);

            } else {

                alert('notebook with same name exists')
            }
        }, getDefaultnotebook: function () {

            if (colNotebook.getTotalCount() <=0 ){
                //colNotebook.createNotebook('First Notebook');
                //return colNotebook.getNotebookList();
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
//                colNotebook.createNotebook('First Notebook');
            }

            return dbMongo.Notebook.find({ userid: Meteor.userId() }).fetch();
        }



    });

}



if (Meteor.isServer) {
    Meteor.startup(function () {
        Meteor.methods({
                createnotebook: function (_notebook) {
                    dbMongo.Notebook.insert(_notebook);


                }

            }
        )
    });

}

