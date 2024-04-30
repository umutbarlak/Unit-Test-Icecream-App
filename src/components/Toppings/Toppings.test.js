import { render, screen } from "@testing-library/react";
import Toppings from ".";
import userEvent from "@testing-library/user-event";

test("Sosların ekleme ve çıkarma işlemleri toplama etki eder", async () => {
  const user = userEvent.setup();
  // bileşeni renderla
  render(<Toppings />);

  // toplam spanı al
  const total = screen.getByTestId("total");

  // Sosları al
  const toppings = await screen.findAllByRole("checkbox");

  // toplam fiyatı 0 mı
  expect(total.textContent).toBe("0");

  // bütün checkbox ların tiksiz olduğunu kontrol et
  toppings.forEach((i) => expect(i).not.toBeChecked());
  // soslardan 1 tanesine tıkla
  await user.click(toppings[0]);
  // toplam 3 mü
  expect(total.textContent).toBe("3");

  // soslardan başka bir tanesine tıklam
  await user.click(toppings[3]);
  // toplama 6 mı
  expect(total.textContent).toBe("6");

  // ilk tıkladığın elemana tekrar tıklam
  await user.click(toppings[3]);

  // toplam 3 mu
  expect(total.textContent).toBe("3");

  // ikinci tıkladıpım elemana tekrar tıklam
  await user.click(toppings[0]);

  // toplam 0 mı
  expect(total.textContent).toBe("0");
});
