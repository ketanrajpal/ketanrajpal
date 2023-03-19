const Header = () => {
  return (
    <header>
      <div className="heading">
        <h1>
          Ketan <span>Rajpal</span>
        </h1>
      </div>
      <div className="contact">
        <a href="mailto:info@krpl.in">
          email. <span>info@krpl.in</span>
        </a>
      </div>
      <div className="contact">
        <a href="tel:+4407397128043">
          phone. <span>+44 7397128043</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
