import {
  render,
  fireEvent,
} from '../../../../../setupTest'

import Button from ".";

describe("Button", () => {
  it("renders button with children correctly", () => {
    const { getByText } = render(<Button onClick={() => { }}>Click me</Button>);
    const buttonElement = getByText(/Click me/i);

    expect(buttonElement).toBeInTheDocument();
  });

  it("calls onClick function when clicked", () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button onClick={handleClick}>Click me</Button>);
    const buttonElement = getByText(/Click me/i);

    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
