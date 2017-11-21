/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
 
 Ext.define('PMDMeta.view.datacite.SubjectsGCMD', {
    extend: 'PMDMeta.view.datacite.Grid',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
        'PMDMeta.model.datacite.ThesaurusSubject',
        'PMDMeta.store.datacite.SubjectGCMD',
        'PMDMeta.view.main.ComboBox',
        'PMDMeta.view.main.ThesaurusWindow'
    ],
    xtype: 'DataCite-SubjectsGCMD',
    title: 'NASA GCMD Science Keywords',
    frame: true,
    layout: 'fit',
    modelname: 'PMDMeta.model.datacite.ThesaurusSubject',
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            height: 200,
            plugins: [this.cellEditing],
            store: 'DataCiteSubjectGCMD',
            columns: [
            {
                xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'resources/images/icons/fam/page_white_edit.png',
                    tooltip: 'Add via Thesaurus',
                    scope: this,
                    handler: this.onAddViaThesaurus
                }]
            },      
            {       
                header: 'Keyword',
                dataIndex: 'subject',
                flex: 1,
                sortable: false,        
                menuDisabled: true,             
                editor: {
                    allowBlank: false,
                    editable: false
                }   
            },{
                header: 'Scheme',
                dataIndex: 'subjectScheme',
                width: 130,
                sortable: false,        
                menuDisabled: true,             
                editor: {
                    allowBlank: false,
                    editable: false
                }   
            },{
                header: 'Scheme URI',
                dataIndex: 'subjectSchemeURI',
                width: 130,                     
                sortable: false,        
                menuDisabled: true, 
                editor: {
                    allowBlank: false,
                    editable: false
                }   
            },{
                header: 'Language',
                dataIndex: 'lang',   
                width: 130,
                sortable: false,        
                menuDisabled: true,             
                editor: {
                    allowBlank: false,
                    editable: false
                }
            },{
                xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'resources/images/icons/fam/delete.gif',
                    tooltip: 'Delete Subject',
                    scope: this,
                    handler: this.onRemoveClick
                }]
            }],
            selModel: {
                selType: 'cellmodel'
            }
        });
        this.callParent();
    },
    onAddViaThesaurus:function (grid, rowIndex){
        var me=this;
        var result = null;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", 'resources/thesaurus/thesaurus_list.txt', false);
        xmlhttp.send();
        if (xmlhttp.status==200) {
          result = xmlhttp.responseText;
        }
        var list = result.split('\n');
        if (!me.thesaurus)
            me.thesaurus=Ext.create('PMDMeta.view.main.ThesaurusWindow', {
                thesaurusList: list});
        me.thesaurus.setExchangeStore(me.getStore());
        console.log(me.getStore());
        me.thesaurus.show();
    },
    onRemoveClick: function(grid, rowIndex){
        var me=this;
        me.getStore().removeAt(rowIndex);
        me.newEntry();      
    }

});
