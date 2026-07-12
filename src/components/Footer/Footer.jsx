import React from 'react';
import './Footer.css';

/**
 * Footer — Beautiful romantic footer containing the requested quote,
 * decorative moon/star icons, and clean layout.
 */
function Footer() {
  return (
    <footer id="about" className="footer">
      <div className="footer__divider">
        <span className="footer__divider-star">✦</span>
        <span className="footer__divider-line" />
        <span className="footer__divider-star">✦</span>
      </div>

      <div className="footer__content">
        <p className="footer__quote">
          "Every night, the moon reminds us that even changing phases can still be beautiful."
        </p>

        <div className="footer__decor">
          <span className="footer__decor-star">★</span>
          <span className="footer__decor-moon">☽</span>
          <span className="footer__decor-star">★</span>
        </div>

        <p className="footer__copyright">
          &copy; {new Date().getFullYear()} Moonlit Poetry. Created with love.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
