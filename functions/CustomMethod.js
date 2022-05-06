export function isPhone(message) {
  return this.test("isPhone", message, function (value) {
    const { path, createError } = this;
    if(!value){
      return createError({ path, message: message ?? 'กรุณากรอกโทรศัพท์' });
    }
    if(!isPhoneStartCorrect(value.toString())){
      return createError({ path, message: message ?? 'รูปแบบโทรศัพท์ให้ถูกต้องให้ถูกต้อง' });
    }
    if(!isPhoneNo(value.toString())){
      return createError({ path, message: message ?? 'กรุณากรอกโทรศัพท์ให้ถูกต้อง' });
    }
    
    return true;
  });
}
function isPhoneStartCorrect(input){
  if(input.includes('08',0)) return true;
  if(input.includes('06',0)) return true;
  if(input.includes('09',0)) return true;
  return false;
}
function isPhoneNo(input){
  const cleanText = input.replace(/-/g, "");
  var regExp = /^0[0-9]{9}$/i;
  const reslt = regExp.test(cleanText)
  return reslt;
}
export function isCitizenID(message) {
  return this.test("isCitizenID", message, function (value) {
    const { path, createError } = this;
    if(!value){
      return createError({ path, message: message ?? 'กรุณากรอกเลขบัตรประชาชน' });
    }
    if(!Script_checkID(value.toString())){
      return createError({ path, message: message ?? 'กรุณากรอกเลขบัตรประชาชนให้ถูกต้อง' });
    }
    return true;
  });
}
function Script_checkID(p_iPID){
  let total = 0;
  let cleanText;
  let chk;
  let Validchk;
  cleanText = p_iPID.replace(/-/g, "");
  Validchk = cleanText.substr(12, 1);
  let j = 0;
  let pidcut;
  for (let n = 0; n < 12; n++) {
      pidcut = parseInt(cleanText.substr(j, 1));
      total = (total + ((pidcut) * (13 - n)));
      j++;
  }

  chk = 11 - (total % 11);

  if (chk == 10) {
      chk = 0;
  } else if (chk == 11) {
      chk = 1;
  }
  if (chk == Validchk) {
      return true;
  } else {
      return false;
  }
}