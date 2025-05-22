import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HumanizerClient from '@/components/HumanizerClient';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Text Humanizer</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Make AI-generated content sound natural and bypass AI detection with our advanced humanizing technology
        </p>
        <div className="max-w-6xl mx-auto">
          <HumanizerClient />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Use Our AI Humanizer?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
              <div className="text-5xl mb-4 text-blue-500">🔍</div>
              <h3 className="text-xl font-semibold mb-2">Bypass AI Detection</h3>
              <p className="text-gray-600 dark:text-gray-300">Our advanced algorithm makes AI-generated text undetectable by AI content detectors.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
              <div className="text-5xl mb-4 text-green-500">🔄</div>
              <h3 className="text-xl font-semibold mb-2">Maintain Context</h3>
              <p className="text-gray-600 dark:text-gray-300">Preserves the original meaning while making the text sound more human-written.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
              <div className="text-5xl mb-4 text-purple-500">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
              <p className="text-gray-600 dark:text-gray-300">Get your humanized text in seconds, no matter how long the content.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Humanize Your AI Content?</h2>
          <p className="text-xl mb-8">Sign up now and get 5,000 free characters to try our service.</p>
          <a href="/auth/register" className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition duration-300">
            Get Started Free
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
