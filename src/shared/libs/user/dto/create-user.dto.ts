export default class CreateUserDto {
  public email!: string;
  public avatarPath?: string;
  public name!: string;
  public userType!: string;
  public password!: string;
}
