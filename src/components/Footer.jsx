const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <footer className="bg-gray-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-5 w-full text-left mt-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-screen-xl mx-auto px-8">

        {/* /* Section 1 */} 
        <div className="-ml-16">
          <h3 className="text-3xl font-semibold mb-4">Animate Hub</h3>
          <p className="text-base opacity-90 leading-relaxed mb-6">
          Dynamic UI animation library designed to enhance web development with seamless animations for developers.
          </p>
          <div className="flex gap-6 mt-6 text-lg">
            <a href="#" target="_blank" aria-label="Facebook" className="text-white opacity-90 hover:opacity-100 transition">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" target="_blank" aria-label="Twitter" className="text-white opacity-90 hover:opacity-100 transition">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" target="_blank" aria-label="Instagram" className="text-white opacity-90 hover:opacity-100 transition">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" target="_blank" aria-label="YouTube" className="text-white opacity-90 hover:opacity-100 transition">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="#" target="_blank" aria-label="LinkedIn" className="text-white opacity-90 hover:opacity-100 transition">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Section 2 */}
        <div>
          <h4 className="text-lg font-medium mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="#hero" className="text-white text-sm opacity-90 hover:opacity-100 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#wisdom" className="text-white text-sm opacity-90 hover:opacity-100 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#content" className="text-white text-sm opacity-90 hover:opacity-100 transition">
                Our Libraries
              </a>
            </li>
            <li>
              <a href="#hero" className="text-white text-sm opacity-90 hover:opacity-100 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Section 3 */}
        <div>
          <h4 className="text-lg font-medium mb-4">UI Effects</h4>
          <ul className="space-y-2">
            <li>
              <a href="countingpage.html" className="text-white text-sm opacity-90 hover:opacity-100 transition">
                Animations
              </a>
            </li>
            <li>
              <a href="#hero" className="text-white text-sm opacity-90 hover:opacity-100 transition">
                Transitions
              </a>
            </li>
            <li>
              <a href="#hero" className="text-white text-sm opacity-90 hover:opacity-100 transition">
                Experiences
              </a>
            </li>
          </ul>
        </div>

        {/* Section 4 */}
        <div>
          <h4 className="text-lg font-medium mb-10">Contact Us</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <i className="fas fa-envelope text-sm"></i>
              <a
                href="mailto:info@AnimateHub.in"
                className="text-white text-sm opacity-90 hover:opacity-100 transition"
              >
                info@AnimateHub.in
              </a>
            </li>
            <li className="flex items-center gap-2">
              <i className="fas fa-map-marker-alt text-sm"></i>
              <span className="text-sm">India</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center border-t border-gray-700 pt-6 mt-8">
        <p className="text-sm text-white opacity-80">&copy; 2024 ; Animate Hub</p>
      </div>
    </footer>
  );
};

export default Footer;
