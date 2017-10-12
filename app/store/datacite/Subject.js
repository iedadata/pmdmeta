Ext.define('PMDMeta.store.datacite.Subject', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.datacite.Subject',
    storeId: 'DataCiteSubject',
    proxy:{
            type: 'memory',
        reader:{
                type: 'xml',
                record: 'subject',
                rootProperty: 'resource'
                }
    },
    asXML: function (){
        var ret="";
        this.each(function(data){	
            ret+=data.asXML();
        }); 
        return ret;
    },
    asISOXML: function(){
        var ret="";
        this.each(function(keyword){
            ret+=keyword.asISOXML();
        });
	    if (ret.length>0)
        	ret='<gmd:descriptiveKeywords><gmd:MD_Keywords>'+ret+'</gmd:MD_Keywords></gmd:descriptiveKeywords>';
        return ret;
        
    },
    asDifXML:function(param){
        var ret="";
        if (param=='keyword'){
            this.each(function(keyword){
                ret+=keyword.asDifXML(param);
            });            
        }
        return ret;
    }    
});			

