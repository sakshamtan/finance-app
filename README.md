## Getting Started

After installing all the dependencies using npm install or yarn install create a .env.local file at the root level and update the .env file to have your local MongoDB URL

# You can run MongoDB locally using Mongod or docker. You can also connect using the mongoDB atlas URL.

If the live data doesn't update it might be that the rate limit of the API is exhausted, in this case, you can create a new API key for a demo account and use that in fetchData.ts API. You can get a new API key from https://www.coingecko.com/en/developers/dashboard


Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result, as shown below, with live data.
<img width="1111" alt="Screenshot 2024-08-04 at 10 11 15 PM" src="https://github.com/user-attachments/assets/bb013574-8814-4abf-a3ae-1a060adeff8d">

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
