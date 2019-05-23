import { Jo } from './jo';

describe('J promise', () => {
  it('should call callback', () => {
    const callback = jest.fn();
    const j = new Jo(callback);
    expect(callback).toHaveBeenCalled();
  });

  it('should resolve value', () => {
    const j = new Jo(resolve => {
      resolve(3);
    });
    j.then(
      val => {
        expect(val).toEqual(3);
      },
      error => {}
    );
  });

  it('should reject error', () => {
    const j = new Jo((resolve, reject) => {
      reject(new Error('some error'));
    });
    j.then(
      val => {},
      error => {
        expect(error.message).toEqual('some error');
      }
    );
  });

  it('should be able to chain by then', () => {
    const j = new Jo(resolve => {
      resolve(1);
    });
    j.then(val => val + 1).then(val => {
      expect(val).toEqual(2);
    });
  });

  it('should be able to chain with promise', () => {
    const j = new Jo(resolve => {
      resolve(1);
    });
    const addOne = (val) => new Jo((resolve) => resolve(val+1));

    j.then(addOne).then(val => {
      expect(val).toEqual(2);
    });
  });
});
