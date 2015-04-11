/**
 * Created by Asif on 11-04-2015.
 */


if(Meteor.isClient){
    Template.leftnavTemplate.events({
        "click #btnsubmit": function(){
            colNotebook.createNotebook("testing notebook create");
        }
    })
}