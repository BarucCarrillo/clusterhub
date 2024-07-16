export const login = async (data) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Usa directamente el objeto data
    });

    // Verifica si la respuesta es exitosa
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Login failed");
    }

    // Respuesta exitosa
    const result = await response.json();
    return result; // Devuelve el objeto JSON

  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};



export const register = async (data) => {
    fetch("http://127.0.0.1:5000/users", {
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
        })
        .then((response) => {
            if (response.status === 200) {
            return response.json();
            } else {
            return response.json();
            }
        })
        .then((data) => {
            
            console.log(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    };
