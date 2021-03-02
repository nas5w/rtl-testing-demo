import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { PricePlanner } from "./PricePlanner";

describe("PricePlanner", () => {
  it("shows free price for nonprofits", () => {
    const { getByLabelText, getByText } = render(<PricePlanner />);
    const nonprofitRadio = getByLabelText("Nonprofit", { exact: false });
    fireEvent.click(nonprofitRadio);
    expect(getByText("free", { exact: false })).toBeInTheDocument();
  });
  it("calculates price for commercial users", async () => {
    const { getByLabelText, getByText, getByRole, findByText } = render(
      <PricePlanner />
    );
    const commercialRadio = getByLabelText("Commercial");
    fireEvent.click(commercialRadio);
    const slider = getByLabelText("How many users", { exact: false });
    fireEvent.change(slider, { target: { value: 300 } });
    expect(getByText("300 users")).toBeInTheDocument();
    const calculateButton = getByRole("button");
    fireEvent.click(calculateButton);
    expect(await findByText("$900", { exact: false })).toBeInTheDocument();
  });
});
