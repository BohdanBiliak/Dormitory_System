// src/types/axios.d.ts
import 'axios';
import { CookieJar } from 'tough-cookie';

declare module 'axios' {
    interface AxiosRequestConfig {
        jar?: CookieJar;
    }
}
