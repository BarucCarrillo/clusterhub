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
    // console.log(result);
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





export const crearSensor = async (data) => {
  try {
    const response = await fetch(`${BACKEND_API}/sensor/${parseInt(data.user_id)}`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      nombre: data.nombre,
      tipo_sensor: data.tipo_sensor,
      pais: data.pais,
      estado: data.estado,
      ciudad: data.ciudad,
      universidad: data.universidad,
      edificio: data.edificio,
      aula: data.aula,
      topic: data.topico,
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


export const getSensorUser = async (id) => {
  try {
    const token = await AsyncStorage.getItem("token"); // Obtener el token almacenado
    if (!token) {
      throw new Error("No token found. Please login again.");
    }

    const response = await fetch(`${BACKEND_API}/sensor_user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // Asegurarse de incluir el token en los encabezados
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (result.message === "No sensors found") {
      return null; // O cualquier otro valor que indique que no hay sensores
    }

    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};


export const deleteSensor = async (id) => {
  try {
    const response = await fetch(`${BACKEND_API}/sensor/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Sensor deletion failed");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}



export const editSensor = async (data) => {
    try{
      const response = await fetch(`${BACKEND_API}/sensor/${data.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: data.nombre,
          tipo_sensor: data.tipo_sensor,
          pais: data.pais,
          estado: data.estado,
          ciudad: data.ciudad,
          universidad: data.universidad,
          edificio: data.edificio,
          aula: data.aula,
          user_id: data.user_id,
          topic: data.topico,

        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Sensor update failed");
      }

      const result = await response.json();

      return result;


    }catch (error) {
      console.error("Error:", error);
      throw error;
    }

  console.log(data);

}


export const deleteDashboard = async (id) => {
  try {
    const response = await fetch(`${BACKEND_API}/dashboard/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Dashboard deletion failed");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export  const deleteGrafica = async (dashboardId,graficaId) => {
  try {
    const response = await fetch(`${BACKEND_API}/dashboard_graficas`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dashboard_id: dashboardId,
        grafica_id: graficaId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      throw new Error(errorData.error || "Widget deletion failed");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}


export const editWidgetOnDashboard = async (data) => {
  try {
    const response = await fetch(`${BACKEND_API}/dashboard_graficas`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dashboard_id: data.dashboard_id,
        grafica_id: data.grafica_id,
        widget_id: data.widget_id,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Widget update failed");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }

}


export const assingSensorToWidget = async (sensor_id,widget_id) => {
  try {
    const response = await fetch(`${BACKEND_API}/sensor_to_widgets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grafica_id: widget_id,
        sensor_id: sensor_id,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Widget update failed");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }



}

export const getSensorData = async (id) => {
  try {
    const response = await fetch(`${BACKEND_API}/sensor_data/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}



export const deleteSensorFromWidget = async (sensor_id,widget_id) => {
  try {
    const response = await fetch(`${BACKEND_API}/sensor_to_widgets`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grafica_id: widget_id,
        sensor_id: sensor_id,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Widget update failed");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}


export const updateSensorInWidget = async (id,sensor_id) => {

  try {
    const response = await fetch(`${BACKEND_API}/sensor_to_widget/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sensor_id: sensor_id,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Widget update failed");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }

  // console.log(id);
  // console.log(sensor_id);
}