import { BaseError } from '../../Util/base.error';

export class InvalidDateRange extends BaseError {
  constructor(public message: string = 'selected Date Range is occupied') {
    super(message);
  }
}
