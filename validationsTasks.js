export default function validationsTasks(input) {
  const { title, description, completed } = input;

  let errors = {};

  if (!title) errors.title = "Should type a Title";
  if (!description) errors.description = "Should type a Description";
  if (completed === null) errors.completed = "Should pick";
  return errors;
}
