import { render, screen } from "@testing-library/react";
import Card from ".";
import userEvent from "@testing-library/user-event";

const item = {
  name: "Mint chip",
  imagePath: "/images/mint-chip.png",
};

const basket = [
  {
    name: "Mint chip",
    imagePath: "/images/mint-chip.png",
  },
  {
    name: "Chocolate",
    imagePath: "/images/chocolate.png",
  },
  {
    name: "Chocolate",
    imagePath: "/images/chocolate.png",
  },
];

test("Card içeriği gelen veriye göre kerana basılır", () => {
  render(
    <Card
      item={item}
      basket={basket}
      addToBasket={() => {}}
      clearFromBasket={() => {}}
    />
  );

  // mikrar spanını çağır
  const amount = screen.getByTestId("amount");
  // 2 mi bak
  expect(amount.textContent).toBe("1");

  // Mint chip yazısı ekrana basıldı mı
  screen.getByText("Mint chip");

  // resmi çağır
  const image = screen.getByAltText("çeşit-resim");

  expect(image).toHaveAttribute("src", item.imagePath);
});

test("Card buton tıklanınca fonksiyonlar doğru parametreler ile çalışır", async () => {
  const user = userEvent.setup();
  // mock fonksiyonları prop olarak gönderilen asıl propların yerine kullanılır
  const addMockFn = jest.fn();
  const clearMockFn = jest.fn();

  render(
    <Card
      item={item}
      basket={basket}
      addToBasket={addMockFn}
      clearFromBasket={clearMockFn}
    />
  );

  const addBtn = screen.getByRole("button", { name: /ekle/i });
  const clearBtn = screen.getByRole("button", { name: /sıfırla/i });

  // ekle butonunda tıkla
  await user.click(addBtn);
  // addToBasket fnk doğru parametreleri alarak çalıştı mı
  expect(addMockFn).toHaveBeenCalledWith(item);

  // sıfırla butonnuna tıkla
  await user.click(clearBtn);
  // clearFromBaskeet fnk doğru parametreler  alarak çalıştı mı
  expect(clearMockFn).toHaveBeenCalledWith(item.name);
});
