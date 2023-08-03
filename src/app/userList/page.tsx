import axios from "axios";
import User from "./User";

type userType = {
  _id: string;
  username: string;
  email: string;
};

export default async function UsersListPage() {
  const { statusText, status, data } = await axios.post("/api/users/allUsers");

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-2xl">UsersListPage</p>
      {data?.map((user: userType) => (
        <User user={user} key={user._id} />
      ))}
    </div>
  );
}
