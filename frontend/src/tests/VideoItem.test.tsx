import "@testing-library/jest-dom";
import ShallowRenderer from "react-test-renderer/shallow";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import VideoItem from "../components/VideoItem";

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => children,
}));

const mockVideo = {
  title: "test",
  description: "test",
  url: "test",
  email: "test@gmail.com",
};

describe("VideoItem", () => {
  test("should render and match the snapshot", () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <BrowserRouter>
        <VideoItem video={mockVideo} />
      </BrowserRouter>
    );
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
