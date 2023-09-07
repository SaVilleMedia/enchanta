import enchantaStore from "../../store";

export default function Dashboard() {
  const user = enchantaStore((state) => state.user);

  return <div>{user ? user.name : null}</div>;
}
