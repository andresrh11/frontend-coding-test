export default function validationsProfile(input) {
  const { fullName, age, occupation, nickname, gender, picture } = input;
  let newAge = parseInt(age);
  let errors = {};
  if (!fullName) errors.fullName = "Should type a name";
  if (age == "") errors.age = "Should type an age";
  if (!Number.isInteger(newAge) && age !== "")
    errors.age = "Age should be a number";
  if (!occupation) errors.occupation = "Should type an occupation";
  if (!nickname) errors.nickname = "Should type a nickname";
  if (!gender) errors.gender = "Should type a gender";
  if (!picture) errors.picture = "Should upload a picture URL";
  return errors;
}
