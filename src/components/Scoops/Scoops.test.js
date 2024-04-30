import { render, screen } from "@testing-library/react";
import Scoops from ".";
import userEvent from "@testing-library/user-event";

test("API dan gelen veriler için ekrana cardlar basılır", async () => {
  render(<Scoops />);

  const cardImages = await screen.findAllByAltText("çeşit-resim");

  expect(cardImages.length).toBeGreaterThanOrEqual(1);
});

test("Çeşitlerin ekleme ve sıfırmala işlemleri çalışır", async () => {
  const user = userEvent.setup();

  render(<Scoops />);

  // ekleme sıfırmala butonlarını çağır
  const addButtons = await screen.findAllByRole("button", { name: /ekle/i });
  const delButtons = await screen.findAllByRole("button", { name: /sıfırla/i });

  // toplam fiyatı çağır
  const total = screen.getByTestId("total");

  // toplam fiyat 0 mı
  //   expect(total).toHaveTextContent("0"); içerisnde sıfır varsa onuda kabul eder

  expect(total.textContent).toBe("0");
  // ekle butonuna tıkla
  await user.click(addButtons[0]);
  // toplam 20 mi
  expect(total.textContent).toBe("20");

  // ekle butonuna 2 defa tıklam
  await user.dblClick(addButtons[2]);
  // toplam 60 mı
  expect(total.textContent).toBe("60");

  // ilk eklmeyi kaldır
  await user.click(delButtons[0]);

  // toplam 40 mı
  expect(total.textContent).toBe("40");

  // 2 ci eklemyi kaldır
  await user.click(delButtons[2]);

  // toplam 0 mı
  expect(total.textContent).toBe("0");
});
