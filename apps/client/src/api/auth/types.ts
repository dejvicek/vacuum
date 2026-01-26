export interface AuthRequestDto {
  readonly username: string;
  readonly password: string;
}

export interface SignupRequestDto {
  readonly username: string;
  readonly password: string;
}

export interface AuthResponseDto {
  readonly accessToken: string;
  readonly user: {
    readonly id: number;
    readonly username: string;
  };
}

export interface User {
  readonly id: number;
  readonly username: string;
}
