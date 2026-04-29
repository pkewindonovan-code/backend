import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://yoltegtlefnveazpwwsm.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_888ul6lM3XJzfZYICx1nuQ_YfKPDlMj";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);