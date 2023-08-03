type ParamsType = {
  user: {
    _id: string;
    username: string;
    email: string;
  };
};

export default function User({ user }: ParamsType) {
  return (
    <div>
      <p>UserName: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
