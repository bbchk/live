import { render, screen } from "@testing-library/react";
import Card from "../comps/card"; // Adjust the import path as needed

it("renders card", () => {
  const naming = "For dogs";
  const image = "/photos/dog.jpeg";
  render(<Card naming={naming} image={image} />);
  const namingElem = screen.getByText(new RegExp(naming, "i"));
  expect(namingElem).toBeInTheDocument();
});
