import React from 'react';
import Link from 'next/link';

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'For occasional use',
      features: [
        '5,000 characters per month',
        'Basic humanization',
        'Standard processing speed',
        'No credit card required'
      ],
      buttonText: 'Get Started',
      buttonVariant: 'outline',
      popular: false,
      href: '/auth/register'
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: 'per month',
      description: 'For regular content creators',
      features: [
        '50,000 characters per month',
        'Advanced humanization',
        'Priority processing',
        'Save up to 10 projects',
        'Email support'
      ],
      buttonText: 'Subscribe Now',
      buttonVariant: 'default',
      popular: true,
      href: '/auth/register?plan=pro'
    },
    {
      name: 'Business',
      price: '$29.99',
      period: 'per month',
      description: 'For teams and businesses',
      features: [
        'Unlimited characters',
        'Premium humanization',
        'Fastest processing',
        'Unlimited saved projects',
        'API access',
        'Priority support'
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'default',
      popular: false,
      href: '/marketing/contact?inquiry=business'
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto mb-12">
          Choose the plan that&apos;s right for you and start humanizing your AI-generated content today.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md ${plan.popular ? 'border-blue-500 border-2' : 'border border-gray-200 dark:border-gray-700'}`}
            >
              {plan.popular && (
                <div className="bg-blue-500 text-white text-xs font-bold uppercase tracking-wide py-1 px-2 rounded-full inline-block mb-4">
                  Most Popular
                </div>
              )}
              
              <h2 className="text-2xl font-bold">{plan.name}</h2>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-gray-500 dark:text-gray-400"> {plan.period}</span>}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{plan.description}</p>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                href={plan.href}
                className={`inline-block w-full text-center py-2 px-4 rounded-md ${
                  plan.buttonVariant === 'outline' 
                    ? 'border border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Need a custom plan?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            We offer custom solutions for enterprises and high-volume users.
            Contact our sales team to discuss your specific needs.
          </p>
          <Link 
            href="/marketing/contact?inquiry=enterprise" 
            className="inline-block bg-blue-500 text-white font-bold py-3 px-8 rounded-md text-lg hover:bg-blue-600 transition duration-300"
          >
            Contact Sales
          </Link>
        </div>
        
        <div className="mt-16 bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div>
              <h3 className="text-lg font-semibold mb-2">How does the AI Humanizer work?</h3>
              <p className="text-gray-600 dark:text-gray-300">Our AI Humanizer uses advanced natural language processing to make AI-generated text sound more human-like while preserving the original meaning.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Can I try before I buy?</h3>
              <p className="text-gray-600 dark:text-gray-300">Yes! Our free tier allows you to humanize up to 5,000 characters per month with no credit card required.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">How accurate is the humanization?</h3>
              <p className="text-gray-600 dark:text-gray-300">Our humanizer has a 95% success rate at bypassing AI detection tools while maintaining the original content&apos;s meaning.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Can I cancel my subscription?</h3>
              <p className="text-gray-600 dark:text-gray-300">Yes, you can cancel your subscription at any time. Your plan will remain active until the end of your billing cycle.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
