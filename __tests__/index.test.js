`import 'jsdom-global/register';`
import Home from "../app/page";
import "@testing-library/jest-dom";
import { render, screen, prettyDOM } from "@testing-library/react";
import Flow from '../app/components/nodes'
import axios from 'axios';
jest.mock('axios');



global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}))

describe("App", () => {
    it("renders Home page", () => {
        render(<Home />);
        expect(screen.getByTestId("heroes-list")).toBeInTheDocument();
        expect(screen.getByTestId("header")).toBeInTheDocument();
    });

    it("API is working", async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/people/?page=1`);
        const result = await res.json();
        expect(result.results[0].name).toBe('Obi-Wan Kenobi');
    });

    it("data from API renders correctly", () => {
        let dummydata = {
            "id": 29,
            "name": "Arvel Crynyd",
            "height": "unknown",
            "mass": "unknown",
            "hair_color": "brown",
            "skin_color": "fair",
            "eye_color": "brown",
            "birth_year": "unknown",
            "gender": "male",
            "homeworld": 28,
            "films": [
                3
            ],
            "species": [
                1
            ],
            "vehicles": [],
            "starships": [
                28
            ],
            "created": "2014-12-18T11:16:33.020000Z",
            "edited": "2014-12-20T21:17:50.367000Z",
            "url": "https://sw-api.starnavi.io/people/29/"

        }
        const renderer = render(Flow({
            data: dummydata
        }));
        expect(
            screen.getByText(
                "Arvel Crynyd"
            )
        ).toBeInTheDocument();

        expect(screen.getByTestId("hero-flow")).toBeInTheDocument();
    });
});