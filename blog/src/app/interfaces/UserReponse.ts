export interface UserResponse{
  accessToken : string
  tokenType : string
  userDetailsDto : {
    name: string ,
    username: string ,
    email: string ,
    roles: [ {name : string  }]
  }
}
