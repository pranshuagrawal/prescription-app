import "./Header.css";

const Header = ({ APP_VERSION }) => {
  return (
    <div className="header-container">
      <div className="app-version">{APP_VERSION}</div>
      <div>
        <div className="heading-1">डा. (श्रीमती) रेनु अग्रवाल</div>
        <div>एम.बी.बी.एस.</div>
        <div>सीनियर मेडिकल ऑफिसर</div>
        <div>स्वेक्छिक सेवा निवृत</div>
        <div>रजी. न. 10961 RMC</div>
      </div>
      <div>
        <div className="heading-1">डा. रामअवतार अग्रवाल</div>
        <div>एम.बी.बी.एस., एम.डी.</div>
        <div>(टी.बी. एण्ड चेस्ट डिसिज)</div>
        <div>एक्स डिस्ट्रिक्ट टी.बी. ऑफिसर, धौलपुर</div>
        <div>रजी. न. 9037 RMC</div>
        <div>फ़ोन (05642-221388)</div>
      </div>
    </div>
  );
};

export default Header;
