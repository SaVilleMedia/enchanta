import enchantaStore from "../../store";

export default function Dashboard() {
  const user = enchantaStore((state) => state.authenticated);

  return <div>{user ? user.token : null}</div>;
}
