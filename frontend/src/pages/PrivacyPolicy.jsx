import React from 'react'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'

const PrivacyPolicy = () => {
    return (
        <div>
            <div className='text-center text-2xl pt-10 border-t'>
                <Title text1={'PRIVACY'} text2={'POLICY'} />
            </div>

            <div className='my-10 text-gray-600 px-4 md:px-0'>
                <div className='flex flex-col gap-8 md:w-3/4 mx-auto'>

                    <p>
                        At EliteKart, accessible from www.forever.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Forever and how we use it.
                    </p>

                    <div>
                        <h3 className='font-semibold text-xl text-gray-800 mb-3'>Information We Collect</h3>
                        <p className='mb-3'>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
                        <ul className='list-disc pl-6 flex flex-col gap-2'>
                            <li>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</li>
                            <li>When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className='font-semibold text-xl text-gray-800 mb-3'>How We Use Your Information</h3>
                        <p className='mb-3'>We use the information we collect in various ways, including to:</p>
                        <ul className='list-disc pl-6 flex flex-col gap-2'>
                            <li>Provide, operate, and maintain our website</li>
                            <li>Improve, personalize, and expand our website</li>
                            <li>Understand and analyze how you use our website</li>
                            <li>Develop new products, services, features, and functionality</li>
                            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
                            <li>Send you emails</li>
                            <li>Find and prevent fraud</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className='font-semibold text-xl text-gray-800 mb-3'>Cookies and Web Beacons</h3>
                        <p>Like any other website, Forever uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
                    </div>

                    <div>
                        <h3 className='font-semibold text-xl text-gray-800 mb-3'>Data Security</h3>
                        <p>We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.</p>
                    </div>

                </div>
            </div>

            <NewsletterBox />
        </div>
    )
}

export default PrivacyPolicy
