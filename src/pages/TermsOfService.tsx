
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow w-full max-w-4xl px-4 py-12 mx-auto mt-16">
        <div className="prose max-w-none">
          <h1 className="text-3xl font-medium mb-6 text-gray-800">Terms of Service</h1>
          <p className="text-gray-600 mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <h2 className="text-xl font-medium mt-8 mb-4 text-gray-800">1. Acceptance of Terms</h2>
          <p className="text-gray-600 mb-4">
            By accessing or using WeatherNow, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our service.
          </p>
          
          <h2 className="text-xl font-medium mt-8 mb-4 text-gray-800">2. Use of Service</h2>
          <p className="text-gray-600 mb-4">
            WeatherNow provides weather forecasting services for personal, non-commercial use. You may not use our service for any illegal purpose or in violation of any local, state, national, or international law.
          </p>
          
          <h2 className="text-xl font-medium mt-8 mb-4 text-gray-800">3. Accuracy of Information</h2>
          <p className="text-gray-600 mb-4">
            While we strive to provide accurate weather forecasts, we cannot guarantee the accuracy of all information. Weather conditions can change rapidly and may differ from our forecasts.
          </p>
          
          <h2 className="text-xl font-medium mt-8 mb-4 text-gray-800">4. Intellectual Property</h2>
          <p className="text-gray-600 mb-4">
            All content, features, and functionality of WeatherNow are owned by us and are protected by copyright, trademark, and other intellectual property laws.
          </p>
          
          <h2 className="text-xl font-medium mt-8 mb-4 text-gray-800">5. Limitation of Liability</h2>
          <p className="text-gray-600 mb-4">
            We are not liable for any damages arising from your use of, or inability to use, our service. This includes direct, indirect, incidental, consequential, and punitive damages.
          </p>
          
          <h2 className="text-xl font-medium mt-8 mb-4 text-gray-800">6. Changes to Terms</h2>
          <p className="text-gray-600 mb-4">
            We may modify these Terms of Service at any time. It is your responsibility to review these terms periodically. Your continued use of our service constitutes acceptance of any changes.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;
