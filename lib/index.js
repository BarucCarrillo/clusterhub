import { BACKEND_API } from '@env'; // Asegúrate de que esta línea esté presente en tu archivo

export const login = async (data) => {
  try {
    const response = await fetch(`${BACKEND_API}/login`, { // Usa la variable de entorno
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Login failed");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const register = async (data) => {
  try {
    const response = await fetch(`${BACKEND_API}/users`, { // Usa la variable de entorno
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: data.nombre,
        apellidos: data.apellidos,
        correo: data.correo,
        contrasena: data.contrasena,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || "Registration failed");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};



export const changePassword = async (data) => {
  try {
    const token = await AsyncStorage.getItem("token"); // Obtener el token almacenado
    if (!token) {
      throw new Error("No token found. Please login again.");
    }

    const response = await fetch(`${BACKEND_API}/users/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        contrasena: data.contrasena,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Password change failed");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}



// export const getDashboard
