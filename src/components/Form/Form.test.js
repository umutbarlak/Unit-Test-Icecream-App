import { fireEvent, render, screen } from "@testing-library/react";
import Form from ".";

test("Koşulların onaylanmasına göre button aktifliği", () => {
  render(<Form />);

  // gerekli elemnları çağır
  const button = screen.getByRole("button");
  const checkbox = screen.getByRole("checkbox");
  // checkbox tiklenmiş mi
  expect(checkbox).not.toBeChecked();
  // button disabled mı
  expect(button).toBeDisabled();
  // checkboxa tıkla
  fireEvent.click(checkbox);
  // button aktif mi
  expect(button).toBeEnabled();
  // checkbox a tıkla
  fireEvent.click(checkbox);
  // button inaktif mi
  expect(button).toBeDisabled();

  fireEvent.click(checkbox);

  expect(button).toBeEnabled();
});

test("Onay butonunu  hover durumuna göre bildirim gözükür", () => {
  // formu renderla
  render(<Form />);
  // gerekli elemanları çağır
  const checkbox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");
  const modal = screen.getByText(/size gerçekten/i);

  // checkbox tikle (buton aktif hale gelir)
  fireEvent.click(checkbox);
  // bildirim ekranda mı
  expect(modal).not.toBeVisible();
  // mouse'u butuna getir
  fireEvent.mouseEnter(button);
  // bildirim ekrana geldi mi
  expect(modal).toBeVisible;
  // mouse buttondan çek
  fireEvent.mouseLeave(button);
  // bildiirm ekrandan gitti mi
  expect(modal).not.toBeVisible();
});
