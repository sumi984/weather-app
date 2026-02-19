import React from 'react';
import { Wind, Droplets, Thermometer, MapPin, Clock } from 'lucide-react';

const WeatherCard = ({ data }) => {
    if (!data) return null;

    const { current, location } = data;

    return (
        <div className="glass-panel text-left animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Wind size={200} />
            </div>

            <div className="relative z-10">
                {location && (
                    <div className="mb-8 border-b border-white/10 pb-6">
                        <h2 className="text-3xl font-bold flex items-center gap-2 mb-2">
                            <MapPin size={28} className="text-blue-300" />
                            {location.name}, <span className="text-secondary font-normal">{location.country}</span>
                        </h2>
                        <div className="flex items-center gap-2 text-secondary ml-1">
                            <Clock size={16} />
                            <p>{location.localtime}</p>
                        </div>
                    </div>
                )}

                <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                    <div className="flex items-center gap-6">
                        {current.weather_icons && (
                            <img
                                src={current.weather_icons[0]}
                                alt="weather icon"
                                className="w-24 h-24 rounded-2xl shadow-lg ring-2 ring-white/20"
                            />
                        )}
                        <div>
                            <div className="flex items-start">
                                <h1 className="text-8xl font-bold tracking-tighter text-gradient">{current.temperature}</h1>
                                <span className="text-4xl mt-2 text-secondary">°</span>
                            </div>
                            <p className="text-xl font-medium text-blue-200 capitalize">{current.weather_descriptions[0]}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center min-w-[100px] hover:bg-white/10 transition-colors">
                            <Wind size={24} className="mb-2 text-blue-300" />
                            <span className="text-sm text-secondary">Wind</span>
                            <span className="text-xl font-bold">{current.wind_speed} <span className="text-xs font-normal">km/h</span></span>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center min-w-[100px] hover:bg-white/10 transition-colors">
                            <Droplets size={24} className="mb-2 text-blue-300" />
                            <span className="text-sm text-secondary">Humidity</span>
                            <span className="text-xl font-bold">{current.humidity}<span className="text-xs font-normal">%</span></span>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center min-w-[100px] hover:bg-white/10 transition-colors">
                            <Thermometer size={24} className="mb-2 text-blue-300" />
                            <span className="text-sm text-secondary">Feels Like</span>
                            <span className="text-xl font-bold">{current.feelslike}°</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
