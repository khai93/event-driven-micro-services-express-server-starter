import express, { Application } from 'express';
import watch from 'node-watch';
import { ServiceInfo, ServiceInfoValue } from '../common/serviceInfo';
import { Name } from '../common/name';
import { injectable, inject, scoped, Lifecycle, singleton } from 'tsyringe';
import { Configuration } from '../config/config';
import { ServiceModule } from '../modules/service/types';
import { LoggerModule } from '../modules/logger/types';

@singleton()
export class ApiGatewayServer {
    private _expressApp: Application;

    constructor(
        @inject("ExpressDefaultFunction") private express: Function,
        @inject("ApiGatewayConfig") private apiGatewayConfig: Configuration,
        @inject("LoggerModule") private logger: LoggerModule
    ) {
        this._expressApp = this.express();
    }

    async start() {
        this._expressApp.listen(this.apiGatewayConfig.server.port, () => {
            this.logger.log('Api Gateway started at PORT ' + this.apiGatewayConfig.server.port);
        });
    }

    get expressApp(): Application {
        return this._expressApp;
    }
}