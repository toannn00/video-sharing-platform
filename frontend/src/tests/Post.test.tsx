import "@testing-library/jest-dom";
import ShallowRenderer from "react-test-renderer/shallow";
import { Post } from "../components/Post";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => children,
}));

describe("Post", () => {
  test("should render and match the snapshot", () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <BrowserRouter>
        <Post />
      </BrowserRouter>
    );
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
