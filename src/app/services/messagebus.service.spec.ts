import { TestBed } from '@angular/core/testing';

import { MessagebusService } from './messagebus.service';

describe('MessagebusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessagebusService = TestBed.get(MessagebusService);
    expect(service).toBeTruthy();
  });
});
