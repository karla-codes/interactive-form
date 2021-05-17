const nameInput = document.querySelector('#name');
const otherJobInput = document.querySelector('#other-job-role');
const jobRoleSelect = document.querySelector('#title');
const colorSelect = document.querySelector('#color');
const designSelect = document.querySelector('#design');
const activityFieldset = document.querySelector('#activities');
const totalActivityCost = document.querySelector('#activities-cost');
let totalCost = 0;

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

// disable color select element
colorSelect.setAttribute('disabled', true);

// when 'design' select element detects 'change':
// 1. enable 'color' select element
// 2. display color selections based on 'design' selection
// takes the 'option' parameter
function displayColorOptions(option) {
  const jsPunsColors = document.querySelectorAll('[data-theme="js puns"]');
  const heartJSColors = document.querySelectorAll('[data-theme="heart js"]');
  colorSelect.removeAttribute('disabled');

  if (option === 'js puns') {
    heartJSColors.forEach(color => {
      color.setAttribute('hidden', true);
    });
    jsPunsColors.forEach(color => {
      color.removeAttribute('hidden');
    });
  } else if (option === 'heart js') {
    jsPunsColors.forEach(color => {
      color.setAttribute('hidden', true);
    });
    heartJSColors.forEach(color => {
      color.removeAttribute('hidden');
    });
  }
}

// when an activity is selected (check mark), cost is added to totalActivityCost
// when an activity is unselected, cost is subtracted from totalActivityCost
function updateActivitiesTotal(activity, cost) {
  if (activity.checked) {
    totalCost += cost;
  } else {
    totalCost -= cost;
  }

  totalActivityCost.textContent = `Total: $${totalCost}`;
}

// event listeners
jobRoleSelect.addEventListener('change', e => {
  const selectedOption = e.target.selectedOptions[0].value;
  displayTextField(selectedOption);
});

designSelect.addEventListener('change', e => {
  const selectedOption = e.target.selectedOptions[0].value;
  displayColorOptions(selectedOption);
});

activityFieldset.addEventListener('change', e => {
  const activity = e.target;
  const activityCost = Number(activity.getAttribute('data-cost'));
  updateActivitiesTotal(activity, activityCost);
});
