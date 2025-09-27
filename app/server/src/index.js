// require('dotenv').config({path: './env'})
import dotenv from "dotenv";
import { app } from "./app.js";
import { createClient } from "@supabase/supabase-js";

dotenv.config({
    path: "./.env"
});

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

app.listen(process.env.SERVER_PORT || 8000, () => {
    console.log(`⚙️ Server is running at port : ${process.env.SERVER_PORT}`);
});
