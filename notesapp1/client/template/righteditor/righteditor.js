/**
 * Created by Asif on 11-04-2015.
 */

if (Meteor.isClient) {


    Template.righteditorTemplate.helpers({});


    Template.righteditorTemplate.rendered = function(){
        $("#txtEditor").wysihtml5();


    }
}

