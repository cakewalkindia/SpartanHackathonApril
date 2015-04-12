/**
 * Created by SOHEB.RAPATI on 12-04-2015.
 */

if(Meteor.isClient) {
    Template.historytemplate.helpers({
        historylist: function () {
          return colHistory.getHistory();

       } 
    });



    colHistory = ({
        getHistory: function () {
            var noteid=Session.get('noteid');
            var divhistory=$('#divhistory');
            if(noteid==null || noteid=="'"){
                divhistory.hide();
                return;
            }
            var notes = dbMongo.Notes.find({'_id' :Session.get('noteid')}).fetch()[0].history;
            //divhistory.show();
           // notes=notes.fetch();
            return notes;
        }

        });

    Template.historytemplate.rendered= function () {

    }
}