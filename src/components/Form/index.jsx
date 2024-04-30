import { useState } from "react";

const Form = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isHover, setIsHover] = useState(false);

  return (
    <form className=" d-flex justify-content-center align-items-center gap-3 my-5">
      <input
        onChange={(e) => setIsChecked(e.target.checked)}
        className=" form-check-input"
        id="terms"
        type="checkbox"
      />
      <div className="terms-wrapper">
        <label htmlFor="terms">Koşulları okudum ve kabul ediyorum</label>
        <p style={{ display: `${isHover ? "flex" : "none"}` }}>
          Size gerçekten bir şey teslim etmeyeceğiz
        </p>
      </div>
      <button
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        disabled={!isChecked}
        className=" btn btn-sm btn-primary "
      >
        Siparişi Onayla
      </button>
    </form>
  );
};

export default Form;
