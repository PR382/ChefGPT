"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function HistoryPage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .order('created_at', { ascending: false });
      
      if (data) setRecipes(data);
      if (error) console.error("Error fetching recipes:", error);
    };
    fetchRecipes();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-red-600 mb-6">My Past Recipes</h1>
      <div className="grid gap-4">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.id} className="p-4 bg-white rounded-3xl shadow-md border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">{recipe.title}</h2>
              <p className="text-sm text-gray-500">
                Saved on: {new Date(recipe.created_at).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No recipes found yet. Start cooking!</p>
        )}
      </div>
    </div>
  );
}
