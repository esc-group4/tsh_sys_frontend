import React, { useState } from "react";
import styles from "./ExampleComp.module.css";
import {
  ExampleComponentProps,
  ExampleComponentState,
} from "./ExampleComp.types";

const ExampleComp: React.FC<ExampleComponentProps> = ({
  title,
  isActive,
  onClick,
}) => {
  const [state, setState] = useState<ExampleComponentState>({ count: 0 });
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{title}</h1>
      <p>{isActive ? "Active" : "Inactive"}</p>
      <button onClick={onClick}>Click me</button>
      <p>Count: {state.count}</p>
      <button onClick={() => setState({ count: state.count + 1 })}>
        Increment
      </button>
    </div>
  );
};

export default ExampleComp;
