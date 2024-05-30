const { createClient } = supabase;
const _supabase = createClient(
  "https://djusvahojwdcrrbjrivv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqdXN2YWhvandkY3JyYmpyaXZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY1MzQ1NjIsImV4cCI6MjAzMjExMDU2Mn0.sHG0QoV8XB_ee5redkMuQ5KmS15ZxeWDZJAGFY4lYJI",
);

console.log("Supabase Instance: ", _supabase);
_supabase
  .from("users")
  .select("*")
  .then((data) => {
    console.log("Users: ", data);
  });
