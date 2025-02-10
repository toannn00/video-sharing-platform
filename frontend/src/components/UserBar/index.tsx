import { Button } from "antd";
import User from "../../types/user.type";
import { useNavigate } from "react-router-dom";

const UserBar = ({ email }: Partial<User>) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        margin: "0 20px",
      }}
    >
      <div>
        Welcome <b>{email}</b>{" "}
      </div>
      <Button onClick={() => navigate("/post")}>Post</Button>
    </div>
  );
};

export default UserBar;
