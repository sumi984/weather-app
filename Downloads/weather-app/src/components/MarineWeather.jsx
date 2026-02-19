import React from 'react';
import { Waves, Wind } from 'lucide-react';

const MarineWeather = ({ data }) => {
    if (!data || !data.marine) return null;

    const marineKeys = Object.keys(data.marine);
    if (marineKeys.length === 0) return null;

    const today = data.marine[marineKeys[0]];
    const hourly = today.hourly || [];

    return (
        <div className="glass-panel text-left animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Waves className="text-blue-300" />
                Marine Weather
            </h3>
            <div className="overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex gap-4 min-w-max">
                    {hourly.map((hour, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center min-w-[140px] hover:bg-white/10 transition-colors">
                            <span className="text-sm opacity-70 mb-2 font-mono">
                                {hour.time === '0' ? '00' : hour.time.toString().padStart(4, '0').slice(0, 2)}:00
                            </span>
                            <div className="text-2xl font-bold mb-1 text-blue-200">
                                {hour.water_temp}°c
                            </div>
                            <div className="w-full h-px bg-white/10 my-2"></div>
                            <div className="text-sm flex flex-col gap-1 w-full">
                                <div className="flex justify-between w-full opacity-80">
                                    <span>Swell</span>
                                    <span className="font-semibold">{hour.swell_height_m}m</span>
                                </div>
                                <div className="flex justify-between w-full opacity-80">
                                    <span>Wind</span>
                                    <span className="font-semibold">{hour.wind_speed}k</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MarineWeather;
