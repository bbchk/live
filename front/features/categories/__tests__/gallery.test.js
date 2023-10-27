import { render } from "@testing-library/react";
import Gallery from "../comps/gallery";

describe("Gallery component", () => {
  const categories = [
    {
      name: "Category 1",
      imageUrl: "https://example.com/image1.jpg",
    },
    {
      name: "Category 2",
      imageUrl: "https://example.com/image2.jpg",
    },
  ];

  it("renders the categories", () => {
    const { getByText, getAllByRole } = render(
      <Gallery categories={categories} />
    );

    // Check that the category names are rendered
    expect(getByText("Category 1")).toBeInTheDocument();
    expect(getByText("Category 2")).toBeInTheDocument();

    // Check that the category images are rendered
    const images = getAllByRole("img");
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute("src", "https://example.com/image1.jpg");
    expect(images[1]).toHaveAttribute("src", "https://example.com/image2.jpg");
  });
});
