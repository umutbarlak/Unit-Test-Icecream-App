import axios from "axios";
import { useEffect, useState } from "react";

const Toppings = () => {
  const [data, setData] = useState();
  const [basket, setBasket] = useState([]);

  const handleChange = (isChecked, item) => {
    isChecked
      ? setBasket([...basket, item])
      : setBasket(basket.filter((i) => i.name !== item.name));
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/toppings")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className=" container">
      <h1>Sos Çeşitleri</h1>
      <p>
        Tanesi <span className="text-success">3</span> ₺
      </p>
      <h3>
        <span>Soslar Ücreti</span>
        <span data-testid="total" className=" text-success">
          {basket.length * 3}
        </span>
        ₺
      </h3>

      <div className="row gap-3 p-3">
        {data?.map((item) => (
          <div
            className="col d-flex flex-column top-card"
            style={{ width: "150px" }}
          >
            <label
              key={item.name}
              htmlFor={item.name}
              className="col d-flex flex-column "
            >
              <img
                className=" mx-auto"
                height={100}
                src={item.imagePath}
                alt=""
              />
              <p className=" text-nowrap text-center">{item.name}</p>
              <input
                onChange={(e) => handleChange(e.target.checked, item)}
                className="d-none"
                id={item.name}
                type="checkbox"
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toppings;
