const Footer = () => {
  return (
    <footer className="border-top -py-2 text-center">
      <span>
        Real <i className="bi bi-google-play"></i> App
      </span>

      <span> {new Date().getFullYear()} </span>
    </footer>
  );
};
export default Footer;
