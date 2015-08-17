/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('PMDMeta.view.main.FileAndVersionForm', {
    extend: 'Ext.container.Container',
    requires: [
	'PMDMeta.view.fileupload.FileUpload',
	'PMDMeta.view.main.ItemVersions',
        'PMDMeta.view.main.FileDownloader',
        'Ext.window.MessageBox',
        'PMDMeta.view.main.DOIregistration'
    ],

    xtype: 'FileAndVersion-Form',
    
    layout:  'fit',
     initComponent: function() {
         
         var me=this;
         Ext.apply(me, {
             items: [
		{	
			xtype: 'form',
//			title: 'Files & Versions',
//			width: 270,
                        defaults:{margin: '0 0 10 0'},
                        layout:{type: 'vbox'/*, align: 'stretch'*/},
                        bodyPadding: 10,			
                        items:[
                                {
                                    xtype: 'PMD-FileUpload'
                                    ,hidden:true
                                },{
                                    xtype: 'ItemVersions'
                                    ,hidden:true
                                },{
                                    xtype: 'button',
                                    scale: 'large',                                                
                                    text: 'DOI',
hidden:true,
                                    tooltip: 'register a DOI or update metadata',
                                    handler: function() {
                                        if (!me.doiregistration)
                                            me.doiregistration=new PMDMeta.view.main.DOIregistration();
                                        me.doiregistration.setup();
                                        me.doiregistration.show();
                                    }
                                },{
                                    xtype: 'button',
                                    scale: 'large',
hidden: true,
                                    text: 'Preview',
                                    tooltip: 'preview Dataset in new Window',
                                    handler: function() {
                                        
                                        var item=Ext.getStore('Item').getAt(0);
                                        if (!item) return;
                                        var itemhref=item.get("href");
                                        if (!itemhref) return;
                                        var itemid=itemhref.substr(itemhref.lastIndexOf("/")+1,itemhref.length-1);
                                        if (!itemid) return;
                                        
                                        var href=window.location.href;
                                        var url;
                                        if (href.indexOf("?")>0)
                                            url=href.substr(0,href.indexOf("?"));
                                        else
                                            url=href;                                        
                                        var root=url.substr(0,url.lastIndexOf("/"));
                                        if (root.length===url.length-1) //trailing slash
                                            root=root.substr(0,root.lastIndexOf("/"))

                                        window.location.href=root+"/preview.php?id="+itemid;
                                    }
                                },{
                                    xtype: 'button',
                                    scale: 'large',                                                
                                    text: 'Clear',
                                    tooltip: 'Load default metadata',

                                    handler: function() {
                                        Ext.getStore('Item').loaddata();                                                    
                                    }
                                },{
                                    xtype: 'fileuploadfield',
                                    name: 'metaupload',
                                    tooltip: 'Load default metadata',
                                    buttonOnly: true,
                                    hideLabel:true,
                                    msgTarget: 'under',
                                    buttonConfig: {
                                         scale: 'large'
                                    },                                           
                                    buttonText: 'Load',
                                    listeners:{
                                        change: function( elem, value, eOpts ) {
                                            var form = elem.up('form').getForm();
                                            if(form.isValid()){
                                                form.submit({
                                                    url: 'resources/upload/metaupload.php',
                                                    waitMsg: 'Uploading..',
                                                    success: function(fp, o) {

                                                        if (!o.result.success){                                                               
                                                            Ext.Msg.alert('Failure', 'Error uploading file.' + o.result.error);
                                                            return;
                                                        }
                                                        Ext.Ajax.request({
                                                            url: 'resources/upload/metaupload.php',							
                                                            success: function(response, opts) {
                                                                if (response.responseText.length==0)
                                                                    return;

                                                                var itemstore=Ext.getStore('Item');
                                                                itemstore.unmarshal(response);
                                                                itemstore.changefunc();

                                                           },
                                                           failure: function(response, opts) {
                                                              console.log('server-side failure with status code ' + response.status);
                                                           }            
                                                        });                                                                
                                                    },
                                                    failure:function(fp, o) {
                                                        Ext.Msg.alert('Failure', 'Error uploading file.');
                                                    }
                                                });
                                            }
                                        }		
                                    }
                                },{
                                    xtype: 'button',
                                    scale: 'large',                                                
                                    text: 'Save As',
                                    tooltip: 'Save metadata to local hard disk',
                                    handler: function() {	  
                                        var xml=Ext.getStore('Item').marshal();
                                        Ext.Ajax.request({
                                            url: 'resources/upload/metastore.php',	
                                            method: 'POST',
                                            params:{
                                                storedata: xml
                                            },                                                        
                                            success: function(response, opts) {
                                                var title=Ext.getStore('DataCiteTitle').getAt(0).get('title');
                                                var dt=new Date();
                                                dt.setTime(Date.now());
                                                var filename=title+"_"+Ext.Date.format(dt,'YmdHi')+'.xml';

                                                var minPromptWidth=Ext.Msg.minPromptWidth;
                                                Ext.Msg.minPromptWidth=600;
                                                Ext.Msg.prompt('Save as', 'Filename:', function(btn, text){
                                                    if (btn === 'ok'){                                        
                                                        window.location.href='resources/upload/metastore.php?file='+Ext.String.htmlEncode(text);                                        
                                                    }
                                                }, null , false, filename);
                                                Ext.Msg.minPromptWidth=minPromptWidth;
                                           },
                                           failure: function(response, opts) {
                                              console.log('server-side failure with status code ' + response.status);
                                           }            
                                        });   
                                    }
                                },{
                                    xtype: 'button',
                                    scale: 'large',                                                
                                    text: 'Sync',
hidden: true,
                                    tooltip: 'Sync data to eSciDoc repository',
                                    handler: function() {	  
                                            Ext.getStore('Item').synccontent();
                                    }
                                },{
                                    xtype: 'button',
                                    scale: 'large',                                                
                                    text: 'Submit',
                                    handler: function() {	  
                                        var xml=Ext.getStore('Item').marshal();
                                        Ext.Ajax.request({
                                            url: 'resources/upload/submitmail.php',	
                                            method: 'POST',
                                            params:{
                                                mailcontent: xml
                                            },                                                        
                                            success: function(response, opts) {
                                                var responseData = Ext.decode(response.responseText);
                                                if(!responseData.success) {
                                                    Ext.Msg.show({
                                                        title: 'Submit mail',
                                                        msg: 'Submission failed. Please save the XML file and send it via mail.',
                                                        icon: Ext.Msg.ERROR,
                                                        buttons: Ext.Msg.OK
                                                    });
                                                }else{
                                                    Ext.Msg.show({
                                                        title: 'Submit mail',
                                                        msg: 'Submission mail sent successfully.',
                                                        icon: Ext.Msg.INFO,
                                                        buttons: Ext.Msg.OK
                                                    });
                                                }
                                            },
                                            failure: function(response, opts) {
                                              console.log('server-side failure with status code ' + response.status);
                                            }            
                                        });                                                                
//                                                    Ext.getStore('Item').synccontent();
                                    }
                                }
                        ]
                }			
            ]              
               
           });   
        this.callParent();
         
     }

});
