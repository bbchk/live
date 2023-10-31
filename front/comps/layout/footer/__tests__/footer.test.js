import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "../comps/footer";

describe("Footer", () => {
  it("renders about_us section", () => {
    render(<Footer />);

    // expect(namingElem).toBeInTheDocument();
    // expect(imageElem).toBeInTheDocument();
  });
});
