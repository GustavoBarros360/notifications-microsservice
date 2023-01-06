import { randomUUID } from 'crypto';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-notifications';
import { makeNotification } from '@test/factories/notification-factory';

describe('Count recipient notifications', () => {
  it('should be able to count notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    const recipientId1 = randomUUID();
    const recipientId2 = randomUUID();
    const nf1 = makeNotification({ recipientId: recipientId1 });
    const nf2 = makeNotification({ recipientId: recipientId1 });
    const nf3 = makeNotification({ recipientId: recipientId2 });

    await notificationsRepository.create(nf1);
    await notificationsRepository.create(nf2);
    await notificationsRepository.create(nf3);

    const { count: count1 } = await countRecipientNotifications.execute({
      recipientId: recipientId1,
    });

    expect(count1).toEqual(2);
  });
});
