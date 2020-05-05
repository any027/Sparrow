# Sparrow
A simple project where we dynamically build a form from a given JSON Array of objects, 
each of which represents a form field. Once the form is built, a user should be able to submit the form, 
and return an object containing the data from the form (the `name` attribute should be the key for each field).

Certain objects in the JSON Array will contain a `conditional` field, which contains a function `show_if` 
that evaluates to a boolean: if `true`, the form field should render, if `false` it should not.
