

export const AlumniHeaderImport  = [
    
    { field : 'ReferenceNbr', value : 'StudentNo', validation : 'required' },
    { field : 'BatchYr', value : 'BatchYr', validation : 'required|enum:2015-2016,2016-2017,2017-2018,2018-2019,2019-2020,2020-2021' },

    { field : 'FirstName', value : 'First Name', validation : 'required' },
    { field : 'LastName', value : 'Last Name', validation : 'required' },
    { field : 'MiddleName', value : 'Middle Name', validation : 'required' }    
]



export const ProfileHeaderImport  = [
    
    { field : 'FirstName', value : 'First Name', validation : 'required' },
    { field : 'LastName', value : 'Last Name', validation : 'required' },
    { field : 'MiddleName', value : 'Middle Name', validation : 'required' }

]





export const AccountHeaderImport  = [
    
    { field : 'ReferenceNbr', value : 'StudentNo', validation : 'required' },
    { field : 'BatchYr', value : 'BatchYr', validation : 'required' },
 
]

