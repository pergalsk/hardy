import { render } from "@testing-library/react";
import { Cookies } from "./Cookies";

test("renders without crashing", () => {
  const { container } = render(
    <Cookies
      data={[
        {
          name: "session",
          value: "abc",
          path: "/",
          domain: "example.com",
          expires: null,
          sameSite: "Lax",
          httpOnly: false,
          secure: false,
        },
      ]}
    />,
  );
  expect(container).not.toBeEmptyDOMElement();
});
