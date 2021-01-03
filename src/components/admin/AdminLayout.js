import * as React from "react";

import Menu from "./Menu";

import { useMediaQuery } from "react-responsive";

export default function AdminLayout({ children }) {
  const [isClosed, setClosed] = React.useState(true);

  const isStatic = useMediaQuery({ minWidth: 700 });

  return (
    <Menu isStatic={isStatic} isClosed={isClosed} setClosed={setClosed}>
      <div className="p-4">{children}</div>
    </Menu>
  );
}
