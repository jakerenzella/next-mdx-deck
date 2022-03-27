import React from "react";
import Link from "next/link";
import { useCurrentSlide } from "../context/CurrentSlideContext";

const Header = ({ name, title, date, url }) => {
  const { inCode } = useCurrentSlide();
  return (
    <header>
      <div>
        <a href={url}>
          <span>{name}</span>
        </a>{" "}
        —{" "}
        <Link href="/1">
          <a>{title}</a>
        </Link>
        <span style={{ paddingLeft: "20px", fontStyle: 'italic'}}>
          {inCode ? "Slide naviation disabled when editing code" : ""}
        </span>
      </div>
      <time>{date}</time>
    </header>
  );
};
export default Header;
