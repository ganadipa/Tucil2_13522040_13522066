import React from "react";
import { pages } from "../constant/pages";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function handleNavigate(route: string) {
    navigate(route);
  }

  return (
    <section className="place-self-start z-10 relative rounded-l bg-cyan-950">
      <nav>
        <ul>
          {pages.map((item) => {
            return (
              <li>
                <div
                  className={`h-[100px] w-[100px] rounded-l ${
                    item.route === pathname ? "bg-cyan-900" : ""
                  }`}
                  onClick={() => handleNavigate(item.route)}
                  style={{ cursor: "pointer" }}
                >
                  {item.route.slice(1)}{" "}
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </section>
  );
};

export default Sidebar;
