# MINDBench Draft

Dashboard that allow users to view and compare current LLM models perform in mental health assistance.

## Installation

To start the program run the following command from the client folder
```bash
npm run dev
```

## TODO
- [ ] | Khai |Change techprofile from base model -> modelVersion (updates answer and point to modelVersion in seed value) -> update api routes naming -> bring over the drop down table
- [ ] Finish landing page, add content (make the count dynamic), redo the current "home" page, add "benchmark" to the navBar (drop down with 4 options)
        so ideally the flow would be landing -> homepage -> 4 options
- [ ] Unified the table in these 3 pages (techprofile, leaderboard, profiletest). One of the table is expand only on triangle where as other you can click whole row
- [ ] Redesign the page with some UI improvement
- [ ] Redo resource page and add api routes for resources
- [ ] Develop the reasoning page
- [ ] Add api routes for leaderboard
- [ ] Add api routes for reasoning
- [ ] Add api routes for community page

## Project Structure
```bash
|-- main
|   |-- server              # backend
|       |-- data            # mock data
|       |-- styles          # css styling
|       |-- App.jsx         # main page
|   |-- client              # frontend (soon)
|   |-- README.md
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MindLamp](https://www.digitalpsych.org/mindlamp.html)
