
import { Link } from "react-router-dom";
import { Cloud } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-6 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Cloud className="h-5 w-5 text-primary" />
            <p className="text-sm text-gray-500">
              © {currentYear} WeatherNow. All Rights Reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <Link to="#" className="text-sm text-gray-500 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-sm text-gray-500 hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="text-sm text-gray-500 hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
