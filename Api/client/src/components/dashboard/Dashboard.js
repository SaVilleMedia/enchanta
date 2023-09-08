import enchantaStore from "../../store";

export default function Dashboard() {
  const user = enchantaStore((state) => state.user);

  return (
    <div>
      <h1>DASBHOARD SONNNN!</h1>
      {user ? <h1>Hello! {user.username} </h1> : null}
    </div>
  );
}
