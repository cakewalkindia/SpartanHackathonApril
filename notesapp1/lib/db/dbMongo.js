/**
 * Created by Asif on 11-04-2015.
 */
dbMongo = ({
    Notebook : new Mongo.Collection('notebook'),
    Notes : new Mongo.Collection('notes'),
    NotesTags  : new Mongo.Collection('notestags'),
    NotesHistory : new Mongo.Collection('noteshistory'),
    NotesAttachment : new Mongo.Collection('notesattachment'),
    NotesShared : new Mongo.Collection('notesshared'),
    Share : new Mongo.Collection('share')
})



