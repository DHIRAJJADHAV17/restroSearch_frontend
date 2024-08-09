import { AdminFormData } from "@/app/admin/signup/page";
import { AdminData } from "../admin/login/page";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useCreateAdmin = async (adminFormData: AdminFormData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/my/admin/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adminFormData),
    });
    if (!response.ok) {
      throw new Error("failed to create restaurant");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const useGetAdmin = async (adminFormData: AdminData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/my/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adminFormData),
    });

    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }

    const data = await response.json(); // Read JSON response

    // Check if response contains accessToken
    if (data.accessToken) {
      // Store the access token in local storage
      localStorage.setItem("accessToken", data.accessToken);
    } else {
      console.error("Access token not found in response");
    }

    return data; // Return the data object
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
