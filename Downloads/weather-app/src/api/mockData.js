export const mockHistoricalData = (location) => ({
    historical: {
        "2023-10-25": {
            date: "2023-10-25",
            maxtemp: 28,
            mintemp: 19,
            astro: {
                sunrise: "06:12 AM",
                sunset: "05:54 PM"
            },
            hourly: []
        }
    }
});

export const mockMarineData = (location) => ({
    marine: {
        "2023-10-26": {
            hourly: [
                { time: "0", water_temp: 22, swell_height_m: 1.2, wind_speed: 15 },
                { time: "300", water_temp: 21, swell_height_m: 1.1, wind_speed: 12 },
                { time: "600", water_temp: 21, swell_height_m: 1.0, wind_speed: 10 },
                { time: "900", water_temp: 23, swell_height_m: 1.3, wind_speed: 14 },
                { time: "1200", water_temp: 24, swell_height_m: 1.5, wind_speed: 18 },
                { time: "1500", water_temp: 25, swell_height_m: 1.6, wind_speed: 20 },
                { time: "1800", water_temp: 24, swell_height_m: 1.4, wind_speed: 16 },
                { time: "2100", water_temp: 23, swell_height_m: 1.3, wind_speed: 14 }
            ]
        }
    }
});
