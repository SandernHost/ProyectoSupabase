// Función de inicio de sesión
async function signIn(email, password) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password
  });
  if (error) throw error;
  return data;
}

// Cerrar sesión
async function signOut() {
  const { error } = await supabaseClient.auth.signOut();
  if (error) throw error;
}

// Obtener sesión actual
async function getSession() {
  const { data, error } = await supabaseClient.auth.getSession();
  if (error) throw error;
  return data.session;
}

// Escuchar cambios en la autenticación
supabaseClient.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    window.location.href = 'dashboard.html';
  }
  if (event === 'SIGNED_OUT') {
    window.location.href = 'index.html';
  }
});