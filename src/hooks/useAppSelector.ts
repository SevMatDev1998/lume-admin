import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const useAppSelector = useSelector.withTypes<RootState>()

export default useAppSelector