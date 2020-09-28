import "reflect-metadata";

import ResetPasswordService from "./ResetPasswordService";
import FakeUsersRepositories from "../repositories/fakes/FakeUsersRepository";
import FakeUserTokenRepository from "../repositories/fakes/FakeUserTokenRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";


import AppError from "@shared/errors/AppError";

let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeUsersRepositories: FakeUsersRepositories;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider

describe("Reset password email", () => {
    beforeEach(() => {
        fakeUsersRepositories = new FakeUsersRepositories();
        fakeUserTokenRepository = new FakeUserTokenRepository();
        fakeHashProvider = new FakeHashProvider();

        resetPasswordService = new ResetPasswordService(
            fakeUsersRepositories,
            fakeUserTokenRepository,
            fakeHashProvider
        );
    });

    it("should be able to reset the password   ", async () => {

        const user = await fakeUsersRepositories.create({
            name: "John Doe",
            email: "johndoe@example.com",
            password: "123456",
        });

        const { token } = await fakeUserTokenRepository.generate(user.id);

        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

        await resetPasswordService.execute({
            password: "123123",
            token
        });

        const UpdatedUser = await fakeUsersRepositories.findById(user.id);

        expect(generateHash).toHaveBeenCalledWith('123123');
        expect(UpdatedUser?.password).toBe('123123');
    });

    it("should not be able to reset the password with non-existing token", async () => {
        await expect(
            resetPasswordService.execute({
                token: 'non-existing',
                password: '123456'
            })
        ).rejects.toBeInstanceOf(AppError)
    })
    it("should not be able to reset the password with non-existing user", async () => {
        const { token } = await fakeUserTokenRepository.generate('non-existing-user')

        await expect(
            resetPasswordService.execute({
                token,
                password: '123456'
            })
        ).rejects.toBeInstanceOf(AppError)
    })

    it("should not be able to reset the password if passed more than 2 hours", async () => {

        const user = await fakeUsersRepositories.create({
            name: "John Doe",
            email: "johndoe@example.com",
            password: "123456",
        });

        const { token } = await fakeUserTokenRepository.generate(user.id);

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();

            return customDate.setHours(customDate.getHours() + 3);
        })

        await expect(resetPasswordService.execute({
            password: "123123",
            token
        })).rejects.toBeInstanceOf(AppError)



    });
});
