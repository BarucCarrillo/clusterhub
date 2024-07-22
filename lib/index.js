import { BACKEND_API } from "@env"; // Asegúrate de que esta línea esté presente en tu archivo
import AsyncStorage from "@react-native-async-storage/async-storage";
export const login = async (data) => {
  try {
    const response = await fetch(`${BACKEND_API}/login`, {
      // Usa la variable de entorno
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
    const response = await fetch(`${BACKEND_API}/users`, {
      // Usa la variable de entorno
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







export const createDashboard = async (data) => {
  try {
    const token = await AsyncStorage.getItem("token"); // Obtener el token almacenado
    if (!token) {
      throw new Error("No token found. Please login again.");
    }

    const response = await fetch(`${BACKEND_API}/dashboard/${data.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: data.nombre,
        descripcion: data.descripcion,
        destacado: data.destacado,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Dashboard creation failed");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};


export const getDashboardUser = async (id) => {
  try {
    const token = await AsyncStorage.getItem("token"); // Obtener el token almacenado
    if (!token) {
      throw new Error("No token found. Please login again.");
    }

    const response = await fetch(`${BACKEND_API}/dashboard_user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}


const createSensor = async (data) =>{
  try {
    const response = await fetch(`${BACKEND_API}/sensor/${data.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre_sensor: "Sensor 1",
        datos: 0,
        fecha: NOW(),
        tipo_sensor: "Temperatura",
        aula_id,
        user_id,
        topic: "sensor1",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Sensor creation failed");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }

}



export const getWidgets = async () => {

  try{
    const response = await fetch(`${BACKEND_API}/graficas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const result = await response.json();
    console.log(result);
    return result;
  
  }catch (error) {
    console.error("Error:", error);
    throw error;
  }

}



// export const getDashboard
