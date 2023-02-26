import Link from "next/link";
import { signOutUser } from "utils/Firebase";
import React from "react";
import { useRouter } from "next/router";
import Collapsible from "react-collapsible";
import user from "../../../public/assets/user.jpg";
import Image from "next/image";
import Logo from "../../../public/assets/logo.svg";
import styles from "styles/Header.module.css";
import classNames from "classnames/bind";

export default function Navbar() {
  const router = useRouter();
  const handleLogoutClick = () => {
    localStorage.removeItem("auth-token");
    signOutUser();
    router.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-white mx-5 px-2 py-4">
      {/* 			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarTogglerDemo01"
				aria-controls="navbarTogglerDemo01"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button> */}
      <div
        className=" navbar-collapse d-flex align-items-center justify-content-between mx-3"
        id="navbarTogglerDemo01"
      >
        <Link className="navbar-brand" href="/">
          <Image src={Logo} width={225}></Image>
        </Link>
        <ul className={classNames(styles.navMenu, "navbar-nav")}>
          <li>
            <Link className="blue" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="blue" href="/">
              Credits
            </Link>
          </li>
          <li>
            <Link className="blue" href="/">
              History
            </Link>
          </li>
        </ul>
        {/* <div className="d-flex align-items-center gap-2">
          <a
            className="nav-link text-primary mx-4"
            href="https://help.breeze.ai/"
            target="_blank"
            rel="noreferrer"
          >
            Help
          </a>
          <div className="d-flex justify-content-center">
            <Collapsible
              accordionPosition=""
              className=""
              trigger={
                <Image
                  src={user}
                  className="rounded-circle ml-2 "
                  width="34"
                  height="34"
                  alt="Avatar"
                />
              }
              contentOuterClassName=" position-absolute"
              triggerClassName="d-flex position-relative justify-content-center "
            >
              <div className="card p-2" style={{ zIndex: 200 }}>
                <div className="mb-2">
                  <Link className="nav-link" href="/accounts">
                    Account
                  </Link>
                </div>
                <div className="text-center cursor-pointer p-2 bg-white text-black hover--bold ">
                  <span onClick={() => handleLogoutClick()}>Logout</span>
                </div>
              </div>
            </Collapsible>
          </div>
        </div> */}
      </div>
    </nav>
  );
}
