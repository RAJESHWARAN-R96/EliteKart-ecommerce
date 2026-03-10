import React from 'react';
import Title from '../components/Title';

const TermsOfService = () => {
    return (
        <div className='-mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw] px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-[#fbfaf5] pt-12 pb-24'>
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-5xl md:text-5xl font-bold text-gray-950 uppercase tracking-tighter mb-4">
                    TERMS OF SERVICE
                </h1>
                <p className="text-gray-500 font-medium">Last Updated: March 2026</p>
            </div>

            <div className="max-w-4xl bg-white border border-[#e6e4d9] p-8 md:p-12 rounded-2xl shadow-sm">
                <p className="text-gray-800 text-lg leading-relaxed font-medium mb-8">
                    Welcome to EliteKart. These Terms of Service govern your use of our website and services. By accessing or using our platform, you agree to be bound by these terms.
                </p>

                <div className="space-y-10">

                    <section>
                        <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-4 tracking-tight">
                            1. Account Registration
                        </h3>
                        <p className="text-gray-600 text-base leading-relaxed">
                            To use certain features of the service, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-4 tracking-tight">
                            2. User Conduct
                        </h3>
                        <p className="text-gray-600 text-base leading-relaxed">
                            You are responsible for all your activity in connection with the services. Any fraudulent, abusive, or otherwise illegal activity may be grounds for termination of your right to access or use the services. You may not post or transmit, or cause to be posted or transmitted, any communication or solicitation designed or intended to obtain password, account, or private information from any EliteKart user.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-4 tracking-tight">
                            3. Purchases and Payments
                        </h3>
                        <p className="text-gray-600 text-base leading-relaxed">
                            EliteKart utilizes Stripe for secure payment processing. By submitting payment information, you grant us the right to provide this information to authorized third parties for purposes of facilitating the completion of your purchases.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-4 tracking-tight">
                            4. Service Modifications
                        </h3>
                        <p className="text-gray-600 text-base leading-relaxed">
                            We reserve the right at any time to modify or discontinue conditionally or permanently, the Service (or any part thereof) with or without notice. You agree that we shall not be liable to you or to any third party for any modification, suspension or discontinuance of the Service.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
