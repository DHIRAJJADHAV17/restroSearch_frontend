const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useCreateRestro = async (restaurantFormData: FormData) => {
  try {
    const accToken = localStorage.getItem("accessToken");

    if (!accToken) {
      throw new Error("Access token not found");
    }

    const response = await fetch(`${API_BASE_URL}/api/my/restro/manage`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accToken}`,
      },
      body: restaurantFormData,
    });
    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getMyRestro = async () => {
  const accToken = localStorage.getItem("accessToken");
  console.log(accToken);

  const response = await fetch(`${API_BASE_URL}/api/my/restro/manage`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get restaurant");
  }
  return response.json();
};

export const updateRestro = async (restaurantFormData: FormData) => {
  try {
    const accToken = localStorage.getItem("accessToken");
    const response = await fetch(`${API_BASE_URL}/api/my/restro/manage`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accToken}`,
      },
      body: restaurantFormData,
    });

    if (!response) {
      throw new Error("Failed to update restaurant");
    }

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getAllRestro = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/restro`, {
      method: "GET",
    });

    if (!response) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getRestroDetail = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/restro/discrip/${id}`, {
      method: "GET",
    });

    if (!response) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const searchRestro = async (query: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/restro/search/${query}`, {
      method: "GET",
    });

    if (!response) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  } catch (error) {
    console.log(error);
  }
};
