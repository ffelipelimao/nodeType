import "reflect-metadata";

import SendForgotPasswordEmailService from "./SendForgotPasswordEmailService";
import FakeUsersRepositories from "../repositories/fakes/FakeUsersRepository";
import FakeUserTokenRepository from "../repositories/fakes/FakeUserTokenRepository";
import FakeMailProvider from "@shared/providers/MailProvider/fakes/FakeMailProvider";

import AppError from "@shared/errors/AppError";

let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUsersRepositories: FakeUsersRepositories;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe("Send forgot password email", () => {
  beforeEach(() => {
    fakeUsersRepositories = new FakeUsersRepositories();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokenRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepositories,
      fakeMailProvider,
      fakeUserTokenRepository
    );
  });

  it("should be able to recover the password using the email", async () => {
    const sendMail = jest.spyOn(fakeMailProvider, "sendMail");

    await fakeUsersRepositories.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    await sendForgotPasswordEmail.execute({
      email: "johndoe@example.com",
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to recover a non-existing user password", async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: "johndoe@example.com",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should generate a forgot password token", async () => {
    const generateToken = jest.spyOn(fakeUserTokenRepository, "generate");

    const user = await fakeUsersRepositories.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    await sendForgotPasswordEmail.execute({
      email: "johndoe@example.com",
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
