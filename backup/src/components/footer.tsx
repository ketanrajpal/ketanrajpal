const Footer = () => {
  return (
    <footer>
      <div>
        <a href="https://www.linkedin.com/in/ketanrajpal" target="_blank" rel="noreferrer">
          LinkedIn.
        </a>
      </div>
      <div>
        <a href="http://github.com/ketanrajpal" target="_blank" rel="noreferrer">
          Github.
        </a>
      </div>
      <div>
        <a href="https://www.behance.net/ketanrajpal" target="_blank" rel="noreferrer">
          Behance.
        </a>
      </div>
      <div>
        <a href={`${process.env.PUBLIC_URL}/resume.pdf`} target="_blank" rel="noreferrer">
          Resume.
        </a>
      </div>
      <div>
        <a href="https://profile.codersrank.io/user/ketanrajpal" target="_blank" rel="noreferrer">
          CodersRank.
        </a>
      </div>
      <div></div>
    </footer>
  );
};

export default Footer;
