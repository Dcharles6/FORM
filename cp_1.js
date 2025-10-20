// Select elements
const form = document.getElementById('feedback-form');
const feedbackDisplay = document.getElementById('feedback-display');
const comments = document.getElementById('comments');
const charCount = document.getElementById('char-count');

// Character count
comments.addEventListener('input', () => {
  charCount.textContent = `${comments.value.length} / 200 characters`;
});

// Tooltip handling via event delegation
document.body.addEventListener('mouseover', (event) => {
  if (event.target.dataset.tooltip) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = event.target.dataset.tooltip;
    document.body.appendChild(tooltip);

    const rect = event.target.getBoundingClientRect();
    tooltip.style.left = `${rect.left}px`;
    tooltip.style.top = `${rect.top - 30}px`;
    tooltip.style.display = 'block';
    event.target._tooltip = tooltip;
  }
});

document.body.addEventListener('mouseout', (event) => {
  if (event.target._tooltip) {
    event.target._tooltip.remove();
    event.target._tooltip = null;
  }
});

// Prevent background clicks from triggering form events
document.body.addEventListener('click', (event) => {
  if (!form.contains(event.target)) {
    event.stopPropagation();
  }
});

// Form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const comment = comments.value.trim();

  if (!name || !email || !comment) {
    alert('Please fill in all fields before submitting.');
    return;
  }

  // Create feedback entry
  const entry = document.createElement('div');
  entry.classList.add('feedback-entry');
  entry.innerHTML = `
    <strong>${name}</strong> (${email})<br>
    <p>${comment}</p>
  `;

  feedbackDisplay.appendChild(entry);

  form.reset();
  charCount.textContent = '0 / 200 characters';
});
