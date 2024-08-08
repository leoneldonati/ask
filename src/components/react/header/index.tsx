import "./index.css";
interface Props {
  avatarSrc: string;
  username: string;
}
export default function Header(props: Props) {

  return (
    <header className="home__header">
      <h1 className="home__header__h1">Ask!</h1>

      <ul className="home__header__ul">
        <li>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 100,
            }}
          ></span>
          <a className="home__header__btn" href="/search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-search"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>{" "}
            Search
          </a>
        </li>
        <li>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 100,
            }}
          ></span>
          <a className="home__header__btn" href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M19 8.71l-5.333 -4.148a2.666 2.666 0 0 0 -3.274 0l-5.334 4.148a2.665 2.665 0 0 0 -1.029 2.105v7.2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-7.2c0 -.823 -.38 -1.6 -1.03 -2.105" />
              <path d="M16 15c-2.21 1.333 -5.792 1.333 -8 0" />
            </svg>{" "}
            Home
          </a>
        </li>
        <li>
          <a
            className="home__header__btn"
            href="/logout"
            title="Close session?"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
              <path d="M15 12h-12l3 -3" />
              <path d="M6 15l-3 -3" />
            </svg>{" "}
            Logout
          </a>
        </li>
        <li>
          <a
            href="/post/add"
            className="home__btn--add-post"
            title="Share how your feels today!"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M12.4 19a4.2 4.2 0 0 1 -1.57 -.298l-3.83 2.298v-3.134a2.668 2.668 0 0 1 -1.795 -3.773a4.8 4.8 0 0 1 2.908 -8.933a5.335 5.335 0 0 1 9.194 1.078a5.333 5.333 0 0 1 4.45 6.89"></path>
              <path d="M16 19h6"></path>
              <path d="M19 16v6"></path>
            </svg>
          </a>
        </li>
      </ul>

      <a className="home__header__btn--session" href="/profile">
        <img
          src={props.avatarSrc}
          alt={props.username}
          loading="lazy"
          className="home__header_avatar"
        />
      </a>
    </header>
  );
}
