import { Link } from "react-router-dom";
import {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Smile,
  Users,
  Zap,
  Code,
  Heart,
  Home,
  Compass,
  Info,
  Phone,
  BookOpen,
  Mail,
} from "lucide-react";
import { useState } from "react";

const currentYear = new Date().getFullYear();

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/kolte_prem_26/",
    icon: Instagram,
    color: "hover:text-pink-500",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/prem-kolte/",
    icon: Linkedin,
    color: "hover:text-blue-500",
  },
  {
    name: "Twitter",
    href: "https://x.com/PremKolte26?mx=2",
    icon: Twitter,
    color: "hover:text-blue-500",
  },
  {
    name: "GitHub",
    href: "https://github.com/Premkolte/AnimateHub",
    icon: Github,
    color: "hover:text-blue-500",
  },
];

const footerLinks = [
  {
    title: "Resources",
    links: [
      {
        name: "Animations",
        href: "/explore",
        icon: Zap,
        color: "text-purple-400",
      },
      {
        name: "Code Snippets",
        href: "/templates",
        icon: Code,
        color: "text-blue-400",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        name: "About Us",
        href: "/about",
        icon: Smile,
        color: "text-yellow-400",
      },
      {
        name: "Contributors",
        href: "/contributors",
        icon: Users,
        color: "text-green-400",
      },
    ],
  },
  {
    title: "Quick Links",
    links: [
      {
        name: "Home",
        href: "/",
        icon: Home,
        color: "text-pink-400",
      },
      {
        name: "Explore",
        href: "/explore",
        icon: Compass,
        color: "text-blue-400",
      },
      {
        name: "Contact Us",
        href: "/contact",
        icon: Phone,
        color: "text-red-400",
      },
    ],
  },
];

// Toast Notification Component
const ToastNotification = ({ message, type = "success", onClose }) => {
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`fixed bottom-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-between space-x-4 animate-fadeIn`}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="text-white hover:text-gray-200 focus:outline-none"
      >
        ✕
      </button>
    </div>
  );
};

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setToastMessage("Please enter a valid email address.");
      setToastType("error");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    // Here you would typically send the email to your backend
    console.log("Subscribed with email:", email);

    // Show success message
    setToastMessage("Thank you for subscribing to our newsletter!");
    setToastType("success");
    setShowToast(true);
    setIsSubscribed(true);
    setEmail("");

    // Hide toast after 3 seconds
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      <footer className="bg-primary-50 dark:bg-secondary-900 text-secondary-800 dark:text-white pt-16 pb-8 border-t border-gray-400 dark:border-t-[2px] dark:border-secondary-500">
        <div className="max-w-6xl mx-auto px-4">
          {/* Top Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
                Animate Hub
              </h2>
              <p className="mt-4 text-sm leading-relaxed opacity-80 max-w-md">
                Animate Hub is your go-to resource for all things animation in
                web development. Discover a wide range of code snippets for
                animations, hovers, and effects, designed to streamline your
                workflow. Just copy, paste, and watch your projects come to
                life!
              </p>
              <div className="flex space-x-4 mt-6">
                {socialLinks.map(({ name, href, icon: Icon, color }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className={`text-gray-500 transition-colors duration-200 ${color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-3 text-sm">
                  {section.links.map(({ name, href, icon: Icon, color }) => (
                    <li key={name}>
                      <Link
                        to={href}
                        className="flex items-center space-x-2 hover:text-primary-600 transition-all group"
                      >
                        <Icon className={`w-4 h-4 ${color}`} />
                        <span>{name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Newsletter Section */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
              <p className="text-sm mb-4 opacity-80">
                Subscribe to our newsletter for the latest animations and
                updates.
              </p>
              {isSubscribed ? (
                <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-3 rounded-lg text-sm">
                  Thank you for subscribing!
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-secondary-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-secondary-800 dark:text-white"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-500 text-white py-2 rounded-lg hover:from-blue-700 hover:to-purple-600 transition-all duration-200 font-medium"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 dark:border-secondary-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            <p>&copy; {currentYear} Animate Hub. All rights reserved.</p>
            <p className="flex items-center mt-2 md:mt-0">
              Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> by{" "}
              <a
                href="https://github.com/Premkolte/AnimateHub"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                Prem Kolte
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {showToast && (
        <ToastNotification
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
};

export default Footer;
