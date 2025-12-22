const API_URL = "http://localhost:5039/api"; // URL do seu backend

export async function login(usuario: string, senha: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario, senha }),
  });

  if (!response.ok) {
    throw new Error("Usuário ou senha incorretos");
  }

  const data = await response.json();
  return data.token; // JWT
}
