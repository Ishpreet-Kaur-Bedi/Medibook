import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <div className="bg-gray-900">
      <div className="max-w-2xl mx-auto text-white py-10">
        <div className="text-center">
          <h3 className="text-3xl mb-3">Revolutionizing Healthcare Access and Efficiency</h3>
          <p>Empowering Healthcare, One Click at a Time</p>
          <div className="flex justify-center my-10">
            <div className="flex items-center border w-auto rounded-lg px-4 py-2 mx-2">
              <Image src="https://cdn-icons-png.flaticon.com/512/888/888857.png" alt="Google Play Store" width={28} height={28} />
              <div className="text-left ml-3">
                <p className="text-xs text-gray-200">Download on</p>
                <p className="text-sm md:text-base">Google Play Store</p>
              </div>
            </div>
            <div className="flex items-center border w-auto rounded-lg px-4 py-2 mx-2">
              <Image src="https://cdn-icons-png.flaticon.com/512/888/888841.png" alt="Apple Store" width={28} height={28} />
              <div className="text-left ml-3">
                <p className="text-xs text-gray-200">Download on</p>
                <p className="text-sm md:text-base">Apple Store</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
          <p className="order-2 md:order-1 mt-4 md:mt-0">&copy; [2023] Medibook. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
