/**
 * Created by chetan on 11-04-2015.
 */

Attachments=new FS.Collection('notesattachment',{
    stores:[new FS.Store.FileSystem('notesattachment',{path:'C:/attachment'})]
});