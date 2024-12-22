import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Auth0Provider
			domain={process.env.AUTH0_DOMAIN as string}
			clientId={process.env.AUTH0_CLIENT_ID as string}
			authorizationParams={{
				redirect_uri: window.location.origin,
				audience: "https://api.statussphere.com",
				scope: "openid profile email"
			}}
		>
			<App />
		</Auth0Provider>
	</StrictMode>
);
