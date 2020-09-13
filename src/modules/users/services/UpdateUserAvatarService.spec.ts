import 'reflect-metadata';

import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeUsersRepositories from '../repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/providers/StorageProvider/fakes/FakeStorageProvider';

import AppError from '@shared/errors/AppError'

describe('Update User Avatar', () => {

    it('should be able to update avatar user', async () => {
        const fakeUsersRepositories = new FakeUsersRepositories();
        const fakeStorageProvider = new FakeStorageProvider();

        const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepositories, fakeStorageProvider)

        const user = await fakeUsersRepositories.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12345'
        })


        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar.jpg'
        })

        expect(user.avatar).toBe('avatar.jpg');

    });

    it('should not be able to update avatar from non existings user  ', async () => {
        const fakeUsersRepositories = new FakeUsersRepositories();
        const fakeStorageProvider = new FakeStorageProvider();

        const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepositories, fakeStorageProvider)

        expect(updateUserAvatar.execute({
            user_id: 'non-existing-user',
            avatarFileName: 'avatar.jpg'
        })).rejects.toBeInstanceOf(AppError);

    });

    it('should be able to delte old avatar when updating new one', async () => {
        const fakeUsersRepositories = new FakeUsersRepositories();
        const fakeStorageProvider = new FakeStorageProvider();

        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepositories, fakeStorageProvider)

        const user = await fakeUsersRepositories.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12345'
        })


        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar.jpg'
        })

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar2.jpg'
        })

        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
        expect(user.avatar).toBe('avatar2.jpg');

    });





})