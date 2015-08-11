Ext.define('PMDMeta.store.datacite.combobox.ContributortypeCombo', {
    extend: 'Ext.data.Store',
    model:  'PMDMeta.model.Combobox',
    storeId: 'ContributortypeCombo',	
    data: [
					{abbr:'ContactPerson',name:'Contact Person', qtip:'Person with knowledge of how to access, troubleshoot, or otherwise field issues related to the resource; May also be &quot;Point of Contact&quot; in organization that controls access to the resource, if that organization is different from Publisher, Distributor, Data Manager. '},
					{abbr:'DataCollector',name:'Data Collector', qtip:'Person/institution responsible for finding, gathering/collecting data under the guidelines of the author(s) or Principal Investigator (PI);  May also use when crediting survey conductors, interviewers, event or condition observers, person responsible for monitoring key instrument data. '},
					{abbr:'DataCurator',name:'Data Curator', qtip:'Person tasked with reviewing, enhancing, cleaning, or standardizing metadata and the associated data submitted for storage, use, and maintenance within a data center or repository;While the &quot;DataManager&quot; is  concerned with digital maintenance, the DataCurator&apos;s role encompasses quality assurance focused on content and metadata. This includes checking whether  the submitted dataset is complete, with all files and components as described by submitter, whether the metadata is standardized to appropriate systems and schema, whether specialized metadata is needed to add value and ensure access across disciplines, and determining how the metadata might map to search engines, database products, and automated feeds. '},
					{abbr:'DataManager',name:'Data Manager', qtip:'Person (or organization with a staff of data managers, such as a data centre) responsible for maintaining the finished resource. The work done by this person or organization ensures that the resource is periodically &quot;refreshed&quot; in terms of software/hardware support, is kept available or is protected from unauthorized access, is stored in accordance with industry standards, and is handled in accordance with the records management requirements applicable to it. '},
					{abbr:'Distributor',name:'Distributor', qtip:'Institution tasked with responsibility to generate/disseminate copies of the  resource in either electronic or print form. Works stored in more than one  archive/repository may credit each as a distributor.'},
					{abbr:'Editor',name:'Editor', qtip:'A person who oversees the details related to the publication format of the resource. Note: if the Editor is to be credited in place of multiple authors, the Editor\'s name may be supplied as Author, with &quot;(Ed.)&quot; appended to the name. '},	
					{abbr:'Funder',name:'Funder', qtip:'Recommended for discovery. Institution that provided financial support for the development of the resource. Includes organizations that provide funding via regular budget allocations, through grants or awards '},
					{abbr:'HostingInstitution',name:'Hosting Institution', qtip:'Typically, the organization allowing the resource to be available on the internet through the provision of its hardware/software/operating support. May also be used for an organization that stores the data offline.  Often a data centre (if that data centre is not the "publisher" of the resource.) '},
					{abbr:'Producer',name:'Producer', qtip:'Typically a person or organization responsible for the artistry and form of a media product. In the data industry, this may be a company "producing" DVDs that package data for future dissemination by a distributor. '},
					{abbr:'ProjectLeader',name:'Project Leader', qtip:'Person officially designated as head of project team or sub-project team instrumental in the work necessary to development of the resource. The Project Leader is not "removed" from the work that resulted in the resource; he or she remains intimately involved throughout the life of the particular project team.'},
					{abbr:'ProjectManager',name:'Project Manager', qtip:'Person officially designated as manager of a project. Project may consist of one or many project teams and sub-teams. The manager of a project normally has more administrative responsibility than actual work involvement. '},						
					{abbr:'ProjectMember',name:'Project Member', qtip:'Person on the membership list of a designated project/project team. This vocabulary may or may not indicate the quality, quantity, or substance of the person&apos;s involvement. '},
					{abbr:'RegistrationAgency',name:'Registration Agency', qtip:'Institution/organization officially appointed by a Registration Authority to handle specific tasks within a defined area of responsibility. DataCite is a Registration Agency for the International DOI Foundation (IDF). One of DataCite&apos;s tasks is to assign DOI prefixes to the allocating agents who then assign the full, specific character string to data clients, provide metadata back to the DataCite registry, etc. '},
					{abbr:'RegistrationAuthority', name:'Registration Authority ', qtip:'A standards-setting body from which Registration Agencies obtain official recognition and guidance. The IDF serves as the Registration Authority for the International Standards Organization (ISO) in the area/domain of Digital Object Identifiers. ' },
					{abbr:'RelatedPerson',name:'Related Person', qtip:'A person without a specifically defined role in the development of the resource, but who is someone the author wishes to recognize. This person could be an author&apos;s intellectual mentor, a person providing intellectual leadership in the discipline or subject domain, etc. '},						
					{abbr:'Researcher',name:'Researcher', qtip:'A person involved in analyzing data or the results of an experiment or formal study. May indicate an intern or assistant to one of the authors who helped with research but who was not so "key" as to be listed as an author. Should be a person, not an institution. Note that a person involved in the gathering of data would fall under the contributorType "DataCollector." The researcher may find additional data online and correlate it to the data collected for the experiment or study, for example.  '},						
					{abbr:'ResearchGroup',name:'Research Group', qtip:'Typically refers to a group of individuals with a lab, department, or division; the group has a particular, defined focus of activity. May operate at a narrower level of scope; may or may not hold less administrative responsibility than a project team. '},						
					{abbr:'RightsHolder',name:'Rights Holder', qtip:'Person or institution owning or managing property rights, including intellectual property rights over the resource. '},
					{abbr:'Sponsor',name:'Sponsor', qtip:'Person or organization that issued a contract or under the auspices of which a work has been written, printed, published, developed, etc. Includes organizations that provide in-kind support, through donation, provision of people or a facility or instrumentation necessary for the development of the resource, etc. '},
					{abbr:'Supervisor',name:'Supervisor', qtip:'Designated administrator over one or more groups/teams working to produce a resource or over one or more steps of a development process. '},
					{abbr:'WorkPackageLeader',name:'Workpackage Leader', qtip:'A Work Package is a recognized data product, not all of which is included in publication. The package, instead, may include notes, discarded documents, etc.  The Work Package Leader is responsible for ensuring the comprehensive contents,  versioning, and availability of the Work Package during the development of the resource.  '},
					{abbr:'Other',name:'Other', qtip:'Any person or institution making a significant contribution to the development and/or maintenance of the resource, but whose contribution does not "fit" other controlled vocabulary for contributorType. Could be a photographer, artist, or writer whose contribution helped to publicize the resource (as opposed to creating it), a reviewer of the resource, someone providing administrative services to the author (such as depositing updates into an online repository, analysing usage, etc.), or one of many other roles. '}
]				
});