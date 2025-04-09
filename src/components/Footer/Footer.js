import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-title">Book Club</p>
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} Grayson Gales
        </p>
      </div>
    </footer>
  );
}

export default Footer;
