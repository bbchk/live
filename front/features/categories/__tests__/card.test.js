import { render, screen, fireEvent } from "@testing-library/react";
import Card from "../comps/card"; // Adjust the import path as needed

jest.mock("next/router", () => ({
  useRouter() {
    return {
      push: () => jest.fn(),
    };
  },
}));

it("renders card", () => {
  const naming = "For dogs";
  const image = "/photos/dog.jpeg";
  render(<Card naming={naming} image={image} />);
  const namingElem = screen.getByText(new RegExp(naming, "i"));
  const imageElem = screen.getByAltText(/category/i);
  expect(namingElem).toBeInTheDocument();
  expect(imageElem).toBeInTheDocument();
});
