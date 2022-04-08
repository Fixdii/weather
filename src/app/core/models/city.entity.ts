import { Weather } from "./weather.entity";

export type APICity = {
    name: string;
    dt: number;
    main: {
        temp: number
    };
    weather: Weather[];
}

export type UICity = {
    name: string;
    dt: number;
    temp: number;    
    weather: Weather[];
}