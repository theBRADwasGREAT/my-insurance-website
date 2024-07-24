document.addEventListener('DOMContentLoaded', function() {
    const quoteForm = document.getElementById('quote-form');
    const insuranceType = document.getElementById('insurance-type');
    const coverageSlider = document.getElementById('coverage-slider');
    const coverageOutput = document.getElementById('coverage-output');
    const coverageDuration = document.getElementById('coverage-duration');
    const coverageDurationSlider = document.getElementById('coverage-duration-slider');
    const coverageDurationOutput = document.getElementById('coverage-duration-output');
    const quoteResult = document.getElementById('quote-result');

    // Update coverage slider output
    coverageSlider.addEventListener('input', function() {
        coverageOutput.textContent = `$${parseInt(this.value).toLocaleString()}`;
    });

    // Update coverage duration slider output
    coverageDurationSlider.addEventListener('input', function() {
        coverageDurationOutput.textContent = `${this.value} years`;
    });

    // Show/hide coverage duration based on insurance type
    insuranceType.addEventListener('change', function() {
        if (this.value === 'term') {
            coverageDuration.classList.remove('hidden');
        } else {
            coverageDuration.classList.add('hidden');
        }
    });

    // Handle form submission
    quoteForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const age = document.getElementById('age').value;
        const coverageAmount = coverageSlider.value;
        const selectedInsuranceType = insuranceType.value;
        let duration = '';

        if (selectedInsuranceType === 'term') {
            duration = coverageDurationSlider.value;
        }

        const quote = calculateQuote(age, selectedInsuranceType, coverageAmount, duration);
        displayQuote(quote);
    });

    // Handles manual form submission for amount
    const coverageManual = document.getElementById('coverage-manual');

coverageManual.addEventListener('input', function() {
    let value = this.value.replace(/[^0-9]/g, '');
    this.value = '$' + parseInt(value).toLocaleString();
    coverageSlider.value = value;
    coverageOutput.textContent = this.value;
});

coverageSlider.addEventListener('input', function() {
    coverageManual.value = '$' + parseInt(this.value).toLocaleString();
    coverageOutput.textContent = coverageManual.value;
});

// slidebar color change function
function updateSliderColor(slider) {
    const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
    const glowIntensity = (value) / 100 * 30;
    
    const transitionPoint = value;
    
    // Dark green (0, 100, 0) to light green (144, 238, 144)
    const r = Math.min(144, Math.round((144 * transitionPoint) / 100));
    const g = Math.min(238, Math.round(100 + (138 * transitionPoint) / 100));
    const b = Math.min(144, Math.round((144 * transitionPoint) / 100));
    
    const activeColor = `rgba(${r}, ${g}, ${b}, 1)`;
    const inactiveColor = 'rgba(200, 200, 200, 0.3)';
    
    slider.style.background = `linear-gradient(to right, 
        ${activeColor} 0%, 
        ${activeColor} ${value}%, 
        ${inactiveColor} ${value}%, 
        ${inactiveColor} 100%)`;
    slider.style.boxShadow = `${value}% 0 ${glowIntensity}px ${activeColor}`;
}


const sliders = document.querySelectorAll('input[type="range"]');
sliders.forEach(slider => {
    slider.addEventListener('input', function() {
        updateSliderColor(this);
    });
    updateSliderColor(slider);
});


// Handles manual form submission for duration

const durationManual = document.getElementById('duration-manual');

durationManual.addEventListener('input', function() {
    let value = this.value.replace(/[^0-9]/g, '');
    this.value = value + ' years';
    coverageDurationSlider.value = value;
    coverageDurationOutput.textContent = this.value;
});

coverageDurationSlider.addEventListener('input', function() {
    durationManual.value = this.value + ' years';
    coverageDurationOutput.textContent = durationManual.value;
});


    function calculateQuote(age, type, amount, duration) {
        // This is a placeholder calculation. Replace with actual calculation logic.
        let baseRate = 0.005; // $5 per $1000 of coverage
        let ageMultiplier = age / 50;
        let typeMultiplier = type === 'term' ? 1 : 1.5;
        let monthlyPremium = (amount / 1000) * baseRate * ageMultiplier * typeMultiplier;
        
        return {
            age: age,
            type: type,
            amount: amount,
            duration: duration,
            monthlyPremium: monthlyPremium.toFixed(2)
        };
    }

    function displayQuote(quote) {
        quoteResult.innerHTML = `
            <h3>Your Quote</h3>
            <p>Age: ${quote.age}</p>
            <p>Insurance Type: ${quote.type}</p>
            <p>Coverage Amount: $${parseInt(quote.amount).toLocaleString()}</p>
            ${quote.duration ? `<p>Duration: ${quote.duration} years</p>` : ''}
            <p>Estimated Monthly Premium: $${quote.monthlyPremium}</p>
        `;
        quoteResult.classList.remove('hidden');
    }
});
