
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MessageSquare } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-md w-full px-6 py-8">
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="font-medium text-gray-800">Email</h3>
                <p className="text-gray-600">support@weathernow.example</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="font-medium text-gray-800">Live Chat</h3>
                <p className="text-gray-600">Available 9am-5pm EST, Monday-Friday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
