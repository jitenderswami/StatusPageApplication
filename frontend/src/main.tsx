import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Auth0Provider
			domain="status-sphere.us.auth0.com"
			clientId="D16zEdcH18lHSKsreHdgX5n3YwbAMah8"
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
