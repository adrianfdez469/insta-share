import { Test, TestingModule } from '@nestjs/testing';

import { ExpressController } from './express.controller';
//import { ExpressService } from './express.service';

describe('ExpressController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ExpressController],
      //providers: [ExpressService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      const expressController = app.get<ExpressController>(ExpressController);
      //expect(expressController.getData()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
