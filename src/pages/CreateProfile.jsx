import { useNavigate } from "react-router-dom";
import { ProfileRegistration } from "../components/ProfileRegistration";

export default function CreateProfile() {

  const navigate = useNavigate();

  return (
    <ProfileRegistration

      onClose={() => {
        navigate("/login");
      }}

      onSuccess={() => {
        navigate("/home");
      }}

    />
  );

}