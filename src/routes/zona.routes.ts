import { ZonaController } from "../controllers/zona.controller";
import { Application } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class ZonaRoutes {
    private controller = new ZonaController();
    private auth = new AuthMiddleware();

    public routes(app: Application): void {
        app.route('/zona')
            .get(this.auth.verifyToken, this.controller.getAll)
            .post(this.auth.verifyToken, this.controller.create);

        app.route('/zona/:id')
            .get(this.auth.verifyToken, this.controller.getOne)
            .put(this.auth.verifyToken, this.controller.update)
            .delete(this.auth.verifyToken, this.controller.delete);
    }
}