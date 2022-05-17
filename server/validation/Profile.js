const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateProfile(data) {
  let errors = {};
  data.avatar= !isEmpty(data.avatar) ? data.avatar : "";
  data.tel = !isEmpty(data.tel) ? data.tel : "";
  data.adress_actuel = !isEmpty(data.adress_actuel) ? data.adress_actuel : "";
  data.cin = !isEmpty(data.cin) ? data.cin : "";
  data.matricule_voiture = !isEmpty(data.matricule_voiture) ? data.matricule_voiture : "";
  data.type_voiture = !isEmpty(data.type_voiture) ? data.type_voiture : "";
  data.poids = !isEmpty(data.poids) ? data.poids : "";
  
  if (validator.isEmpty(data.avatar)) {
    errors.avatar = "Required avatar";
  }
 

  if (validator.isEmpty(data.tel)) {
    errors.tel = "Required tel";
  }
 

  if (validator.isEmpty(data.adress_actuel)) {
    errors.adress_actuel = "Required adress_actuel";
  }
  
  if (validator.isEmpty(data.cin)) {
    errors.cin = "Required cin";
  }
  
  if (validator.isEmpty(data.matricule_voiture)) {
    errors.matricule_voiture = "Required maticule";
  }

  if (validator.isEmpty(data.type_voiture)) {
    errors.type_voiture = "Required type";
  } if (validator.isEmpty(data.poids)) {
    errors.poids = "Required poids";
  }

  return {
      errors,
      isValid: isEmpty(errors)
  }
};
