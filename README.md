# Amazon Scraper

This project scrapes product data from Amazon based on a search keyword and displays it on a web page.

## Backend

The backend is built with Node.js, Express, axios, and JSDOM. It has an endpoint `/api/scrape` that accepts a `keyword` query parameter and returns the product data in JSON format. CORS is enabled to allow cross-origin requests. There is also an API Rate limiting functionality that allows a maximum of 100 requests to the Amazon server every 15 minutes. 

### Setup

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd amazon-scraper
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the server:
    ```sh
    node server.js
    ```

4. The server will run on `http://localhost:3000`.

### API Endpoint

- **GET** `/api/scrape?keyword=yourKeyword`

  This endpoint initiates the scraping process and returns the extracted data in JSON format.

  **Query Parameters:**
    - `keyword` (string): The search keyword for scraping Amazon products.

  **Response:**
  ```json
  [
      {
          "title": "Product Title",
          "rating": "4.5 out of 5 stars",
          "reviewCount": "123",
          "imageUrl": "https://image.url"
      },
      ...
  ]

## Frontend

The frontend is a simple HTML page that uses HTML for structuring the page, and internal CSS to style it for enabling user accessibility.
The project also uses Vanilla JS for
   - Validating `keyword` to check if it contains some text other than whitespace, and is not null
   - Attaching the `keyword` along with the request sent to the backend server
   - Rendering the response received from the backend in the form of JSON into human interactive format.

The page contains a search field into which the user can type keywords to search on Amazon.

A sample result can be seen in the following image:

![Sample Search](https://github.com/TheMarvelFan/carvalho-alexio/blob/main/img/img.png?raw=true)