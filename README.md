## About The Project

When the project is run, the hotels that I have defined as fixed in the /hotels url are set to localStorage and listed. A maximum of 5 hotels are shown in the list and it is possible to switch between pages with pagination. With the sorting filtering process, the hotels are listed as Score (Ascending/Descending). With the Increase/Decrease Points buttons on the hotel cards, the score of the hotel changes and with this change, the hotels are listed again according to their points and point change date. A new hotel entry is made with the Add Hotel button. In the Add Hotel form, there is only the Hotel Name input, other fields are set as static. In addition, the delete button appears on the upper right corner of the hotel card, and when clicked, a warning message is sent to the user via the dialog screen and the hotel can be deleted.

### Built With

- [React.js](https://reactjs.org/)

## Getting Started

To get this project copy up and running follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/en/)

### Installation

1. Clone the repo
   ```sh
   git@github.com:habipyesilyurt17/hotel.git
   ```
2. Install packages
      ```sh
        npm install
        # or
        yarn install
      ```

3. Run project
      ```bash
      npm start
      # or
      yarn start
      ```