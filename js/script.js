const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const otherJobInput = document.querySelector('#other-job-role');
const jobRoleSelect = document.querySelector('#title');
const colorSelect = document.querySelector('#color');
const designSelect = document.querySelector('#design');
const activityFieldset = document.querySelector('#activities');
const totalActivityCost = document.querySelector('#activities-cost');
const paymentMethodSelect = document.querySelector('#payment');
const paymentOptions = paymentMethodSelect.querySelectorAll('option');
const creditCardOption = document.querySelector(
  '#payment [value="credit-card"]'
);
const creditCardInfo = document.querySelector('#credit-card');
const paypalInfo = document.querySelector('#paypal');
const bitcoinInfo = document.querySelector('#bitcoin');
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

// default payment option === credit card
creditCardOption.setAttribute('selected', true);

// hide all payment option info except credit card
paypalInfo.hidden = true;
bitcoinInfo.hidden = true;

// when a payment method is selected, show selected payment info and hide the rest

function updatePaymentMethod() {
  for (let i = 0; i < paymentOptions.length; i++) {
    const paymentOption = paymentOptions[i];
    if (paymentOption.selected) {
      if (paymentOption.value === creditCardInfo.id) {
        creditCardInfo.hidden = false;
        paypalInfo.hidden = true;
        bitcoinInfo.hidden = true;
      } else if (paymentOption.value === paypalInfo.id) {
        paypalInfo.hidden = false;
        bitcoinInfo.hidden = true;
        creditCardInfo.hidden = true;
      } else {
        bitcoinInfo.hidden = false;
        paypalInfo.hidden = true;
        creditCardInfo.hidden = true;
      }
    }
  }
}

// validate form
// 1. name field can't be blank/empty
// 2. email field must be formated like one: name@email.com
// 3. must register for at least 1 activity
// 4. FOR CC PAYMENT ONLY (selected):
//  -cc number must be 13-16 digits w/no dashes or spaces
//  -zip code must contain 5 digits
//  -CVV must contain 3 digits

// validates name field
const validateName = () => {
  const nameRegex = /^.+$/;
  if (nameRegex.test(nameInput.value)) {
    return true;
  } else {
    return false;
  }
};

// validates email field
const validateEmail = () => {
  const emailRegex = /^.+@.+\.com$/;
  if (emailRegex.test(emailInput.value)) {
    return true;
  } else {
    return false;
  }
};

// validates activities
const validateActivities = () => {
  const activities = activityFieldset.querySelectorAll('input');
  for (let i = 0; i < activities.length; i++) {
    if (activities[i].checked) {
      return true;
    } else {
      return false;
    }
  }
};

// validates credit card IF selected
const validateCreditCard = () => {
  const creditCardOption = paymentOptions[1].selected;
  const ccNumber = Number(document.querySelector('#cc-num').value);
  const zipCode = Number(document.querySelector('#zip').value);
  const cvv = Number(document.querySelector('#cvv').value);

  if (creditCardOption) {
    const ccNumberRegex = /\b\d{13,16}\b/;
    const zipCodeRegex = /^\d{5}$/;
    const cvvRegex = /^\d{3}$/;

    if (
      ccNumberRegex.test(ccNumber) &&
      zipCodeRegex.test(zipCode) &&
      cvvRegex.test(cvv)
    ) {
      return true;
    } else {
      console.log(typeof ccNumber, typeof zipCode, typeof cvv);
      return false;
    }
  } else {
    return true;
  }
};

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

paymentMethodSelect.addEventListener('change', updatePaymentMethod);

form.addEventListener('submit', e => {
  if (
    validateName() &&
    validateEmail() &&
    validateActivities() &&
    validateCreditCard()
  ) {
    return;
  } else {
    e.preventDefault();
  }
});
