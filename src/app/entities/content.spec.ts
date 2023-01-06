import { Content } from './content';

describe('Notification content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('you received a friendship solicitation');

    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification content with less than 5 characters', () => {
    expect(() => new Content('you')).toThrow();
  });

  it('should not be able to create a notification content with less than 240 characters', () => {
    expect(() => new Content('y'.repeat(241))).toThrow();
  });
});
