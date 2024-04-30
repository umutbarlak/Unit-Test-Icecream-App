import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../Card";

const Scoops = () => {
  const [data, setData] = useState([]);
  const [basket, setBasket] = useState([]);

  const addToBasket = (item) => {
    setBasket([...basket, item]);
  };

  const clearFromBasket = (name) => {
    setBasket(basket.filter((i) => i.name !== name));
  };

  useEffect(() => {
    axios.get("http://localhost:4000/scoops").then((res) => setData(res.data));
  }, []);

  return (
    <div className=" container my-5">
      <h1>Dondorma Çeşitleri</h1>
      <p>
        Tanesi <span className=" text-success">20₺</span>
      </p>
      <h3>
        Çeşit Ücreti
        <span data-testid={"total"} className=" text-success">
          {basket.length * 20}
        </span>
        ₺
      </h3>

      <div className="row gap-5 justify-content-between mt-4 p-3">
        {data?.map((i) => (
          <Card
            basket={basket}
            addToBasket={addToBasket}
            clearFromBasket={clearFromBasket}
            key={i.name}
            item={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Scoops;
