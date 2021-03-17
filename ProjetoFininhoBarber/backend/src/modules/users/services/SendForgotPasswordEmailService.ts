
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import { injectable, inject } from 'tsyringe';
import path from 'path';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  email: string;
 }

@injectable()
class SendForgotPasswordEmailService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
    ){ }

  public async execute({ email}: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user){
      throw new AppError('User does not exists.');
    }

  const { token } = await this.userTokensRepository.generate(user.id);

  const forgotPasswordTemplate = path.resolve(
    __dirname,
    '..',
    'views',
    'forgot_password.hbs',
  );


  await this.mailProvider.sendMail({
    to:{
      name: user.name,
      email: user.email,
    },
    subject: '[Fininho Barber] Recuperação de senha',
    templateData:{
      file: forgotPasswordTemplate,
      variables: {
        name: user.name,
        link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
      }

    }
  });
  }
}

export default SendForgotPasswordEmailService;
