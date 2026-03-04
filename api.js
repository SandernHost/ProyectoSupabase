// Obtener todos los registros de una tabla (con opciones)
async function fetchAll(table, options = {}) {
  let query = supabaseClient.from(table).select(options.select || '*');
  
  if (options.order) {
    query = query.order(options.order.column, { ascending: options.order.ascending ?? true });
  }
  if (options.limit) {
    query = query.limit(options.limit);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

// Obtener un registro por ID
async function fetchById(table, id) {
  const { data, error } = await supabaseClient.from(table).select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

// Insertar un registro
async function insertRecord(table, record) {
  const { data, error } = await supabaseClient.from(table).insert(record).select();
  if (error) throw error;
  return data;
}

// Actualizar un registro
async function updateRecord(table, id, updates) {
  const { data, error } = await supabaseClient.from(table).update(updates).eq('id', id).select();
  if (error) throw error;
  return data;
}

// Eliminar un registro
async function deleteRecord(table, id) {
  const { error } = await supabaseClient.from(table).delete().eq('id', id);
  if (error) throw error;
  return true;
}