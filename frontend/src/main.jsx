import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GridBackground } from "./components/ui/Background";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  concat,
} from "@apollo/client";

// const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });

// const authLink = new ApolloLink((operation, forward) => {
//   const token = localStorage.getItem("token");
//   operation.setContext({
//     headers: { authorization: token ? `Bearer ${token}` : null },
//   });
//   return forward(operation);
// });

const client = new ApolloClient({
  // link: concat(authLink, httpLink),
  uri:
    import.meta.env.VITE_NODE_ENV === "development"
      ? "http://localhost:4000/graphql"
      : "/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GridBackground>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </GridBackground>
  </StrictMode>
);
