// Global variables
let titanicData = [];
let charts = {};

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    loadData();
});

// Load and process the Titanic dataset
async function loadData() {
    try {
        const response = await fetch('data/titanic.csv');
        const csvText = await response.text();
        titanicData = parseCSV(csvText);

        // Process the data
        processData();

        // Create all visualizations
        createSummaryCards();
        createGenderChart();
        createClassChart();
        createAgeChart();
        createAgeGroupChart();
        createPortChart();
        createFamilyChart();
        createDataTable();

        // Add fade-in animation
        document.querySelectorAll('.card').forEach(card => {
            card.classList.add('fade-in');
        });

    } catch (error) {
        console.error('Error loading data:', error);
        document.body.innerHTML = '<div class="container mt-5"><div class="alert alert-danger">Error loading data. Please check if the CSV file exists.</div></div>';
    }
}

// Parse CSV data
function parseCSV(csvText) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '') continue;

        const values = lines[i].split(',');
        const row = {};

        headers.forEach((header, index) => {
            let value = values[index] || '';
            // Remove quotes if present
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
            }

            // Convert numeric values
            if (header === 'PassengerId' || header === 'Survived' || header === 'Pclass' ||
                header === 'SibSp' || header === 'Parch') {
                value = parseInt(value) || 0;
            } else if (header === 'Age' || header === 'Fare') {
                value = parseFloat(value) || null;
            }

            row[header] = value;
        });

        data.push(row);
    }

    return data;
}

// Process data for analysis
function processData() {
    // Add derived fields
    titanicData.forEach(passenger => {
        // Family size
        passenger.familySize = passenger.SibSp + passenger.Parch + 1;

        // Age group
        if (passenger.Age !== null) {
            if (passenger.Age < 18) passenger.ageGroup = 'Child (0-17)';
            else if (passenger.Age < 30) passenger.ageGroup = 'Young Adult (18-29)';
            else if (passenger.Age < 50) passenger.ageGroup = 'Adult (30-49)';
            else passenger.ageGroup = 'Senior (50+)';
        } else {
            passenger.ageGroup = 'Unknown';
        }

        // Gender display
        passenger.genderDisplay = passenger.Sex === 'male' ? 'Male' : 'Female';

        // Class display
        passenger.classDisplay = `Class ${passenger.Pclass}`;

        // Port display
        const portMap = { 'S': 'Southampton', 'C': 'Cherbourg', 'Q': 'Queenstown' };
        passenger.portDisplay = portMap[passenger.Embarked] || 'Unknown';
    });
}

// Create summary cards
function createSummaryCards() {
    const totalPassengers = titanicData.length;
    const survivedCount = titanicData.filter(p => p.Survived === 1).length;
    const survivalRate = ((survivedCount / totalPassengers) * 100).toFixed(1);

    const maleCount = titanicData.filter(p => p.Sex === 'male').length;
    const femaleCount = titanicData.filter(p => p.Sex === 'female').length;
    const genderRatio = ((femaleCount / totalPassengers) * 100).toFixed(1);

    document.getElementById('totalPassengers').textContent = totalPassengers;
    document.getElementById('survivedCount').textContent = survivedCount;
    document.getElementById('survivalRate').textContent = survivalRate + '%';
    document.getElementById('genderRatio').textContent = genderRatio + '%';
}

// Create gender survival chart
function createGenderChart() {
    const ctx = document.getElementById('genderChart').getContext('2d');

    const genderData = {};
    titanicData.forEach(passenger => {
        if (!genderData[passenger.Sex]) {
            genderData[passenger.Sex] = { total: 0, survived: 0 };
        }
        genderData[passenger.Sex].total++;
        if (passenger.Survived === 1) {
            genderData[passenger.Sex].survived++;
        }
    });

    const labels = Object.keys(genderData).map(g => g === 'male' ? 'Male' : 'Female');
    const survivedData = Object.values(genderData).map(g => g.survived);
    const diedData = Object.values(genderData).map(g => g.total - g.survived);

    charts.genderChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Survived',
                    data: survivedData,
                    backgroundColor: 'rgba(40, 167, 69, 0.8)',
                    borderColor: 'rgba(40, 167, 69, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Died',
                    data: diedData,
                    backgroundColor: 'rgba(220, 53, 69, 0.8)',
                    borderColor: 'rgba(220, 53, 69, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Survival by Gender'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Passengers'
                    }
                }
            }
        }
    });
}

// Create passenger class survival chart
function createClassChart() {
    const ctx = document.getElementById('classChart').getContext('2d');

    const classData = {};
    titanicData.forEach(passenger => {
        if (!classData[passenger.Pclass]) {
            classData[passenger.Pclass] = { total: 0, survived: 0 };
        }
        classData[passenger.Pclass].total++;
        if (passenger.Survived === 1) {
            classData[passenger.Pclass].survived++;
        }
    });

    const labels = Object.keys(classData).sort().map(c => `Class ${c}`);
    const survivalRates = Object.keys(classData).sort().map(c => {
        const data = classData[c];
        return ((data.survived / data.total) * 100).toFixed(1);
    });

    charts.classChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: survivalRates,
                backgroundColor: [
                    'rgba(255, 193, 7, 0.8)',
                    'rgba(108, 117, 125, 0.8)',
                    'rgba(220, 53, 69, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 193, 7, 1)',
                    'rgba(108, 117, 125, 1)',
                    'rgba(220, 53, 69, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: 'Survival Rate by Passenger Class (%)'
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

// Create age distribution chart
function createAgeChart() {
    const ctx = document.getElementById('ageChart').getContext('2d');

    // Filter out passengers with unknown age
    const agesWithData = titanicData.filter(p => p.Age !== null).map(p => p.Age);

    // Create age bins
    const ageBins = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
    const ageCounts = new Array(ageBins.length - 1).fill(0);

    agesWithData.forEach(age => {
        for (let i = 0; i < ageBins.length - 1; i++) {
            if (age >= ageBins[i] && age < ageBins[i + 1]) {
                ageCounts[i]++;
                break;
            }
        }
    });

    const labels = ageBins.slice(0, -1).map((age, i) => `${age}-${ageBins[i + 1]}`);

    charts.ageChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Number of Passengers',
                data: ageCounts,
                backgroundColor: 'rgba(102, 126, 234, 0.8)',
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Age Distribution'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Passengers'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Age Range'
                    }
                }
            }
        }
    });
}

// Create age group survival chart
function createAgeGroupChart() {
    const ctx = document.getElementById('ageGroupChart').getContext('2d');

    const ageGroupData = {};
    titanicData.forEach(passenger => {
        if (!ageGroupData[passenger.ageGroup]) {
            ageGroupData[passenger.ageGroup] = { total: 0, survived: 0 };
        }
        ageGroupData[passenger.ageGroup].total++;
        if (passenger.Survived === 1) {
            ageGroupData[passenger.ageGroup].survived++;
        }
    });

    const labels = Object.keys(ageGroupData);
    const survivalRates = Object.values(ageGroupData).map(data =>
        ((data.survived / data.total) * 100).toFixed(1)
    );

    charts.ageGroupChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Survival Rate (%)',
                data: survivalRates,
                borderColor: 'rgba(102, 126, 234, 1)',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Survival Rate by Age Group'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Survival Rate (%)'
                    }
                }
            }
        }
    });
}

// Create port of embarkation chart
function createPortChart() {
    const ctx = document.getElementById('portChart').getContext('2d');

    const portData = {};
    titanicData.forEach(passenger => {
        const port = passenger.portDisplay;
        if (!portData[port]) {
            portData[port] = 0;
        }
        portData[port]++;
    });

    const labels = Object.keys(portData);
    const data = Object.values(portData);

    charts.portChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 205, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 205, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: 'Passengers by Port of Embarkation'
                }
            }
        }
    });
}

// Create family size analysis chart
function createFamilyChart() {
    const ctx = document.getElementById('familyChart').getContext('2d');

    const familyData = {};
    titanicData.forEach(passenger => {
        if (!familyData[passenger.familySize]) {
            familyData[passenger.familySize] = { total: 0, survived: 0 };
        }
        familyData[passenger.familySize].total++;
        if (passenger.Survived === 1) {
            familyData[passenger.familySize].survived++;
        }
    });

    // Limit to family sizes with sufficient data
    const filteredData = {};
    Object.keys(familyData).forEach(size => {
        if (familyData[size].total >= 5) {
            filteredData[size] = familyData[size];
        }
    });

    const labels = Object.keys(filteredData).map(size => `${size} person${size > 1 ? 's' : ''}`);
    const survivalRates = Object.values(filteredData).map(data =>
        ((data.survived / data.total) * 100).toFixed(1)
    );

    charts.familyChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Survival Rate (%)',
                data: survivalRates,
                backgroundColor: 'rgba(118, 75, 162, 0.8)',
                borderColor: 'rgba(118, 75, 162, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Survival Rate by Family Size'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Survival Rate (%)'
                    }
                }
            }
        }
    });
}

// Create interactive data table
function createDataTable() {
    const tableBody = document.getElementById('tableBody');
    const displayData = titanicData.slice(0, 20); // Show first 20 passengers

    tableBody.innerHTML = '';

    displayData.forEach(passenger => {
        const row = document.createElement('tr');

        const name = passenger.Name.split(',')[0]; // Get last name only
        const age = passenger.Age !== null ? passenger.Age : 'Unknown';
        const gender = passenger.genderDisplay;
        const pclass = passenger.classDisplay;
        const survived = passenger.Survived === 1 ?
            '<span class="status-survived">Survived</span>' :
            '<span class="status-died">Died</span>';
        const fare = passenger.Fare !== null ? `$${passenger.Fare.toFixed(2)}` : 'Unknown';
        const port = passenger.portDisplay;

        row.innerHTML = `
            <td>${name}</td>
            <td>${age}</td>
            <td><i class="fas fa-${passenger.Sex === 'male' ? 'mars' : 'venus'} ${passenger.Sex === 'male' ? 'gender-male' : 'gender-female'}"></i> ${gender}</td>
            <td><span class="class-${passenger.Pclass}">${pclass}</span></td>
            <td>${survived}</td>
            <td>${fare}</td>
            <td>${port}</td>
        `;

        tableBody.appendChild(row);
    });
}

// Utility function to format numbers
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Add window resize handler for responsive charts
window.addEventListener('resize', function () {
    Object.values(charts).forEach(chart => {
        if (chart && chart.resize) {
            chart.resize();
        }
    });
}); 