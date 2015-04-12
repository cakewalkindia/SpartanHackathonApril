/**
 * Created by SOHEB.RAPATI on 12-04-2015.
 */
if(Meteor.isClient){
    emailSender=({
        sendEmail:function(toemail,noteid){
            var senderId=Meteor.users.find({_id:Meteor.userId()}).fetch();
            var fromEmail=senderId[0].emails[0].address;
            var notes=dbMongo.Notes.find({_id:noteid}).fetch();
            var title=notes[0].title;
            var content=notes[0].content;
            var body='Title : '+title+'\n\n Content:'+content + '\n\n Please login to cakewalk notes to explore more \n\n See you there \n\n\n\n Thank you for your interest \n\n Cakewalk Spartans ';
            Meteor.call('sendEmail',
                toemail,
                'chetan@cakewalk.in',
                'You have a shared note from '+fromEmail,
                body);


        }
    });
}
