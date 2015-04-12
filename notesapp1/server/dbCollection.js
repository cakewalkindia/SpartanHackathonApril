/**
 * Created by chetan on 11-04-2015.
 */

Attachments=new FS.Collection('notesattachment',{
    stores:[new FS.Store.FileSystem('notesattachment',{path:'C:/attachment'})]
});


if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
        process.env.MAIL_URL="smtp://chetan@cakewalk.in:cakewalk2014@smtp.gmail.com:587";
        smtp = {
            username: 'chetan.bhimewal@gmail.com',
            password: '9860436209',
            server:   'smtp.gmail.com',
            port: 587
        }
        Meteor.methods({
            sendEmail: function (to, from, subject, text) {
                check([to, from, subject, text], [String]);

                // Let other method calls from the same client start running,
                // without waiting for the email sending to complete.
                this.unblock();

                Email.send({
                    to: to,
                    from: from,
                    subject: subject,
                    text: text
                });
                console.log('email send');
            }
        });
    });
}