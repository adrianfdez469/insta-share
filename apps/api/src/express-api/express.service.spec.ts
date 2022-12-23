import { Test } from '@nestjs/testing';

import { ExpressService } from './express.service';

describe('ExpressService', () => {
  let service: ExpressService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [ExpressService],
    }).compile();

    service = app.get<ExpressService>(ExpressService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      expect(service.getData()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
