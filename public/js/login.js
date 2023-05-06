const formContainer = document.querySelector('#loginForm');
const emailValue = document.querySelector('#email');
const passwordValue = document.querySelector('#password');
const submitBtn = document.querySelector('#submitBtn');
const data = {
  email: emailValue.value,
  password: passwordValue.value,
};
const formData = new FormData(formContainer);
console.log(formData);
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  fetch('http://localhost:3000/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
});
