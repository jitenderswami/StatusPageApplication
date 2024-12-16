import React from "react";
import StatusSphereLogo from "../../../assets/StatusSphereLogo";
import { Button } from "../../../components/ui/button";

interface loginViewProps {
	login: () => void;
}

const LoginView: React.FC<loginViewProps> = ({ login }) => {
	return (
		<div className="w-screen h-screen flex">
			<div className="w-[50%] h-full bg-foreground hidden md:block" />
			<div className="w-full h-full bg-background md:w-[50%]">
				<div className="w-full h-full flex flex-col items-center justify-center gap-10">
					<div className="flex items-center justify-center gap-10">
						<div className="w-[100px] h-[100px]">
							<StatusSphereLogo />
						</div>
						<p className="md:text-5xl text-3xl font-bold italic text-foreground">Status Sphere</p>
					</div>

					<Button className="md:w-[400px] w-[300px] text-xl mt-20" onClick={login}>
						Login/Signup
					</Button>
				</div>
			</div>
		</div>
	);
};

export default LoginView;
