import { randomUUID } from 'crypto';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/factories/notification-factory';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipient notifications', () => {
  it('should be able to get notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
      notificationsRepository,
    );

    const recipientId1 = randomUUID();
    const recipientId2 = randomUUID();

    await notificationsRepository.create(
      makeNotification({ recipientId: recipientId1 }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: recipientId1 }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: recipientId2 }),
    );

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: recipientId1,
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: recipientId1 }),
        expect.objectContaining({ recipientId: recipientId1 }),
      ]),
    );
  });
});
