import "./index.css";
import type { UserLogged } from "@types";
import { useState, type ChangeEvent } from "react";

interface Props {
  origin: string;
}
export default function SearchInput(props: Props) {
  const [users, setUsers] = useState<UserLogged[]>([]);
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    let username = event.currentTarget.value;

    if (username === "") return setUsers([]);

    if (username === "@") return;

    // QUITA EL CARACTER @
    if (username.includes("@")) {
      username = username.replace("@", "");
    }
    setTimeout(async () => {
      const res = await fetch(
        `${props.origin}/api/get-users?username=${username}`
      );

      if (!res.ok) return console.log(res);

      const data = await res.json();

      setUsers(data);
    }, 600);
  };

  const UsersModal = () => {
    return users.map((user) => (
      <a key={user._id} href={`/users/${user._id}`}>
        <h2>{user.name}</h2>
        <span>@{user.username}</span>

        <img src={user.avatar[0].secureUrl} alt={user.name} />
      </a>
    ));
  };
  return (
    <>
      <input
        type="text"
        autoFocus
        name="search-payload"
        placeholder="Search by username: @jhon"
        className="search__input"
        onChange={handleSearch}
      />

      {users.length !== 0 ? <UsersModal /> : null}
    </>
  );
}
