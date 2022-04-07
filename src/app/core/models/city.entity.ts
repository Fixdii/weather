import { Weather } from "./weather.entity";

export type City = {
    name: string;
    weather: Weather[];
}