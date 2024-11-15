import { Application } from "express";
import { AuthRoutes } from "./auth.routes";
import { UserRoutes } from "./usuario.routes";
import { ObservacionRoutes } from "./Observacion.routes";
import { ZonaRoutes } from "./zona.routes";

export class Routes {
    private authRoutes = new AuthRoutes();
    private userRoutes = new UserRoutes();
    private observacionRoutes = new ObservacionRoutes();
    private zonaRoutes = new ZonaRoutes();

    routes(app: Application) {
        this.authRoutes.routes(app);
        this.userRoutes.routes(app);
        this.observacionRoutes.routes(app);
        this.zonaRoutes.routes(app);
    }
}
