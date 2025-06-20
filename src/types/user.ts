export interface User {
  data: Data;
  support: Support;
}

export interface Data {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface Support {
  url: string;
  text: string;
}

export interface CreateUserRequest {
  name: string;
  job: string;
  id: string;
  createdAt: string;
}

export interface UpdateUserRequest {
  name: string;
  job: string;
  id: string | number;
  createdAt: string;
}
  
