// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useAuthContext } from "../context/AuthContext";

// const useLogin = () => {
// 	const [loading, setLoading] = useState(false);
// 	const { setAuthUser } = useAuthContext();

// 	const login = async (username, password) => {
// 		const success = handleInputErrors(username, password);
// 		if (!success) return;
// 		setLoading(true);
// 		try {
// 			const res = await fetch("/api/auth/login", {
// 				method: "POST",
// 				headers: { "Content-Type": "application/json" },
// 				body: JSON.stringify({ username, password }),
// 			});

// 			const data = await res.json();
// 			if (data.error) {
// 				throw new Error(data.error);
// 			}

// 			localStorage.setItem("chat-user", JSON.stringify(data));
// 			setAuthUser(data);
// 		} catch (error) {
// 			toast.error(error.message);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	return { loading, login };
// };
// export default useLogin;

// function handleInputErrors(username, password) {
// 	if (!username || !password) {
// 		toast.error("Please fill in all fields");
// 		return false;
// 	}

// 	return true;
// }

import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const login = async (username, password) => {
		const success = handleInputErrors(username, password);
		if (!success) return;
		setLoading(true);

		try {
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			const contentType = res.headers.get("content-type");

			let data = null;

			if (contentType && contentType.includes("application/json")) {
				data = await res.json();
			} else {
				const text = await res.text();
				throw new Error(text || "Unexpected response from server");
			}

			if (!res.ok || data?.error) {
				throw new Error(data?.error || "Login failed");
			}

			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message || "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};

export default useLogin;

function handleInputErrors(username, password) {
	if (!username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}
	return true;
}
