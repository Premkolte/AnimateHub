const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <footer className="bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-5 w-full text-left mt-16">
      <p className="text-lg">
        &copy; {year} Animate Hub. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
