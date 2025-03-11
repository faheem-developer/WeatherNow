
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const OPENWEATHER_API_KEY = Deno.env.get("OPENWEATHER_API_KEY");
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { city } = await req.json();
    const url = new URL(req.url);
    const path = url.pathname.split('/').pop();

    if (!city) {
      return new Response(
        JSON.stringify({ error: 'City parameter is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    let endpoint;
    switch (path) {
      case 'current':
        endpoint = `${BASE_URL}/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`;
        break;
      case 'forecast':
        endpoint = `${BASE_URL}/forecast?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`;
        break;
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid endpoint' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
    }

    const response = await fetch(endpoint);
    
    if (!response.ok) {
      throw new Error(`City not found`);
    }
    
    const data = await response.json();
    
    return new Response(
      JSON.stringify(data),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error("Error in weather function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || 'An error occurred' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
