const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const nameLabel = nameInput.parentElement;
const emailInput = document.querySelector('#email');
const emailLabel = emailInput.parentElement;
const otherJobInput = document.querySelector('#other-job-role');
const jobRoleSelect = document.querySelector('#title');
const colorSelect = document.querySelector('#color');
const designSelect = document.querySelector('#design');
const activityFieldset = document.querySelector('#activities');
const activities = activityFieldset.querySelectorAll('input');
const totalActivityCost = document.querySelector('#activities-cost');
const paymentMethodSelect = document.querySelector('#payment');
const paymentOptions = paymentMethodSelect.querySelectorAll('option');
const creditCardOption = document.querySelector(
  '#payment [value="credit-card"]'
);
const creditCardInfo = document.querySelector('#credit-card');
const paypalInfo = document.querySelector('#paypal');
const bitcoinInfo = document.querySelector('#bitcoin');
const ccNumber = document.querySelector('#cc-num');
const zipCode = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
const ccLabel = ccNumber.parentElement;
const zipCodeLabel = zipCode.parentElement;
const cvvLabel = cvv.parentElement;
let totalCost = 0;

// add default focus state
nameInput.focus();

// hide job text input on page load
otherJobInput.style.display = 'none';

// disable color select element
colorSelect.setAttribute('disabled', true);

// default payment option === credit card
creditCardOption.setAttribute('selected', true);
// hide all payment option info except credit card
paypalInfo.hidden = true;
bitcoinInfo.hidden = true;

/**
 * when 'select' element detects 'change', update job text input to display/hide based on selection
 *
 * @param {string} option -'Other' option for job selection
 */
function displayTextField(option) {
  if (option === 'other') {
    otherJobInput.style.display = '';
  } else {
    otherJobInput.style.display = 'none';
  }
}

/**
 * when 'design' select element detects 'change':
 * 1. enable 'color' select element
 * 2. display color selections based on 'design' selection
 * takes the 'option' parameter
 *
 * @param {string} designOption - tshirt design option
 */
function displayColorOptions(designOption) {
  const colorOptions = colorSelect.querySelectorAll('option');
  const selectDesignOption = colorOptions[0];
  colorSelect.removeAttribute('disabled');
  selectDesignOption.setAttribute('selected', true);

  colorOptions.forEach(option => {
    const colorTheme = option.dataset.theme;

    if (designOption === 'js puns') {
      if (colorTheme && colorTheme === 'heart js') {
        option.setAttribute('hidden', true);
      } else {
        option.removeAttribute('hidden');
        option.removeAttribute('selected');
      }
    } else if (designOption === 'heart js') {
      if (colorTheme && colorTheme === 'js puns') {
        option.setAttribute('hidden', true);
      } else {
        option.removeAttribute('hidden');
        option.removeAttribute('selected');
      }
    }
  });
}

//
/**
 * checks time of activity selected and disables/enables other activities with the same start time
 *
 * @param {element} selectedActivity - input element checked/unchecked
 */
function checkActivityTime(selectedActivity) {
  const selectedActivityData =
    selectedActivity.getAttribute('data-day-and-time');
  const selectedActivityLabel = selectedActivity.parentElement;

  activities.forEach(activity => {
    const activityData = activity.getAttribute('data-day-and-time');
    const activityLabel = activity.parentElement;
    if (selectedActivity.checked) {
      if (activityData) {
        if (activityData === selectedActivityData) {
          activity.disabled = true;
          selectedActivity.disabled = false;
          activityLabel.classList.add('disabled');
          selectedActivityLabel.classList.remove('disabled');
        }
      }
    } else {
      if (activityData) {
        if (activityData === selectedActivityData) {
          activity.disabled = false;
          activityLabel.classList.remove('disabled');
        }
      }
    }
  });
}

/**
 * when an activity is selected (check mark), cost is added to totalActivityCost
 * when an activity is unselected, cost is subtracted from totalActivityCost
 *
 * @param {element} activity - input element for activity
 * @param {number} cost - cost of activity
 */
function updateActivitiesTotal(activity, cost) {
  if (activity.checked) {
    totalCost += cost;
  } else {
    totalCost -= cost;
  }

  totalActivityCost.textContent = `Total: $${totalCost}`;
}

/**
 * add '.focus' className to activities on focus event
 *
 * @param {element} activity - focused activity element
 */
function addFocus(activity) {
  activity.classList.add('focus');
}

/**
 * remove '.focus' className to activities on blur event
 *
 * @param {element} activity - activity element with no focus
 */
function removeFocus(activity) {
  activity.classList.remove('focus');
}

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

/**
 * adds visual elements to invalid entries
 *
 * @param {element} el - invalid entry
 */
function notValid(el) {
  const hint = el.lastElementChild;
  el.classList.add('not-valid');
  el.classList.remove('valid');
  hint.style.display = 'unset';
}

/**
 * removes invalid visual elements
 *
 * @param {element} el - valid entry
 */
function valid(el) {
  const hint = el.lastElementChild;
  el.classList.add('valid');
  el.classList.remove('not-valid');
  hint.style.display = 'none';
}

/**
 * validates name field
 *
 * @returns {boolean} returns true if field is valid, false if NOT valid
 */
const validateName = () => {
  const nameRegex = /^.+$/;
  if (nameRegex.test(nameInput.value)) {
    valid(nameLabel);
    return true;
  } else {
    notValid(nameLabel);
    return false;
  }
};

/**
 * validates email field
 *
 * @returns {boolean} returns true if field is valid, false if NOT valid
 */
const validateEmail = () => {
  const emailRegex = /^.+@.+\.com$/;
  const hint = emailLabel.lastElementChild;
  if (emailRegex.test(emailInput.value)) {
    valid(emailLabel);
    return true;
  } else if (emailInput.value === '') {
    emailLabel.classList.add('not-valid');
    hint.textContent = 'An email must be provided';
    hint.style.display = 'unset';
    return false;
  } else {
    notValid(emailLabel);
    hint.textContent = 'Email address must be formatted correctly';
    return false;
  }
};

/**
 * validates activities
 *
 * @returns {boolean} returns true if field is valid, false if NOT valid
 */
const validateActivities = () => {
  const checked = [];
  for (let i = 0; i < activities.length; i++) {
    if (activities[i].checked) {
      checked.push(activities[i]);
    }
  }

  if (checked.length > 0) {
    valid(activityFieldset);
    return true;
  } else {
    notValid(activityFieldset);
    return false;
  }
};

/**
 * validates cc # field
 *
 * @returns {boolean} returns true if field is valid, false if NOT valid
 */
const validateCCNumber = () => {
  const ccNumberRegex = /\b\d{13,16}\b/;
  if (ccNumberRegex.test(Number(ccNumber.value))) {
    valid(ccLabel);
    return true;
  } else {
    notValid(ccLabel);
    return false;
  }
};

/**
 * validates zip code field
 *
 * @returns {boolean} returns true if field is valid, false if NOT valid
 */
const validateZipCode = () => {
  const zipCodeRegex = /^\d{5}$/;
  if (zipCodeRegex.test(Number(zipCode.value))) {
    valid(zipCodeLabel);
    return true;
  } else {
    notValid(zipCodeLabel);
    return false;
  }
};

/**
 * validates cvv field
 *
 * @returns {boolean} returns true if field is valid, false if NOT valid
 */
const validateCVV = () => {
  const cvvRegex = /^\d{3}$/;
  if (cvvRegex.test(Number(cvv.value))) {
    valid(cvvLabel);
    return true;
  } else {
    notValid(cvvLabel);
    return false;
  }
};

/**
 * validates credit card information IF credit card payment method is selected
 *
 * @returns {boolean} returns true if credit card is not selecting and runs validation on CC fields if CC is selected, returning true if they pass or false if they don't
 */
function ifCreditCardSelected() {
  const creditCardOption = paymentOptions[1].selected;

  if (creditCardOption) {
    if (validateCCNumber() && validateZipCode() && validateCVV()) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}

// if entire form is blank when submitted, show all field error indications
function checkBlankForm() {
  if (
    nameInput.value === '' &&
    emailInput.value === '' &&
    !activities.checked &&
    ccNumber.value === '' &&
    zipCode.value === '' &&
    cvv.value === ''
  ) {
    notValid(nameLabel);
    notValid(emailLabel);
    notValid(activityFieldset);
    notValid(ccLabel);
    notValid(zipCodeLabel);
    notValid(cvvLabel);
  }
}

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
  checkActivityTime(activity);
});

activities.forEach(activity => {
  const activityLabel = activity.parentElement;

  activity.addEventListener('focus', () => {
    addFocus(activityLabel);
  });
  activity.addEventListener('blur', () => {
    removeFocus(activityLabel);
  });
});

paymentMethodSelect.addEventListener('change', updatePaymentMethod);

form.addEventListener('submit', e => {
  if (
    validateName() &&
    validateEmail() &&
    validateActivities() &&
    ifCreditCardSelected()
  ) {
    return;
  } else {
    e.preventDefault();
    checkBlankForm();
    validateName();
    validateEmail();
    validateActivities();
    ifCreditCardSelected();
  }
});

form.addEventListener('keyup', e => {
  const input = e.target;
  if (input === nameInput) {
    validateName();
  } else if (input === emailInput) {
    validateEmail();
  } else if (input === ccNumber) {
    validateCCNumber();
  } else if (input === zipCode) {
    validateZipCode();
  } else if (input === cvv) {
    validateCVV();
  }
});
