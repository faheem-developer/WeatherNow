
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow w-full max-w-4xl px-4 py-12 mx-auto mt-16">
        <div className="prose max-w-none">
          <h1 className="text-3xl font-medium mb-6 text-gray-800">Privacy Policy</h1>
          <p className="text-gray-600 mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <h2 className="text-xl font-medium mt-8 mb-4 text-gray-800">1. Introduction</h2>
          <p className="text-gray-600 mb-4">
            Welcome to WeatherNow's Privacy Policy. This policy explains how we collect, use, and protect your personal information when you use our weather forecasting service.
          </p>
          
          <h2 className="text-xl font-medium mt-8 mb-4 text-gray-800">2. Information We Collect</h2>
          <p className="text-gray-600 mb-4">
            We may collect information such as your location, search history, and device information to provide you with accurate weather forecasts and improve our service.
          </p>
          
          <h2 className="text-xl font-medium mt-8 mb-4 text-gray-800">3. How We Use Your Information</h2>
          <p className="text-gray-600 mb-4">
            We use your information to provide weather forecasts, improve our service, and personalize your experience. We do not sell your personal information to third parties.
          </p>
          
          <h2 className="text-xl font-medium mt-8 mb-4 text-gray-800">4. Data Security</h2>
          <p className="text-gray-600 mb-4">
            We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.
          </p>
          
          <h2 className="text-xl font-medium mt-8 mb-4 text-gray-800">5. Your Rights</h2>
          <p className="text-gray-600 mb-4">
            You have the right to access, correct, or delete your personal information. You can also opt out of certain data collection practices.
          </p>
          
          <h2 className="text-xl font-medium mt-8 mb-4 text-gray-800">6. Contact Us</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions or concerns about our Privacy Policy, please contact us through our Contact page.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
