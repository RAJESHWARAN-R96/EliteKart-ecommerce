import React, { useState } from 'react';
import Title from '../components/Title';

const CookieSettings = () => {
    const [preferences, setPreferences] = useState({
        essential: true, // Always true
        analytics: false,
        marketing: false,
        personalization: false
    });

    const [saved, setSaved] = useState(false);

    const handleToggle = (key) => {
        if (key === 'essential') return; // Cannot toggle essential cookies
        setPreferences(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
        setSaved(false);
    };

    const handleSave = () => {
        // Simulated save action
        setTimeout(() => {
            setSaved(true);
        }, 400);
    };

    return (
        <div className='-mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw] px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-[#fbfaf5] pt-12 pb-32 min-h-screen'>

            {/* Header */}
            <div className="mb-12 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-5xl font-bold text-gray-950 uppercase tracking-tighter mb-4">
                    COOKIE SETTINGS
                </h1>
                <p className="text-gray-500 font-medium">Manage your privacy preferences and tracking options.</p>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto bg-white border border-[#e6e4d9] rounded-2xl shadow-sm overflow-hidden">

                <div className="p-8 md:p-12 border-b border-[#e6e4d9]">
                    <p className="text-gray-800 text-lg leading-relaxed font-medium mb-0">
                        We use cookies to improve your experience on our site. You can customize your preferences below. Essential cookies cannot be disabled as they are required for the site to function properly.
                    </p>
                </div>

                <div className="divide-y divide-[#e6e4d9]">

                    {/* Essential Cookies */}
                    <div className="p-8 md:p-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-gray-50/50">
                        <div className="max-w-xl">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Essential Cookies</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Required</span>
                            <div className="w-14 h-8 rounded-full bg-[#96c138] p-1 relative cursor-not-allowed opacity-70">
                                <div className="w-6 h-6 bg-white rounded-full absolute right-1 top-1"></div>
                            </div>
                        </div>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="p-8 md:p-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                        <div className="max-w-xl">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Analytics Cookies</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.
                            </p>
                        </div>
                        <button
                            onClick={() => handleToggle('analytics')}
                            className={`w-14 h-8 rounded-full p-1 relative transition-colors duration-300 ${preferences.analytics ? 'bg-[#96c138]' : 'bg-gray-300'}`}
                        >
                            <div className={`w-6 h-6 bg-white rounded-full transition-transform duration-300 ${preferences.analytics ? 'translate-x-[24px]' : 'translate-x-0'}`}></div>
                        </button>
                    </div>

                    {/* Marketing Cookies */}
                    <div className="p-8 md:p-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                        <div className="max-w-xl">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Marketing Cookies</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                These cookies may be set through our site by our advertising partners to build a profile of your interests and show you relevant adverts on other sites.
                            </p>
                        </div>
                        <button
                            onClick={() => handleToggle('marketing')}
                            className={`w-14 h-8 rounded-full p-1 relative transition-colors duration-300 ${preferences.marketing ? 'bg-[#96c138]' : 'bg-gray-300'}`}
                        >
                            <div className={`w-6 h-6 bg-white rounded-full transition-transform duration-300 ${preferences.marketing ? 'translate-x-[24px]' : 'translate-x-0'}`}></div>
                        </button>
                    </div>

                    {/* Personalization Cookies */}
                    <div className="p-8 md:p-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                        <div className="max-w-xl">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Personalization Cookies</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                These cookies enable the website to provide enhanced functionality and personalization based on your interaction with the site.
                            </p>
                        </div>
                        <button
                            onClick={() => handleToggle('personalization')}
                            className={`w-14 h-8 rounded-full p-1 relative transition-colors duration-300 ${preferences.personalization ? 'bg-[#96c138]' : 'bg-gray-300'}`}
                        >
                            <div className={`w-6 h-6 bg-white rounded-full transition-transform duration-300 ${preferences.personalization ? 'translate-x-[24px]' : 'translate-x-0'}`}></div>
                        </button>
                    </div>

                </div>
            </div>

            {/* Save Button Container */}
            <div className="max-w-4xl mx-auto mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                {saved ? (
                    <div className="bg-green-50 text-green-700 px-6 py-3 rounded-xl border border-green-200 font-medium w-full sm:w-auto text-center animate-fade-in">
                        ✓ Preferences successfully saved
                    </div>
                ) : (
                    <div></div> // Spacer
                )}

                <button
                    onClick={handleSave}
                    className="w-full sm:w-auto bg-[#96c138] hover:bg-[#86ad32] text-white px-10 py-4 rounded-full font-bold uppercase tracking-wider transition-colors shadow-lg"
                >
                    Save Preferences
                </button>
            </div>

        </div>
    );
};

export default CookieSettings;
