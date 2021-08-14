exports.createCompanyInsertObject = (companyDetails) => {
    var companyInsertObject = { };
    var { name } = companyDetails ;

    companyInsertObject.name = name;

    return companyInsertObject;
}