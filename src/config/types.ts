export interface ServerConfig {
    runMode: string;
    host: string;
    httpPort: number;
    readTimeout: number;
    writeTimeout: number;
    hostDomain: string;
    buildName: string;
}

export interface WebSocketConfig {
    readBufferSizeKB: number;
    writeBufferSizeKB: number;
    maxMessageSizeKB: number;
}

export interface SQLDBConfig {
    type: string;
    user: string;
    password: string;
    host: string;
    port: number;
    name: string;
    tablePrefix: string;
    idSize: number;
    sslMode: string;
}

export interface NoSQLDBConfig {
    type: string;
    user: string;
    password: string;
    host: string;
    port: number;
    name: string;
    tablePrefix: string;
    sslMode: string;
}

export interface AppConfig {
    name: string;
    initDefaultRole: boolean;
    pageSize: number;
    jwtAccessSecret: string;
    jwtRefreshSecret: string;
    jwtAccessExpireIn: number;
    jwtRefreshExpireIn: number;
    apiKey: string;
    allowOrigin: string[];
    adminHost: string;
    baseDomain: string;
    systemAdminAccount: string;
    systemAdminPassword: string;
    runtimeRootPath: string;
    logMode: string;
    logSavePath: string;
    logSaveName: string;
    logFileExt: string;
    timeFormat: string;
    cacheService: string;
}

export interface RedisConfig {
    host: string;
    password: string;
    maxIdle: number;
    maxActive: number;
    idleTimeout: number;
}

export interface AWSConfig {
    accessKey: string;
    secretKey: string;
    region: string;
}

export interface EmailConfig {
    provider: string;
    from: string;
    replyTo: string;
    redirectClientURI: string;
    tokenExpireIn: number;
    resendAfter: number;
}

export interface UploadConfig {
    uploadProvider: string;
    uploadLocalDir: string;
    uploadS3BucketName: string;
    uploadS3PathPrefix: string;
    uploadBunnyApiKey: string;
    uploadBunnyApiURI: string;
    uploadBunnyLibraryID: string;
    uploadBunnyIFrameURL: string;
    uploadBunnyIFrameAuthKey: string;
    bunnyIFrameTokenExpireIn: number;
}

export interface GoogleConfig {
    clientID: string;
    clientSecret: string;
    redirectURI: string;
    tokenURL: string;
    userDataURL: string;
}

export interface PaymentConfig {
    sepayURI: string;
}

export interface SentryConfig {
    dsn: string;
}

export interface Config {
    server: ServerConfig;
    websocket: WebSocketConfig;
    sqlDb: SQLDBConfig;
    nosqlDb: NoSQLDBConfig;
    app: AppConfig;
    redis: RedisConfig;
    aws: AWSConfig;
    email: EmailConfig;
    upload: UploadConfig;
    google: GoogleConfig;
    payment: PaymentConfig;
    sentry: SentryConfig;
}