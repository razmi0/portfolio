// Add your types here

export type Prettyfy<T> = {
    [K in keyof T]: T[K];
};

export type ErrorLoginFormType = {
    username: string | false;
    password: string | false;
};

export type SkillFilter = "all" | "front-end" | "back-end";
export type XpFilter = "all" | "pro" | "education";
export type ProjectFilter = "all" | "web" | "tool" | "documentation";

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

export interface EducationType extends Experience {
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
    platform: string;
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

export type SignInType = () => Promise<ResponseLoginType | void>;

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

export type Routes = "index" | "login" | "dashboard" | "blog";

// Generate a tuple type with all elements of the union
export type RoutesArray = [
    Extract<"index", Routes>,
    Extract<"login", Routes>,
    Extract<"dashboard", Routes>,
    Extract<"blog", Routes>
];

export type PostType = {
    ID: string;
    tel: string;
    email: string;
    message: string;
};

export type AgentType = {
    ID: string;
    ip: string;
    created_at: string;
    updated_at: string;
    platform: string;
    city: string;
    continent: string;
    country: string;
    region: string;
    latitude: string;
    longitude: string;
    timezone: string;
    population: number;
};

export type UserType = {
    ID: string;
    username: string;
    exp?: number;
};

type ErrorField = "contact" | "login";
export type ValidationErrorType = {
    ID: string;
    errors: string[];
    field: ErrorField;
};

export type ContentType = {
    errors: ValidationErrorType[];
    msgs: PostType[];
    users: UserType[];
    agents: AgentType[];
};

export type DataType = "errors" | "msgs" | "users" | "agents";
