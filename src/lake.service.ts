import * as express from 'express';
import { LakeModel } from './models/lake.schema';
import { Body } from 'tsoa';
import { ILakeModel } from './models/lake.interface';
import { ILakeViewModel } from './models/lake.view-model';

export class LakeService {

    public async getAll(): Promise<ILakeModel[]> {
        try {
            let items: any = await LakeModel.find({});
            items = items.map((item: any) => { return { id: item._id, name: item.name, type: item.type, salmon: item.salmon, tuna: item.tuna } });
            return items;
        } catch (err) {
            console.error("Caught error", err);
        }
    }

    public async update(type: string, @Body() requestBody: ILakeViewModel): Promise<{ error: string, result: string }> {
        let errorMessage = '';
        await LakeModel.findOne({ type: type }).then((res) => {
            const fishByType = res[requestBody.fishType];
            if (fishByType) {
                if (fishByType > 0) {
                    res[requestBody.fishType]--;
                    LakeModel.updateOne({ type: type }, res);
                } else {
                    errorMessage = `No ${requestBody.fishType} in the ${type} lake`;
                }
            } else {
                errorMessage = `There are no ${requestBody.fishType} in the ${type} lake`;
            }
        });
        if (errorMessage) {
            return { error: errorMessage, result: null };
        } else {
            return { error: null, result: `You've got 1 ${requestBody.fishType}` };
        }
    };
}