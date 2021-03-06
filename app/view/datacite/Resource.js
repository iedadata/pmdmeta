/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
 
Ext.define('PMDMeta.view.datacite.Resource', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
	'PMDMeta.model.datacite.Resource',
	'PMDMeta.store.datacite.Resource',
	'PMDMeta.store.datacite.combobox.PublisherCombo',
	'PMDMeta.view.main.ComboBox',
    'PMDMeta.store.datacite.combobox.ResourcetypeGeneralCombo',
    'PMDMeta.store.datacite.combobox.LanguageCombo',
    ],
    xtype: 'DataCite-Resource',  
    initComponent: function() {
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });
    layout: 'fit',	
	Ext.create('PMDMeta.store.datacite.combobox.PublisherCombo');
        Ext.apply(this, {
            plugins: [this.cellEditing],
            store: 'DataCiteResource',
            columns: [
	           {
                    //show DOI in title bar
                    width:0,
                    dataIndex: 'identifier',
                    renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                        if (value)
                            this.up().setTitle("DOI:"+  value + " Resource Information");
                    }
                }, {
                header: 'Type',
                dataIndex: 'identifiertype',
                flex: 1,
		        hidden: true,
		        sortable: false,		
                menuDisabled: true,			    
                editor: {
                    allowBlank: false
                }
            }, {
                cls: 'PMDrequired',         
                header: 'Resource Type',
                dataIndex: 'resourceTypeGeneral',
                sortable: false,        
                menuDisabled: true,         
                width: 180,
                editor: new PMDMeta.view.main.ComboBox({
                store: 'ResourcetypeGeneralCombo'
                }),
                renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                    if (value === "") {
                        record.set('resourceTypeGeneral','Dataset');
                        return 'Dataset';
                    }
                    return value;
                }                  
            },{
		cls: 'PMDrequired',		    
                header: 'Publisher',
                dataIndex: 'publisher',
                flex: 1, 
		        sortable: false,		
                menuDisabled: true,			    
                editor: new PMDMeta.view.main.ComboBox({
		        store: 'PublisherCombo',
                    editable: true                  
		}),
                renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                    var qtip="The name of the entity that holds, archives, publishes prints, distributes, releases, issues, or produces the resource.";
                    qtip+=" This property will be used to formulate the citation, so consider the prominence of the role.";
                    metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(qtip) + '"';
                    return value;
                }                
            },{
		cls: 'PMDrequired',		    
                header: 'Year',
                dataIndex: 'publicationYear',
                width: 80,		
		        sortable: false,		
                menuDisabled: true,			    
                editor: new Ext.form.field.Text({
                    vtype: 'DataCitePublicationYear'
                }),
                renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                    var qtip="The year when the data was or will be made publicly available. <b>Use a four digit number.</b>";
                    qtip+=" If an embargo period has been in effect, use the date when the embargo period ends. In the case of datasets, <i>publish</i>"; 
                    qtip+=" is understood to mean making the data available on a specific date to the community of researchers. If there is no standard";
                    qtip+=" publication year value, use the date that would be preferred from a citation perspective. ";
                    metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(qtip) + '"';
                    if (value === "") {
                        var d = new Date();
                        var year = d.getFullYear();
                        record.set('publicationYear',year);
                        return year;
                    }
                    return value;
                } 
            },{
                header: 'Language of content',
                dataIndex: 'language',   
                width: 170,
                sortable: false,        
                menuDisabled: true,           
                editor: new PMDMeta.view.main.ComboBox({
                    store: 'LanguageCombo'
                }),
                renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                    if (value === "") {
                        record.set('lang','en');
                        return 'en';
                    }
                    return value;
                }       
            }],
            selModel: {
                selType: 'cellmodel'
            }
        });

        this.callParent();
       

        if (Ext.supports.Touch) {
            this.addDocked({
                xtype: 'header',
                title: '<b>Note that cell editing is not recommeded on keyboardless touch devices.</b>'
            });
        }

        this.on('afterlayout', this.loadStore, this, {
            delay: 1,
            single: true
        });
    },

    loadStore: function() {
     //   this.getStore().load();
        var rec = Ext.create('PMDMeta.model.datacite.Resource');

        var store=this.getStore();
        if (store.getCount()==0)
            store.insert(0, rec);    
    }
});
