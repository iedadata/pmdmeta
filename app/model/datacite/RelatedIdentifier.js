Ext.define('PMDMeta.model.datacite.RelatedIdentifier', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'identifier',  type: 'string', mapping :function(data) {
                            if (data.firstChild)
				    return data.firstChild.textContent.replace('&amp;','&');
				}},
		{name: 'identifierType',   type: 'string', mapping: '@relatedIdentifierType'},
		{name: 'relation',  type: 'string', mapping: '@relationType'},
		{name: 'citation',  type: 'string'} //only used for display
	],
	validators: {
		identifier: { type: 'length', min: 1 },
		identifierType: { type: 'length', min: 1 },
		relation: { type: 'length', min: 1 }
	},		
	asXML: function(){
		var type="";
		var relation="";
		if (this.get('identifierType').length>0)
			type=' relatedIdentifierType="'+this.get('identifierType')+'"';
		if (this.get('relation').length>0)
			relation=' relationType="'+this.get('relation')+'"';		
		var result="";
		if (relation.length>0 || (type.length>0 && this.get('identifier').length>0))
			result='<relatedIdentifier'+type+relation+'>'+this.get('identifier').replace('&','&amp;').trim()+'</relatedIdentifier>';
		return result;
	}
});


