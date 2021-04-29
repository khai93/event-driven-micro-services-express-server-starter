import { Application, Request, Response, Router } from "express";
import { inject, injectable } from "tsyringe";
import { IExecuteable } from "../../../../common/interfaces/IExecuteable";
import Middleware from "../../../../common/middleware";
import { ServiceInfo } from "../../../../common/serviceInfo";
import Version from "../../../../common/version";
import { LoggerModule } from "../../../../modules/logger/types";
import { ServiceModule } from "../../../../modules/service/types";
import { ServiceRegistryServer } from "../../../server";
import { ServiceRegistryRoute } from "../../ServiceRegistryRoute";

@injectable()
export class ServiceRegistryLunaRoute implements ServiceRegistryRoute {
    constructor(
        @inject("ServiceModule") private serviceModule: ServiceModule,
        @inject("LoggerModule") private logger: LoggerModule
    ) { }

    version: Version = new Version(1);

    execute(router: Router) {
        router.get('/', async (req: Request, res: Response) => {
            res.json({
                success: true,
                services: await this.serviceModule.getAll()
            });
        });
    }
}