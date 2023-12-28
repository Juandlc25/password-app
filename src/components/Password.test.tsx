import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import Password from "./Password";

describe("Header component tests", () => {
  it("renders Password component", () => {
    const { getByText } = render(<Password passwordReqs={["hasNumber"]} />);
    expect(getByText("Password Component")).toBeDefined();
  });
  it("renders the reqs that we send in the props", () => {
    const { getByText } = render(
      <Password
        passwordReqs={[
          "hasNumber",
          "hasUppercaseLetter",
          "hasSpecialCharacters",
          "hasNoConsecutiveLetters",
        ]}
      />
    );
    expect(getByText("Has a number 0-9")).toBeDefined();
    expect(getByText("Has uppercase Letter")).toBeDefined();
    expect(getByText("Has a special char !@#$%^&*")).toBeDefined();
    expect(getByText("Has no consecutive letters")).toBeDefined();
  });

  it("change input with number and uppercase", () => {
    const { getByTestId, container } = render(
      <Password
        passwordReqs={[
          "hasNumber",
          "hasUppercaseLetter",
          "hasSpecialCharacters",
        ]}
      />
    );
    const input = getByTestId("password");
    fireEvent.change(input, { target: { value: "Abc123" } });
    const boxes = container.getElementsByClassName("text-green-600");
    expect(boxes.length).toBe(2);
  });

  it("change input with number and special char", () => {
    const { getByTestId, container } = render(
      <Password passwordReqs={["hasNumber", "hasSpecialCharacters"]} />
    );
    const input = getByTestId("password");
    fireEvent.change(input, { target: { value: "34!" } });
    const boxes = container.getElementsByClassName("text-green-600");
    expect(boxes.length).toBe(2);
  });
});
