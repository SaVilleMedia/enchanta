import enchantaStore from "../../store";

export default function Dashboard() {
  const user = enchantaStore((state) => state.user);

  return (
    <div>
      <div className="flex justify-content-between p-5">
        <h1>DASBHOARD SONNNN!</h1>
      </div>

      {user ? <h1>Hello! {user.username} </h1> : null}
    </div>
  );
}
