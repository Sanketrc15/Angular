import { BookPipePipe } from './book-pipe.pipe';

describe('BookPipePipe', () => {
  it('create an instance', () => {
    const pipe = new BookPipePipe();
    expect(pipe).toBeTruthy();
  });
});
