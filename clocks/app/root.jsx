import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import React, { useState } from 'react';
import { clockNumber, sendToServer } from "./services/clock";

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
  );
}

const clock = clockNumber();
const socket = new WebSocket('ws://localhost:3000/');

socket.addEventListener("open", event => {
  console.log("Connection established");
  sendToServer(
    socket,
    clock,
    {
      status: 'start'
    }
  );
});

export default function App() {
  console.log('jouw toegewezen klok is:', clock);
  return <Outlet context={{ socket, clock }} />;
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