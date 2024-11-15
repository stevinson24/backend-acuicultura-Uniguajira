import { ObservacionController } from "../controllers/observacion.controller";
import { Application } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class ObservacionRoutes {
    private controller = new ObservacionController();
    private auth = new AuthMiddleware();

    public routes(app: Application): void {
        app.route('/observacion')
            .get(this.auth.verifyToken, this.controller.getAll)
            .post(this.auth.verifyToken, this.controller.create);

        app.route('/observacion/:id')
            .get(this.auth.verifyToken, this.controller.getOne)
            .put(this.auth.verifyToken, this.controller.update)
            .delete(this.auth.verifyToken, this.controller.delete);
    }
}