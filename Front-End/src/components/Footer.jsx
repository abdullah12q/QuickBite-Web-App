import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto py-8 md:py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-orange-500">
              QuickBite
            </h3>
            <p className="text-gray-400 mb-4">
              Delicious fast food, delivered fast to your door.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-orange-500">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-gray-400 hover:text-orange-500"
                >
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/user/dashboard"
                  className="text-gray-400 hover:text-orange-500"
                >
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Contact</h3>
            <address className="not-italic text-gray-400 space-y-2">
              <p>Somewhere in life</p>
              <p>Phone: 0123456789</p>
              <p>Email: info@quickbite.com</p>
            </address>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} QuickBite. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex gap-4 text-sm text-gray-400">
            <a className="hover:text-orange-500">Privacy Policy</a>
            <a className="hover:text-orange-500">Terms of Service</a>
            <a className="hover:text-orange-500">Cookies Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
