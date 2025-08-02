import React from "react";
import { render, screen } from "@testing-library/react";
import Card from ".";


describe("Card", () => {
  it("renders the title", () => {
    render(<Card title='My Card Title'>Content</Card>);
    expect(screen.getByText("My Card Title")).toBeInTheDocument();
  });

  it("renders the children content", () => {
    render(<Card title='With Content'>Hello, world!</Card>);
    expect(screen.getByText("Hello, world!")).toBeInTheDocument();
  });

  it("renders the subtitle when subtitle is provided", () => {
    render(
      <Card title='Numbered Card' subtitle="Hello there" numbered number={1}>
        Numbered content
      </Card>,
    );
    expect(screen.getByText("Hello there")).toBeInTheDocument();
  });

  it("renders the number when numbered is true", () => {
    render(
      <Card title='Numbered Card' numbered number={1}>
        Numbered content
      </Card>,
    );
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("does not render the number when numbered is false", () => {
    render(
      <Card title='Unnumbered Card' number={2}>
        No number shown
      </Card>,
    );
    expect(screen.queryByText("2")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Card title='Styled Card' className='custom-class'>
        Styled content
      </Card>,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
