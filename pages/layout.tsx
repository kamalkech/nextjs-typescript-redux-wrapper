import Layout from "../components/layouts/index";
import { useState } from "react";

const layout = () => {
  const [layout, setLayout] = useState(1);
  return (
    <Layout layout_id={layout}>
      <h1>Page Layout</h1>
      <select
        onChange={(e) => {
          setLayout(parseInt(e.target.value));
        }}
      >
        <option value="1">Layout 1</option>
        <option value="2">Layout 2</option>
      </select>
    </Layout>
  );
};

export default layout;
