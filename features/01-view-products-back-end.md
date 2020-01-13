# User can view the products for sale - Back End.

## Implementation

For this feature you will be creating a new table in your PostgreSQL database and adding products data. After inserting the data into the table, you will be writing an Express.js endpoint to handle requests for that data.

## Tips

Use the HTTPie command line tool when verifying the behavior of your endpoint(s).

Test your endpoint with the following command.

```
http -v get localhost:3000/api/products
```

Keep an eye on your server's terminal output. It will print useful warnings and error messages.

You can create a backup of your database at any time with the following command. You should commit the dump file so that other developers on your team can import it.

```
npm run db:export
```

### 💰 Motivation

The client will be displaying a list of products to the user, so the endpoint should return key information about the products for sale.

### ✅ Task List

- Launch `pgweb` with the following command and visit http://localhost:8081 in your web browser.
    ```bash
    pgweb --db=wickedSales
    ```
- Open the Query tab of `pgweb` in your browser and create a new `"products"` table with the following SQL statment. Click **Run Query** once you've entered it.:
    ```sql
    create table "products" (
      "productId"        serial  primary key,
      "name"             text    not null,
      "price"            integer not null,
      "image"            text    not null,
      "shortDescription" text    not null,
      "longDescription"  text    not null
    );
    ```
- Copy the `products.csv` file in this instructions repository into the root of your local repository.
- Enter the `psql` console with the following command:
    ```bash
    psql wickedSales
    ```
- While in `psql`, import the data of `products.csv` with the following command. You should receive a result of `COPY 6`.
    ```bash
    \copy products from '/home/dev/lfz/wicked-sales-js-instructions/products.csv' delimiter ',' csv header;
    ```
- Exit `psql` by pressing `Ctrl + D`.
- Add an endpoint after the `GET` endpoint for `/api/health-check` to `server/index.js` that queries the database for the `productId`, `name`, `price`, `image`, and `shortDescription` for all products in the `"products"` table.
- If there is an error querying the database, pass the error to the `next` function as seen in the `GET` endpoint for `/api/health-check`.
- Test your endpoint.
- Export your database for commit.

## Example Request

```
GET /api/products HTTP/1.1
Accept: */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Host: localhost:3000
User-Agent: HTTPie/0.9.8

```

## Example Response

```
HTTP/1.1 200 OK
Cache-Control: no-store, no-cache, must-revalidate
Connection: close
Content-Type: application/json; charset=utf-8
Date: Mon, 18 Nov 2019 14:04:36 GMT
Expires: Thu, 19 Nov 1981 08:52:00 GMT
Host: localhost:3000

[
    {
        "image": "/images/shake-weight.jpg",
        "name": "Shake Weight",
        "price": 2999,
        "productId": 1,
        "shortDescription": "Dynamic Inertia technology ignites muscles in arms, shoulders, and chest."
    },
    {
        "image": "/images/shamwow.jpg",
        "name": "ShamWow",
        "price": 2595,
        "productId": 2,
        "shortDescription": "It's like a chamois, towel, and sponge, all in one! Soaks up to 10x it's weight in any liquid!"
    },
    {
        "image": "/images/snuggie.jpg",
        "name": "Snuggie",
        "price": 2900,
        "productId": 3,
        "shortDescription": "Super-Soft Fleece with pockets! One Size fits all Adults! Keeps you Warm & Your Hands-Free!"
    },
    {
        "image": "/images/wax-vac.jpg",
        "name": "Wax Vac",
        "price": 999,
        "productId": 4,
        "shortDescription": "Gentle way to remove ear wax. Safe and hygienic. Reduces the risk of painful infections."
    },
    {
        "image": "/images/ostrich-pillow.jpg",
        "name": "Ostrich Pillow",
        "price": 9900,
        "productId": 5,
        "shortDescription": "Create your own snugly space in the world and feel-good anywhere with the ultimate cocoon pillow."
    },
    {
        "image": "/images/tater-mitts.jpg",
        "name": "Tater Mitts",
        "price": 830,
        "productId": 6,
        "shortDescription": "8 Seconds is All You Need with Tater Mitts Quickly and easily prepare all your favorite potato dishes with Tater Mitts."
    }
]

```
