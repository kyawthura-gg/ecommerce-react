import { useMediaQuery } from "react-responsive";

export default function useBreakpoint() {
  return useMediaQuery({ minWidth: 800 });
}
