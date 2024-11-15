import { AuthController } from "../controllers/auth.controller";
import { Application } from "express";

export class AuthRoutes{
    private controller = new AuthController();

    public routes(app: Application){
        app.route('/auth/register').post(this.controller.register);
        app.route('/auth/login').post(this.controller.login);
    }
}