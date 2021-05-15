const nameInput = document.querySelector('#name');
const otherJobInput = document.querySelector('#other-job-role');
const jobRoleSelect = document.querySelector('#title');
console.log(jobRoleSelect);

// add default focus state
nameInput.focus();

// hide job text input on page load
otherJobInput.style.display = 'none';

// when select element detects 'change', update job text input to display/hide based on selection
function displayTextField(option) {
  if (option === 'other') {
    otherJobInput.style.display = '';
  } else {
    otherJobInput.style.display = 'none';
  }
}

jobRoleSelect.addEventListener('change', e => {
  const selectedOption = e.target.selectedOptions[0].value;
  displayTextField(selectedOption);
});
