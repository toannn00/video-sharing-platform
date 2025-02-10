import "@testing-library/jest-dom";
import ShallowRenderer from "react-test-renderer/shallow";
import { LogoIcon } from "../components/LogoIcon";
import { vi } from "vitest";

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

describe("LogoIcon", () => {
  test("should render and match the snapshot", () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(<LogoIcon />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
