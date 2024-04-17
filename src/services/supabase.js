import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://eyigrkxmacqwbliptctj.supabase.co";
// Create a single supabase client for interacting with your database
const KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5aWdya3htYWNxd2JsaXB0Y3RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE5ODkyNTQsImV4cCI6MjAyNzU2NTI1NH0.DCxq6-dc61mRIfhG-bjLB6plczYyOubS132YcH0AxdA";
const supabase = createClient(supabaseUrl, KEY);

export default supabase;
