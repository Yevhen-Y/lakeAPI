import * as express from 'express';
import { Controller, Route, Get, Body, Put} from 'tsoa';
import { ILakeModel } from './models/lake.interface';
import { LakeService } from './lake.service'
import { ILakeViewModel } from './models/lake.view-model';


@Route('/lakes')
export class LakeController extends Controller {

    @Get('/')
    public async getLakes(): Promise<ILakeModel[]> {
        return await new LakeService().getAll();
    }

    @Put('/{type}')
    public async updateLake(type: string, @Body() requestBody: ILakeViewModel): Promise<string> {
        return await new LakeService().update(type, requestBody).then((data) => {
            if (data.error) {
                this.setStatus(500);
                return data.error;
            } else {
                this.setStatus(200);
                return data.result;
            }
        });
    }
}
