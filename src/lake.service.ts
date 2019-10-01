import * as express from 'express';
import { LakeModel } from './models/lake.schema';
import { Body } from 'tsoa';
import { ILakeModel } from './models/lake.interface';
import { ILakeViewModel } from './models/lake.view-model';
import { SocketConnection } from './socket-connection';



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
        await LakeModel.findOne({ type: type }).then(async (res) => {
            const fishByType = res[requestBody.fishType];
            if (fishByType) {
                if (fishByType > 0) {
                    res[requestBody.fishType]--;
<<<<<<< HEAD
                    await LakeModel.updateOne({ type: type }, res).then(() => {
                        const response = {
                            fishType: requestBody.fishType,
                            res: res
                        }
                        SocketConnection.getSocket().socket.emit('data', response);

                    })
=======
                   await LakeModel.updateOne({ type: type },  {$set: res});
                    
>>>>>>> 4250af34c19b9ca4b0aa5118f2b9b5ba4e214c08
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
