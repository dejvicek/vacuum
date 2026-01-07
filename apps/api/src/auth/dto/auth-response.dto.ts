export class AuthResponseDto {
  readonly accessToken: string;
  readonly user: {
    readonly id: number;
    readonly username: string;
  };
}
