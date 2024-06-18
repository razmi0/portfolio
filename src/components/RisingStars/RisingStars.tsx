import { useRef } from "react";
import "./styles.css";

const root = document.querySelector(":root") as HTMLHtmlElement;
export const RisingStars = () => {
  const ref = useRef<HTMLDivElement>(null);
  root?.style.setProperty("--raining-stars-color", "#ff6700"); //
  return (
    <>
      <div className="rising-stars rising-stars-visible" ref={ref}>
        <div style={{ height: "1px", width: "1px" }}></div>
        <div style={{ height: "2px", width: "2px" }}></div>
        <div style={{ height: "1px", width: "1px" }}></div>
      </div>
    </>
  );
};
