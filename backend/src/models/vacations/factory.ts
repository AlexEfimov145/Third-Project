import Model from "./model";
import vacation from "./mysql";

export default function getModel(): Model {
    return vacation;
}