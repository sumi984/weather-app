import React from 'react';
import { Sun, Moon, ArrowUp, ArrowDown, Calendar } from 'lucide-react';

const HistoricalWeather = ({ data }) => {
    if (!data || !data.historical) return null;

    const dateKey = Object.keys(data.historical)[0];
    const dayData = data.historical[dateKey];
    const astro = dayData.astro;

    return (
        <div className="glass-panel text-left animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Calendar className="text-blue-300" />
                Historical Weather <span className="text-secondary font-normal text-lg">({dateKey})</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h4 className="text-secondary mb-4 uppercase tracking-wider text-sm font-semibold">Temperature</h4>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <ArrowUp className="text-red-300" />
                            <div>
                                <p className="text-sm opacity-70">Max</p>
                                <p className="text-2xl font-bold">{dayData.maxtemp}°c</p>
                            </div>
                        </div>
                        <div className="w-px h-10 bg-white/10"></div>
                        <div className="flex items-center gap-3">
                            <ArrowDown className="text-blue-300" />
                            <div>
                                <p className="text-sm opacity-70">Min</p>
                                <p className="text-2xl font-bold">{dayData.mintemp}°c</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h4 className="text-secondary mb-4 uppercase tracking-wider text-sm font-semibold">Astronomy</h4>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Sun className="text-yellow-300" />
                            <div>
                                <p className="text-sm opacity-70">Sunrise</p>
                                <p className="text-xl font-bold">{astro.sunrise}</p>
                            </div>
                        </div>
                        <div className="w-px h-10 bg-white/10"></div>
                        <div className="flex items-center gap-3">
                            <Moon className="text-blue-200" />
                            <div>
                                <p className="text-sm opacity-70">Sunset</p>
                                <p className="text-xl font-bold">{astro.sunset}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoricalWeather;
