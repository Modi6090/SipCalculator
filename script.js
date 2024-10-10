function calculateSIP() {
    // Getting input values
    let initialInvestment = parseFloat(removeCommas(document.getElementById('initialInvestment').value)) || 0;
    let investmentPerYear = parseFloat(removeCommas(document.getElementById('investmentPerYear').value)) || 0;
    let annualIncrease = parseFloat(removeCommas(document.getElementById('annualIncrease').value)) || 0;
    let frequency = document.getElementById('frequency').value;
    let years = parseFloat(removeCommas(document.getElementById('years').value)) || 0;
    let rateOfReturn = parseFloat(removeCommas(document.getElementById('rateOfReturn').value)) || 0;
    let inflation = parseFloat(removeCommas(document.getElementById('inflation').value)) || 0;
    let investmentType = document.getElementById('investmentType').value;

    let totalInvestment = 0;
    let finalValue = 0;

    // SIP Calculation logic
    if (investmentType === 'SIP') {
        const months = frequency === 'Monthly' ? 12 : (frequency === 'Quarterly' ? 4 : 1);
        for (let i = 0; i < years; i++) {
            for (let j = 0; j < months; j++) {
                totalInvestment += investmentPerYear / months;
                let rate = inflation ? (rateOfReturn - inflation) / 100 / months : rateOfReturn / 100 / months;
                finalValue += (investmentPerYear / months) * Math.pow((1 + rate), (years * months - i * months - j));
            }
            investmentPerYear += (investmentPerYear * annualIncrease / 100);
        }
    } else if (investmentType === 'Lumpsum') {
        totalInvestment = initialInvestment;
        let rate = inflation ? (rateOfReturn - inflation) / 100 : rateOfReturn / 100;
        finalValue = initialInvestment * Math.pow(1 + rate, years);
    }

    let estimatedProfit = finalValue - totalInvestment;

    // Update result on the page
    document.getElementById('totalInvestment').innerText = formatNumber(totalInvestment);
    document.getElementById('estimatedProfit').innerText = formatNumber(estimatedProfit);
    document.getElementById('finalValue').innerText = formatNumber(finalValue);

    //Function to remove commas from input values
    function removeCommas(str) {
        return str.replace(/,/g, '');
        }
    
    //Function to add commas to the output values
    function formatNumber(num) {
        return num.toLocaleString('en-IN');
    }

    // Draw Pie Chart
    const ctx = document.getElementById('sipChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Amount Invested', 'Return Generated'],
            datasets: [{
                data: [totalInvestment, estimatedProfit],
                backgroundColor: ['#ffcc00', '#28a745']
            }]
        }
    });
}