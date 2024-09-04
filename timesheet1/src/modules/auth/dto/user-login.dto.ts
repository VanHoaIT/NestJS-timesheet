import {
  EmailField,
  StringField,
} from '@src/common/decorators/field.decorators';

export class UserLoginDto {
  @EmailField({
    default: 'hoa1@ncc.com',
  })
  readonly email!: string;

  @StringField({ default: '123456' })
  readonly password!: string;
}
