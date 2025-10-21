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
  X,
  Shield,
} from "lucide-react";

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
    name: "X",
    href: "https://x.com/PremKolte26?mx=2",
    icon: X,
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
      {
        name: "Privacy Policy",
        href: "/privacy-policy",
        icon: Shield,
        color: "text-green-400",
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-primary-50 dark:bg-secondary-900 text-secondary-800 dark:text-white pt-16 pb-8 border-t border-gray-200 dark:border-secondary-700">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
              Animate Hub
            </h2>
            <p className="mt-4 text-sm leading-relaxed opacity-80 max-w-md dark:text-gray-300">
              Animate Hub is your go-to resource for all things animation in web
              development. Discover a wide range of code snippets for
              animations, hovers, and effects, designed to streamline your
              workflow. Just copy, paste, and watch your projects come to life!
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map(({ name, href, icon: Icon, color }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className={`text-gray-500 transition-colors duration-200 ${color} dark:text-gray-400`}
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                {section.title}
              </h3>
              <ul className="space-y-3 text-sm">
                {section.links.map(({ name, href, icon: Icon, color }) => (
                  <li key={name}>
                    <Link
                      to={href}
                      className="flex items-center space-x-2 hover:text-primary-600 transition-all group dark:hover:text-primary-400 dark:text-gray-300"
                    >
                      <Icon className={`w-5 h-5 ${color}`} />
                      <span>{name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
              className="ml-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Prem Kolte
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
