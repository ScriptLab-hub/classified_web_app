import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white">
      {/* App Promotion Section */}
      <section className="bg-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left: Heading & Subheading */}
            <div className="md:w-1/3 text-center md:text-left">
              <h2 className="text-2xl md:text-2xl font-bold text-gray-900">Find Amazing Deals On The Go</h2>
              <p className="text-lg md:text-xl text-gray-700 mt-2">Download MyWebAPP now</p>
            </div>
            {/* Center: Image */}
            <div className="md:w-1/3 flex justify-center">
              <img
                src="src\assets\web-page-2152678_640.png"
                alt="MyWebAPP phone mockup"
                className="w-60 h-25"
              />
            </div>
            {/* Right: App Store Buttons */}
            <div className="md:w-1/3 flex flex-col sm:flex-row justify-center md:justify-end gap-4">
  <a
    href="https://www.apple.com/app-store/"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 flex items-center justify-center gap-2"
  >
    {/* Image for App Store */}
    <img src="src\assets\app-store_831378.png" alt="App Store" className="w-6 h-6" />
    {/* Or keep SVG if you want */}
    {/* <svg ...>...</svg> */}
    App Store
  </a>
  <a
    href="https://play.google.com/store"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 flex items-center justify-center gap-2"
  >
    {/* Image for Google Play */}
    <img src="src\assets\google-play_1532534.png" alt="Google Play" className="w-6 h-6" />
    Google Play
  </a>
  <a
    href="https://appgallery.huawei.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 flex items-center justify-center gap-2"
  >
    {/* Image for AppGallery */}
    <img src="src\assets\app_gallery.png" alt="AppGallery" className="w-6 h-6" />
    AppGallery
  </a>
</div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="bg-gray-800 text-gray-300">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Popular Categories */}
            <div>
              <h3 className="text-lg font-bold mb-4">Popular Categories</h3>
              <ul className="space-y-2">
                <li><a href="/categories/cars" className="hover:text-white">Cars</a></li>
                <li><a href="/categories/computers" className="hover:text-white">Computers</a></li>
                <li><a href="/categories/property" className="hover:text-white">Property</a></li>
                <li><a href="/categories/electronics" className="hover:text-white">Electronics</a></li>
              </ul>
            </div>
            {/* Trending Searches */}
            <div>
              <h3 className="text-lg font-bold mb-4">Trending Searches</h3>
              <ul className="space-y-2">
                <li><a href="/search/used-cars" className="hover:text-white">Used Cars</a></li>
                <li><a href="/search/laptops" className="hover:text-white">Laptops</a></li>
                <li><a href="/search/apartments" className="hover:text-white">Apartments</a></li>
                <li><a href="/search/iphones" className="hover:text-white">iPhones</a></li>
              </ul>
            </div>
            {/* About Us */}
            <div>
              <h3 className="text-lg font-bold mb-4">About Us</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="hover:text-white">Our Story</a></li>
                <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
                <li><a href="/careers" className="hover:text-white">Careers</a></li>
                <li><a href="/terms" className="hover:text-white">Terms of Use</a></li>
              </ul>
            </div>
            {/* MyWebAPP */}
            <div>
              <h3 className="text-lg font-bold mb-4">MyWebAPP</h3>
              <ul className="space-y-2">
                <li><a href="/sell" className="hover:text-white">Sell an Item</a></li>
                <li><a href="/buy" className="hover:text-white">Buy an Item</a></li>
                <li><a href="/faq" className="hover:text-white">FAQ</a></li>
                <li><a href="/support" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            {/* Follow Us On */}
            <div>
              <h3 className="text-lg font-bold mb-4">Follow Us On</h3>
              <ul className="space-y-2">
                <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Twitter</a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="border-t border-gray-900 py-4 text-center bg-gray-900">
          <p className="text-sm text-gray-300">Only Classifieds in Karachi. © 2025 MyWebAPP</p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;