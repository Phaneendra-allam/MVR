/* ═══════════════════════════════════════════════
   MVRP EXPORTS – FORM JAVASCRIPT
   Validation, submission, success state
═══════════════════════════════════════════════ */

/* ═══════════════════
   FORM ELEMENTS
═══════════════════ */
const inquiryForm  = document.getElementById('inquiryForm');
const formSuccess  = document.getElementById('form-success');
const submitBtn    = inquiryForm ? inquiryForm.querySelector('.submit-btn') : null;

/* ═══════════════════
   VALIDATION RULES
═══════════════════ */
const VALIDATORS = {
  fname: {
    required: true,
    minLength: 2,
    label: 'Full Name',
    message: 'Please enter your full name (at least 2 characters).'
  },
  femail: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    label: 'Email',
    message: 'Please enter a valid email address.'
  },
  fcountry: {
    required: true,
    label: 'Country',
    message: 'Please select your country.'
  },
  fproduct: {
    required: true,
    label: 'Product',
    message: 'Please select the product you are interested in.'
  }
};

/* ═══════════════════
   VALIDATE SINGLE FIELD
═══════════════════ */
function validateField(id) {
  const rules  = VALIDATORS[id];
  if (!rules) return true;

  const el     = document.getElementById(id);
  const errEl  = document.getElementById(`${id}-error`);
  if (!el) return true;

  const value  = el.value.trim();
  let isValid  = true;
  let message  = '';

  if (rules.required && !value) {
    isValid = false;
    message = rules.message;
  } else if (rules.minLength && value.length < rules.minLength) {
    isValid = false;
    message = rules.message;
  } else if (rules.pattern && value && !rules.pattern.test(value)) {
    isValid = false;
    message = rules.message;
  }

  // Update UI
  el.classList.toggle('error', !isValid);
  if (errEl) {
    errEl.textContent = isValid ? '' : message;
  }

  return isValid;
}

/* ═══════════════════
   VALIDATE FULL FORM
═══════════════════ */
function validateForm() {
  const fieldIds = Object.keys(VALIDATORS);
  let allValid   = true;

  fieldIds.forEach(id => {
    const valid = validateField(id);
    if (!valid) allValid = false;
  });

  return allValid;
}

/* ═══════════════════
   LIVE VALIDATION
   Validate on blur (when field loses focus)
═══════════════════ */
function initLiveValidation() {
  Object.keys(VALIDATORS).forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener('blur', () => validateField(id));
    el.addEventListener('input', () => {
      // Clear error on input if was invalid
      if (el.classList.contains('error')) {
        validateField(id);
      }
    });
  });
}

/* ═══════════════════
   BUILD EMAIL CONTENT
   Format inquiry as readable text
═══════════════════ */
function buildEmailContent() {
  const data = {
    name:     document.getElementById('fname')?.value.trim()    || '',
    company:  document.getElementById('fcompany')?.value.trim() || 'Not provided',
    email:    document.getElementById('femail')?.value.trim()   || '',
    country:  document.getElementById('fcountry')?.value        || '',
    product:  document.getElementById('fproduct')?.value        || '',
    quantity: document.getElementById('fqty')?.value.trim()     || 'Not specified',
    message:  document.getElementById('fmessage')?.value.trim() || 'No additional details'
  };

  return data;
}

/* ═══════════════════
   FORM SUBMISSION
═══════════════════ */
async function handleFormSubmit(e) {
  e.preventDefault();

  // Validate
  if (!validateForm()) {
    // Scroll to first error
    const firstError = inquiryForm.querySelector('.error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstError.focus();
    }
    return;
  }

  // Loading state
  submitBtn?.classList.add('loading');

  try {
    const formData = buildEmailContent();

    // ─────────────────────────────────────────────
    // PHASE 1 (GitHub Pages – Static):
    // We simulate submission. No actual email sent.
    // In Phase 2 (AWS), replace this block with a
    // real fetch() to your AWS API Gateway endpoint.
    // ─────────────────────────────────────────────

    await simulateSubmission(formData);

    // Show success
    showFormSuccess();

    // Log to console for debugging
    console.log('📧 Inquiry submitted:', formData);

    // ─────────────────────────────────────────────
    // PHASE 2 – REAL SUBMISSION (AWS SES):
    // Uncomment and configure when AWS is ready:
    //
    // const response = await fetch('https://your-api.amazonaws.com/inquiry', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // });
    //
    // if (!response.ok) throw new Error('Submission failed');
    // showFormSuccess();
    // ─────────────────────────────────────────────

  } catch (error) {
    console.error('Form error:', error);
    showFormError();
  } finally {
    submitBtn?.classList.remove('loading');
  }
}

/* ─── Simulate async submission ─── */
function simulateSubmission(data) {
  return new Promise(resolve => setTimeout(resolve, 1200));
}

/* ─── Show success state ─── */
function showFormSuccess() {
  if (inquiryForm)  inquiryForm.style.display  = 'none';
  if (formSuccess) {
    formSuccess.classList.add('visible');
    formSuccess.style.display = 'block';
  }
}

/* ─── Show error state ─── */
function showFormError() {
  const errMsg = document.createElement('p');
  errMsg.style.cssText = `
    color: #e05555;
    font-size: 13px;
    text-align: center;
    margin-top: 12px;
    font-weight: 600;
  `;
  errMsg.textContent = '⚠️ Something went wrong. Please email us directly at exports@mvrpexports.com';

  const existing = inquiryForm?.querySelector('.global-error');
  if (existing) existing.remove();

  errMsg.className = 'global-error';
  inquiryForm?.appendChild(errMsg);
}

/* ═══════════════════
   CHARACTER COUNTER
   For message textarea
═══════════════════ */
function initCharCounter() {
  const textarea = document.getElementById('fmessage');
  if (!textarea) return;

  const counter = document.createElement('span');
  counter.style.cssText = `
    font-size: 11px;
    color: var(--text-muted);
    text-align: right;
    display: block;
    margin-top: 4px;
  `;
  textarea.parentElement.appendChild(counter);

  textarea.addEventListener('input', () => {
    const len = textarea.value.length;
    counter.textContent = `${len} characters`;
    counter.style.color = len > 800 ? '#e05555' : 'var(--text-muted)';
  });
}

/* ═══════════════════
   INIT
═══════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', handleFormSubmit);
    initLiveValidation();
    initCharCounter();
  }
});
