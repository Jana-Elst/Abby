import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { createContext, useState } from "react";

import "@fontsource-variable/roboto";
import "./style/app.css";

//get userID
import { supabase } from './supabaseClient';

export async function clientLoader() {
  const { data: { user } } = await supabase.auth.getUser();
  let id = "";
  if (user) {
    id = user.id
  }
  return id;
}


export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export const UserContext = createContext(null);
export const FormFlowContext = createContext(null);


export default function App({ loaderData }) {
  //userId
  const user = loaderData;
  const [userId, setUserId] = useState(user);

  //formFlow
  const [flowForm, setFlowForm] = useState("now"); //schedule & now

  return (
    <FormFlowContext.Provider value={{ flowForm, setFlowForm }}>
      <UserContext.Provider value={{ userId, setUserId }}>
        <Outlet />
      </UserContext.Provider>
    </FormFlowContext.Provider>
  )
}

export function ErrorBoundary({ error }) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

export function HydrateFallback() {
  return <p>Loading...</p>;
}