import * as React from "react";
import css from "./style.module.css";

const Error: React.VFC = () => {
  const reload=()=>{
    window.location.reload();
  }
  return (
    <div className={css.page}>
      <h1>Si è verificato un errore, Sorry.</h1>
      <button className={css.btn} onClick={reload}>
        <h1>Vai all'home</h1>
      </button>
    </div>
  );
};

export default Error;
