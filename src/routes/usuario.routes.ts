import { UserController } from "../controllers/user.controller";
import { Application } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class UserRoutes {
    private controller = new UserController();
    private auth = new AuthMiddleware();

    public routes(app: Application): void {
        app.route('/user')
            .get(this.auth.verifyToken, this.controller.getAll)
            .post(this.auth.verifyToken, this.controller.create);

        app.route('/user/:id')
            .get(this.auth.verifyToken, this.controller.getOne)
            .put(this.auth.verifyToken, this.controller.update)
            .delete(this.auth.verifyToken, this.controller.delete);
    }
}