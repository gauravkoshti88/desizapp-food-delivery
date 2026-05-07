import { setMyOrders, setSocketConnected } from "../redux/slices/userSlice";
import { getSocket } from "../utils/socketService";


export const registerSocketEvents = (store) => {
  const socket = getSocket();

  socket.on("connect", () => {
    store.dispatch(setSocketConnected(true));
  });

  socket.on("disconnect", () => {
    store.dispatch(setSocketConnected(false));
  });

  socket.on("orders", (orders) => {
    store.dispatch(setMyOrders(orders));
  });
};