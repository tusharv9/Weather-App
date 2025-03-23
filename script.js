const input = document.getElementById('input');
        const button = document.getElementById('btn');
        const container = document.getElementById('container');

        // Function to fetch weather icon
        function getWeatherIcon(iconCode) {
            return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        }

        // Function to get weather description
        function getWeatherIcon(iconCode) {
            const iconMap = {
                '01d': 'fas fa-sun',
                '01n': 'fas fa-moon',
                '02d': 'fas fa-cloud-sun',
                '02n': 'fas fa-cloud-moon',
                '03d': 'fas fa-cloud',
                '03n': 'fas fa-cloud',
                '04d': 'fas fa-cloud',
                '04n': 'fas fa-cloud',
                '09d': 'fas fa-cloud-showers-heavy',
                '09n': 'fas fa-cloud-showers-heavy',
                '10d': 'fas fa-cloud-sun-rain',
                '10n': 'fas fa-cloud-moon-rain',
                '11d': 'fas fa-bolt',
                '11n': 'fas fa-bolt',
                '13d': 'fas fa-snowflake',
                '13n': 'fas fa-snowflake',
                '50d': 'fas fa-smog',
                '50n': 'fas fa-smog'
            };
            
            return iconMap[iconCode] || 'fas fa-cloud';
        }

        // Function to fetch weather data
        function fetchWeather() {
            let city = input.value.trim();
            
            // Don't proceed if input is empty
            if (!city) return;
            
            let api = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=b93340c2946398f0c43ec9988b827c0f";
            
            // Show loading state
            container.innerHTML = `
                <div class="loading">
                    <i class="fas fa-spinner"></i>
                    <p>Fetching weather data...</p>
                </div>
            `;
            
            fetch(api)
                .then((res) => res.json())
                .then((data) => {
                    // Calculate temperature in Celsius
                    const tempCelsius = (data.main.temp - 273.15).toFixed(1);
                    const feelsLikeCelsius = (data.main.feels_like - 273.15).toFixed(1);
                    const iconCode = data.weather[0].icon;
                    const iconClass = getWeatherIcon(iconCode);
                    
                    // Create HTML content with weather data
                    container.innerHTML = `
                        <div class="weather-card">
                            <h2 class="location">${data.name}, ${data.sys.country}</h2>
                            <div class="weather-main">
                                <i class="${iconClass}"></i>
                                ${data.weather[0].main}
                            </div>
                            <p class="temperature">${tempCelsius}°C</p>
                            
                            <div class="weather-details">
                                <div class="detail-item">
                                    <span class="detail-label">Feels Like</span>
                                    <span class="detail-value">${feelsLikeCelsius}°C</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Humidity</span>
                                    <span class="detail-value">${data.main.humidity}%</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Wind Speed</span>
                                    <span class="detail-value">${data.wind.speed} m/s</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Pressure</span>
                                    <span class="detail-value">${data.main.pressure} hPa</span>
                                </div>
                            </div>
                        </div>
                    `;
                })
                .catch((err) => {
                    container.innerHTML = `
                        <div class="error-message">
                            <i class="fas fa-exclamation-circle"></i>
                            <p>City not found or an error occurred. Please check the city name and try again.</p>
                        </div>
                    `;
                });
            
            // Clear the input field after search
            input.value = '';
        }

        // Event listener for button click
        button.addEventListener("click", fetchWeather);

        // Event listener for Enter key press
        input.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                // Prevent default form submission behavior
                event.preventDefault();
                fetchWeather();
            }
        });

        // Set focus on the input field when page loads
        window.addEventListener('load', () => {
            input.focus();
        });