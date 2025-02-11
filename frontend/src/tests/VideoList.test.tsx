import "@testing-library/jest-dom";
import ShallowRenderer from "react-test-renderer/shallow";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import VideoList from "../components/VideoList";

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

const mockVideos = [mockVideo];

describe("VideoItem", () => {
  test("should render and match the snapshot", () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <BrowserRouter>
        <VideoList videoList={mockVideos} />
      </BrowserRouter>
    );
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
