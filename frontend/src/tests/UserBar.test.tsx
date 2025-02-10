import "@testing-library/jest-dom";
import ShallowRenderer from "react-test-renderer/shallow";
import UserBar from "../components/UserBar";
import { vi } from "vitest";

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

describe("UserBar", () => {
  test("should render and match the snapshot", () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(<UserBar email="test@example.com" />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
