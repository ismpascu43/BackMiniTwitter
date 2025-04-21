import server from "./src/server.js";
import { PORT } from "./env.js";

server.listen(PORT || 3001, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`); 
});
