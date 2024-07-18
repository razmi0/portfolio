// Add your types here

export type Prettyfy<T> = {
  [K in keyof T]: T[K];
};

export type ErrorLoginFormType = {
  username: string | false;
  password: string | false;
};

export type SkillFilter = "tous" | "front-end" | "back-end";
export type XpFilter = "tous" | "pro" | "formation";
export type ProjectFilter = "tous" | "web" | "outil" | "documentation";

export type SkillType = {
  id: number;
  title: string;
  level: string;
  type: string[];
  description: string;
};

export type ProjectType = {
  id: number;
  title: string;
  type: string[];
  href: string;
  src?: string[];
  description: string;
};

interface Experience {
  id: number;
  type: string;
  title: string;
  lieu: string;
  date: string[];
  duration: string;
  description: string;
}

export interface ProType extends Experience {
  company: string;
  subtitle: string;
  program: string[];
}

export interface FormationType extends Experience {
  level: string;
  status: string;
}

export type SetupObserverProps = {
  threshold?: number;
  onIntersect?: () => void;
  onDisappear?: () => void;
};

export type HandleIntersectionOptions = {
  onIntersect: () => void;
  onDisappear: () => void;
};

export type UserAgentInfo = {
  userAgent: string;
  platform: string;
  hardware: string;
  locale: string;
  connection: string;
};

export type MinimalResponse = {
  authorized: boolean;
  success: boolean;
};

export type ResponseLoginType = {
  res: {
    success: boolean;
    authorized: boolean;
  };
  payload: {
    user: string;
    exp: number;
  };
  token: string;
};

// export type ResponseLoginType = MinimalResponse & { payload: { user: string; exp: number }; token: string };

export type LoginFormType = {
  username: string;
  password: string;
  hp?: string;
};

export type SignInType = () => Promise<ResponseLoginType>;

export type AuthOptions = {
  credentials: RequestCredentials;
  method: RequestInit["method"];
  headers: {
    Authorization: string;
    "Access-Control-Allow-Credentials": "true";
  };
} & Partial<RequestInit>;

export type AuthData = {
  isAuth: boolean;
  exp: number;
  user: string;
  authOptions: AuthOptions;
};

export type AuthContext = {
  signIn: (cb: SignInType) => Promise<boolean>;
  signOut: () => void;
} & AuthData;

export type SimpleFetchError = {
  error: true;
  message: string;
};

export type Routes = "index" | "login" | "admin";

export type PostType = {
  ID: string;
  tel: string;
  email: string;
  message: string;
};

export type AgentType = {
  ID: string;
  userAgent: string;
  platform: string;
  hardware: string;
  locale: string;
  connection: string;
  population: string;
};

export type UserType = {
  username: string;
  exp?: number;
};

type ErrorField = "contact" | "login";
export type ValidationErrorType = {
  id: string;
  errors: string[];
  field: ErrorField;
};
