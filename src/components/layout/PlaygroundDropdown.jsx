import { useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

const PlaygroundDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center px-4 py-2">
        Playgrounds <FiChevronDown className="ml-1" />
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-48 bg-red shadow-lg rounded-lg z-50">
          <Link
            to="/animation-playground"
            className="block px-4 py-2"
          >
            AnimationPlayground
          </Link>
          <Link
            to="/playground"
            className="block px-4 py-2 "
          >
            Playground
          </Link>
          <Link
            to="/framerplayground"
            className="block px-4 py-2 "
          >
            FramerPlayground
          </Link>
          <Link
            to="/colorgradientplayground"
            className="block px-4 py-2 "
          >
            ColorGradientPlayground
          </Link>
          <Link
            to="/tailwindplayground"
            className="block px-4 py-2 "
          >
            TailwindPlayground
          </Link>
        </div>
      )}
    </div>
  );
};

export default PlaygroundDropdown;
