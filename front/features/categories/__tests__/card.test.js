import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";
import Card from "../comps/card"; // Adjust the import path as needed

jest.mock("next/router", () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

const naming = "For dogs";
const image = "/photos/dog.jpeg";

describe("Card Component", () => {
  beforeEach(() => {
    render(<Card naming={naming} image={image} />);
  });

  it("renders card", () => {
    const namingElem = screen.getByText(new RegExp(naming, "i"));
    const imageElem = screen.getByAltText(/category/i);
    expect(namingElem).toBeInTheDocument();
    expect(imageElem).toBeInTheDocument();
  });

  it("checks click", () => {
    const card = screen.getByRole("button");
    fireEvent.click(card);

    const router = useRouter();
    expect(router.push).toHaveBeenCalledWith("/");
  });
});
