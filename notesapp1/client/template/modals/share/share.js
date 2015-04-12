if(Meteor.isClient){
    Template.shareModalTemplate.rendered = function(){

        $("#shareEmails").tagsInput({'height': '50px','width':'100%','defaultText':'Email'});
    };

    Template.shareModalTemplate.events({

        "click #shareButton":function(event,tpl){
            var noteid = Session.get("noteid");
            var emails = tpl.find("#shareEmails").value;
            emailArray=[]
            if(emails.length>0)
            emailArray=emails.split(',');
            var checkArray = $(".shareSuggestionCheckboxes");
            for(var j=0;j<checkArray.length;j++){
                if(checkArray[j].checked==true)
                    emailArray.push(checkArray[j].value);
            }
            for(var i=0;i<emailArray.length;i++){
            dbMongo.Notes.update({_id:noteid},{$push:{sharedWith:emailArray[i]}});
            var length = dbMongo.Share.find({sharedBy:Meteor.userId(),sharedWith:emailArray[i]}).count();
            if(length<=0)
            dbMongo.Share.insert({sharedBy:Meteor.userId(),sharedWith:emailArray[i]});
            }



            for(k=0;k<emailArray.length;k++){
                emailSender.sendEmail(emailArray[k],noteid);
                $("#shareEmails").removeTag(emailArray[k])
            }


            $("#shareModal").modal('hide');



        }
    })

    Template.shareModalTemplate.helpers({

        sharedSuggestion:function(){
            return dbMongo.Share.find({sharedBy:Meteor.userId()});
        }
    })
}
