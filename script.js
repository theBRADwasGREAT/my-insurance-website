// JavaScript for the insurance premium calculator

// Function to handle form submission
function handlePremiumCalculatorSubmit(event) {
    event.preventDefault(); // Prevent default form submission
  
    // Get form inputs
    let age = parseInt(document.getElementById('age').value);
    let coverageType = document.getElementById('coverage-type').value;
    let coverageAmount = parseInt(document.getElementById('term-coverage').value);
    let termDuration = parseInt(document.getElementById('term-duration-slider').value);
  
    // Calculate premium based on inputs
    let monthlyPremium = calculateMonthlyPremium(age, coverageType, coverageAmount, termDuration);
  
    // Display premium results
    displayPremiumResults(monthlyPremium);
  }
  
  // Function to calculate monthly premium
  function calculateMonthlyPremium(age, coverageType, coverageAmount, termDuration) {
    // Example premium calculation logic based on age, coverage type, amount, and duration factors
    let basePremium = 50; // Example base premium amount per $10,000 coverage
    let adjustedPremium = basePremium * (coverageAmount / 10000); // Adjust premium based on coverage amount
    let ageFactor = 1 + (age / 100); // Example age factor (adjust as per actual insurance data)
    let termFactor = coverageType === 'term' ? (1 + (termDuration / 100)) : 1; // Adjust premium based on term duration
  
    // Calculate estimated monthly premium
    let monthlyPremium = adjustedPremium * ageFactor * termFactor;
  
    // Return monthly premium (rounded to two decimal places)
    return monthlyPremium.toFixed(2);
  }
  
  // Function to display premium results dynamically
  function displayPremiumResults(monthlyPremium) {
    // Update premium details in the results section
    let premiumDetails = document.getElementById('premium-details');
    premiumDetails.innerHTML = `
      <p>Estimated Monthly Premium: $${monthlyPremium}</p>
    `;
  
    // Show the results section
    let premiumResultsSection = document.getElementById('premium-results');
    premiumResultsSection.classList.remove('hidden');
  }
  
  // Event listener for form submission
  document.getElementById('premium-calculator').addEventListener('submit', handlePremiumCalculatorSubmit);
  
  // Event listener for coverage type dropdown change
  document.getElementById('coverage-type').addEventListener('change', function() {
    let termDurationSection = document.getElementById('term-duration');
    if (this.value === 'term') {
      termDurationSection.classList.remove('hidden');
    } else {
      termDurationSection.classList.add('hidden');
    }
  });
  
  // Event listener for term coverage amount slider with manual input option
  document.getElementById('term-coverage').addEventListener('input', function() {
    document.getElementById('term-coverage-input').value = this.value;
    document.getElementById('term-coverage-output').textContent = `$${this.value.toLocaleString()}`;
  });
  
  // Event listener for
  

  // JavaScript for the insurance quote generator

document.addEventListener('DOMContentLoaded', function() {
    // Get references to form elements
    const form = document.getElementById('quote-form');
    const insuranceTypeSelect = document.getElementById('insurance-type');
    const coverageDurationSection = document.getElementById('coverage-duration');
  
    // Event listener for insurance type selection change
    insuranceTypeSelect.addEventListener('change', function() {
      if (insuranceTypeSelect.value === 'term') {
        coverageDurationSection.classList.remove('hidden');
      } else {
        coverageDurationSection.classList.add('hidden');
      }
    });
  
    // Event listener for coverage amount slider with manual input option
    const coverageSlider = document.getElementById('coverage');
    const coverageOutput = document.getElementById('coverage-output');
  
    coverageSlider.addEventListener('input', function() {
      coverageOutput.textContent = `$${this.value.toLocaleString()}`;
    });
  
    // Event listener for coverage amount manual input option
    const coverageInput = document.getElementById('coverage-output');
  
    coverageInput.addEventListener('input', function() {
      coverageSlider.value = this.value.replace(/\D/g,'');
      coverageOutput.textContent = `$${this.value.replace(/\D/g,'').toLocaleString()}`;
    });
  
    // Event listener for form submission
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent default form submission
  
      // Retrieve form data
      const age = parseInt(document.getElementById('age').value);
      const insuranceType = insuranceTypeSelect.value;
      const coverageAmount = parseInt(document.getElementById('coverage').value);
      let coverageDuration = null;
  
      if (insuranceType === 'term') {
        coverageDuration = parseInt(document.getElementById('coverage-duration-slider').value);
      }
  
      // Perform quote generation logic (replace with actual logic)
      generateQuote(age, insuranceType, coverageAmount, coverageDuration);
    });
  
    // Function to generate quote (example)
    function generateQuote(age, insuranceType, coverageAmount, coverageDuration) {
      // Example quote generation logic
      let quoteDetails = document.getElementById('quote-details');
      quoteDetails.innerHTML = `
        <p>Insurance Type: ${insuranceType}</p>
        <p>Age: ${age}</p>
        <p>Coverage Amount: $${coverageAmount.toLocaleString()}</p>
      `;
  
      if (insuranceType === 'term') {
        quoteDetails.innerHTML += `<p>Coverage Duration: ${coverageDuration} years</p>`;
      }
  
      // Show the quote result section
      document.getElementById('quote-result').classList.remove('hidden');
    }
  });
  