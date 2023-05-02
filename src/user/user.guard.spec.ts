import { UserGuard } from './guards/user.guard';

describe('UserGuard', () => {
  it('should be defined', () => {
    expect(new UserGuard()).toBeDefined();
  });
});
