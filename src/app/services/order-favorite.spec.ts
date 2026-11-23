import { TestBed } from '@angular/core/testing';
import { OrderFavorite } from './order-favorite';

describe('OrderFavorite', () => {
  let service: OrderFavorite;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderFavorite);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
