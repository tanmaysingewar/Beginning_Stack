const { createClient } = supabase;
const _supabase = createClient(APP_URL, APP_KEY);

console.log("Supabase Instance: ", _supabase);
_supabase
  .from("users")
  .select("*")
  .then((data) => {
    console.log("Users: ", data);
  });
