# 🚢 Titanic Data Visualization Dashboard

An interactive web-based data visualization project analyzing the famous Titanic dataset. This project explores passenger survival patterns, demographics, and provides insights through modern, responsive visualizations.

![Titanic Dashboard Preview](https://shakti-s1.github.io/titanic-data-visualization/)

## ✨ Features

- **📊 Interactive Dashboard**: Multiple visualizations in one cohesive interface
- **📈 Survival Analysis**: Comprehensive charts showing survival rates by various factors
- **👥 Demographic Insights**: Age, gender, and class distribution analysis
- **🎨 Modern UI/UX**: Beautiful gradient design with smooth animations
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **🔍 Interactive Elements**: Hover effects, tooltips, and dynamic data filtering
- **📋 Data Table**: Detailed passenger information with sorting capabilities

## 📊 Visualizations Included

1. **Survival Rate by Gender** - Bar chart comparing male vs female survival rates
2. **Survival Rate by Passenger Class** - Doughnut chart showing class-based survival patterns
3. **Age Distribution** - Histogram displaying passenger age demographics
4. **Survival Rate by Age Group** - Line chart analyzing age-based survival trends
5. **Port of Embarkation** - Pie chart showing passenger distribution by port
6. **Family Size Analysis** - Bar chart examining survival rates based on family size
7. **Interactive Data Table** - Detailed passenger information with 20 sample records

## 🎯 Key Insights Discovered

- **Gender Impact**: Women had significantly higher survival rates than men
- **Class Privilege**: First-class passengers had better survival chances
- **Age Patterns**: Children and young adults showed distinct survival patterns
- **Family Dynamics**: Family size influenced survival outcomes
- **Port Differences**: Passengers from different embarkation ports had varying survival rates

## 🎯 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation required

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/shakti-s1/titanic-data-visualization.git
   cd titanic-data-visualization
   ```

2. Start a local server (required for CSV loading):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Python 2
   python -m SimpleHTTPServer 8000
   
   # Using Node.js
   npx http-server -p 8000
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

## 📈 Data Analysis Features

### Summary Statistics
- Total passengers analyzed
- Overall survival rate
- Gender distribution
- Average age and fare statistics

### Interactive Elements
- Hover effects on all charts
- Responsive chart resizing
- Dynamic data table with passenger details
- Color-coded status indicators

### Data Processing
- Automatic CSV parsing
- Missing data handling
- Age group categorization
- Family size calculations

## 🎨 Design Features

- **Modern Gradient Design**: Beautiful purple-blue gradient theme
- **Smooth Animations**: Fade-in effects and hover transitions
- **Responsive Layout**: Adapts to all screen sizes
- **Professional Typography**: Clean, readable fonts
- **Color-Coded Elements**: Intuitive visual indicators

## 🎯 Customization

### Adding New Visualizations
1. Add chart container in `index.html`
2. Create chart function in `script.js`
3. Call the function in the main initialization

### Modifying Styles
- Edit `styles.css` for visual changes
- Update color schemes in CSS variables
- Modify animations and transitions

### Extending Data
- Add more records to `data/titanic.csv`
- Implement additional data processing in `script.js`
- Create new chart types as needed

## 🤖 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Internet Explorer (limited support)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Acknowledgments

- **Dataset Source**: Titanic dataset for educational purposes
- **Chart.js**: For beautiful and responsive charts
- **Bootstrap**: For modern UI components
- **Font Awesome**: For beautiful icons
- **D3.js**: For advanced data visualization capabilities

## 📞 Contact

- **GitHub**: [@shakti-s1](https://github.com/shakti-s1)
- **LinkedIn**: [https://www.linkedin.com/in/shakti-singh-ss/]




⭐ **If you find this project helpful, please give it a star!**

Made with ❤️ for data visualization enthusiasts  
