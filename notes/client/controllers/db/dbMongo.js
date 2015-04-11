/**
 * Created by Asif on 11-04-2015.
 */
dbMongo = ({
    Notebook : new Mongo.Collection('col_notebooks'),
    Notes : new Mongo.Collection('col_notes'),
    NotesTags  : new Mongo.Collection('col_notestags'),
    NotesHistory : new Mongo.Collection('col_noteshistory'),
    NotesAttachment : new Mongo.Collection('col_notesattachment'),
    NotesShared : new Mongo.Collection('col_notesshared')
})




