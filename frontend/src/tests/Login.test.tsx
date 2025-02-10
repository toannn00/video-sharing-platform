import "@testing-library/jest-dom";
import ShallowRenderer from "react-test-renderer/shallow";
import { Login } from "../components/Login";
import { vi } from "vitest";

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

describe("Login", () => {
  test("should render and match the snapshot", () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(<Login />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
