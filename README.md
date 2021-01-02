# warframe-component-calculator
A simple tool for the game Warframe where the user selects which items they have not crafted, and the calculator lists all of the required materials.

The python files generate the webpage content from the data supplied by https://github.com/WFCD/warframe-items. The webpage and relevant files and then stored in the `webpage` directory.

## Setup

To update the pickle file and JavaScript data files, and copy required images to the webpage directory:

- Move the `data` folder from https://github.com/WFCD/warframe-items into this repo.
- Run the contents of the `Data Processing` Jupyter notebook. This functionality will later be incorporated into `main.py` to simplify updating the page content.

To generate the webpage content:

- Run `main.py` to build the Jinja2 template with the content stored in `category_data.pickle`.
